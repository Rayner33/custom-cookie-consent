<?php
/*
Plugin Name: Custom Cookie Consent
Description: A simple cookie consent plugin.
Version: 1.0
Author: Your Name
License: GPL-2.0+
*/

if (!defined('ABSPATH')) {
    exit; // Zabezpieczenie przed bezpośrednim dostępem
}

require_once plugin_dir_path(__FILE__) . 'includes/class-custom-cookie-consent.php';

// Ładowanie skryptów w panelu administracyjnym
function ccc_enqueue_admin_scripts($hook) {
    // Ładuj skrypty tylko na stronie ustawień wtyczki
    if ($hook !== 'toplevel_page_ccc-settings') {
        return;
    }

    // Ładowanie Axios (jeśli nie jest już załadowane)
    wp_enqueue_script('axios', 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js', array(), '0.27.2', true);

    // Ładowanie skryptu dla panelu administracyjnego
    wp_enqueue_script(
        'ccc-admin-js',
        plugin_dir_url(__FILE__) . 'assets/js/admin.js',
        array('axios'),
        '1.0',
        true
    );

    // Przekazanie danych do admin.js
    wp_localize_script(
        'ccc-admin-js',
        'cccAdmin',
        array(
            'resturl' => rest_url('ccc/v1/settings'),
            'nonce' => wp_create_nonce('wp_rest')
        )
    );
}
add_action('admin_enqueue_scripts', 'ccc_enqueue_admin_scripts');

function run_custom_cookie_consent() {
    $plugin = new Custom_Cookie_Consent();
    $plugin->run();
}
add_action('plugins_loaded', 'run_custom_cookie_consent');
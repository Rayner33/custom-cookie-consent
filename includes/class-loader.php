<?php
class Custom_Cookie_Consent_Loader {
    public function __construct() {
        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_scripts']);
    }

    public function enqueue_admin_scripts($hook) {
        if ($hook !== 'toplevel_page_ccc-settings') {
            return;
        }

        wp_enqueue_script('ccc-admin', plugins_url('/custom-cookie-consent/assets/js/admin-dist/admin-app.js'), ['jquery'], '1.0', true);

        $admin_settings = [
            'nonce' => wp_create_nonce('wp_rest'),
            'ajaxurl' => admin_url('admin-ajax.php'),
            'resturl' => rest_url('ccc/v1')
        ];
        wp_localize_script('ccc-admin', 'cccAdmin', $admin_settings);
    }

    public function run() {
        // Inicjalizacja
    }
}
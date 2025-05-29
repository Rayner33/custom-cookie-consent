<?php
if (!defined('ABSPATH')) {
    exit;
}

if (class_exists('Custom_Cookie_Consent_Cookies')) {
    return;
}

class Custom_Cookie_Consent_Cookies {
    public function run() {
        add_action('rest_api_init', [$this, 'register_rest_routes']);
        add_action('wp_enqueue_scripts', [$this, 'enqueue_front_scripts']);
        add_action('wp_footer', [$this, 'render_cookie_banner']);
    }

    public function register_rest_routes() {
        register_rest_route('ccc/v1', '/settings', [
            'methods' => 'GET',
            'callback' => [$this, 'rest_get_settings'],
            'permission_callback' => function () {
                return current_user_can('manage_options');
            }
        ]);
        register_rest_route('ccc/v1', '/settings', [
            'methods' => 'POST',
            'callback' => [$this, 'rest_save_settings'],
            'permission_callback' => function () {
                return current_user_can('manage_options');
            }
        ]);
        // Endpoint do pobierania ustawień na froncie
        register_rest_route('ccc/v1', '/front-settings', [
            'methods' => 'GET',
            'callback' => [$this, 'rest_get_front_settings'],
            'permission_callback' => '__return_true'
        ]);
    }

    public function rest_get_settings($request) {
        error_log('Żądanie GET /ccc/v1/settings');
        error_log('Nonce w żądaniu: ' . $request->get_header('X-WP-Nonce'));
        error_log('Oczekiwany nonce: ' . wp_create_nonce('wp_rest'));
        error_log('Użytkownik: ' . (is_user_logged_in() ? wp_get_current_user()->user_login : 'niezalogowany'));
        $settings = [
            'banner_type' => get_option('ccc_banner_type', 'box'),
            'banner_position' => get_option('ccc_banner_position', 'bottom-right'),
        ];
        return new WP_REST_Response($settings, 200);
    }

    public function rest_save_settings($request) {
        $settings = $request->get_json_params();
        if (!is_array($settings)) {
            return new WP_Error('invalid_data', 'Invalid settings format.', ['status' => 400]);
        }

        update_option('ccc_banner_type', sanitize_text_field($settings['banner_type'] ?? 'box'));
        update_option('ccc_banner_position', sanitize_text_field($settings['banner_position'] ?? 'bottom-right'));

        return new WP_REST_Response(['message' => 'Settings saved successfully.'], 200);
    }

    public function rest_get_front_settings($request) {
        $settings = [
            'banner_type' => get_option('ccc_banner_type', 'box'),
            'banner_position' => get_option('ccc_banner_position', 'bottom-right'),
        ];
        return new WP_REST_Response($settings, 200);
    }

    public function enqueue_front_scripts() {
        wp_enqueue_style(
            'ccc-front',
            plugins_url('/custom-cookie-consent/assets/css/front.css'),
            [],
            '1.0'
        );
        wp_enqueue_script(
            'ccc-front',
            plugins_url('/custom-cookie-consent/assets/js/front.js'),
            [],
            '1.0',
            true
        );
        wp_localize_script('ccc-front', 'cccFront', [
            'resturl' => rest_url('ccc/v1/front-settings'),
            'nonce' => wp_create_nonce('wp_rest')
        ]);
    }

    public function render_cookie_banner() {
        ?>
        <div id="ccc-cookie-banner"></div>
        <?php
    }
}
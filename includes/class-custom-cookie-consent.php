<?php
class Custom_Cookie_Consent {
    public function run() {
        error_log('Custom_Cookie_Consent::run invoked');
        $this->load_dependencies();
        add_action('admin_menu', [$this, 'add_admin_menu']);
        add_action('rest_api_init', [$this, 'register_rest_routes']);
    }

    private function load_dependencies() {
        require_once plugin_dir_path(__FILE__) . 'class-loader.php';
        require_once plugin_dir_path(__FILE__) . 'modules/cookies/cookies.php';

        $loader = new Custom_Cookie_Consent_Loader();
        $cookies = new Custom_Cookie_Consent_Cookies();

        $loader->run();
        $cookies->run();
    }

    public function add_admin_menu() {
        add_menu_page(
            'Custom Cookie Consent',
            'Cookie Consent',
            'manage_options',
            'ccc-settings',
            [$this, 'admin_page'],
            'dashicons-admin-tools',
            80
        );
    }

    public function admin_page() {
        ?>
        <div id="ccc-admin-app"></div>
        <?php
    }

    public function register_rest_routes() {
        error_log('Registering REST routes for ccc/v1/settings');
        register_rest_route('ccc/v1', '/settings', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_settings'),
            'permission_callback' => function() {
                return current_user_can('manage_options');
            }
        ));

        register_rest_route('ccc/v1', '/settings', array(
            'methods' => 'POST',
            'callback' => array($this, 'save_settings'),
            'permission_callback' => function() {
                return current_user_can('manage_options');
            }
        ));
    }

    public function get_settings($request) {
        $settings = get_option('ccc_settings', array());
        return rest_ensure_response($settings);
    }

    public function save_settings($request) {
        error_log('save_settings invoked');
        $settings = $request->get_json_params();
        error_log('Settings received: ' . print_r($settings, true));
        if (empty($settings)) {
            error_log('Error: Invalid settings data');
            return new WP_Error('invalid_data', 'Invalid settings data', array('status' => 400));
        }
        $result = update_option('ccc_settings', $settings);
        error_log('Update option result: ' . ($result ? 'success' : 'failure'));
        return rest_ensure_response(array('success' => true));
    }
}
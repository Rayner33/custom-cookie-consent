<?php
if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

// Usuwanie opcji
delete_option('ccc_message');
delete_option('ccc_accept_text');
delete_option('ccc_settings_text');
delete_option('ccc_save_settings_text');
delete_option('ccc_cookie_categories');
delete_option('ccc_detected_cookies');
?>
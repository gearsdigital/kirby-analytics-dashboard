<?php

/**
 * Kirby Analytics Dashboard
 *
 * Provides a set if custom google analytics dashboard widgets.
 *
 * @package   Kirby Analytics Dashboard
 * @author    Steffen Giers <steffen.giers@gmail.com>
 * @copyright Steffen Giers
 */

define('PLUGIN_NAME', 'kirby-analytics-dashboard');
define('PLUGIN_ASSET_PATH', DS.'assets'.DS.'plugins'.DS.PLUGIN_NAME);
define('PLUGIN_DIST_ROOT', PLUGIN_ASSET_PATH.DS.'js'.DS.'dist'.DS);

$kirby->set('option', 'panel.stylesheet', array(
    PLUGIN_ASSET_PATH . DS . 'css/dashboard.css',
    PLUGIN_ASSET_PATH . DS . '/css/google-buttons.css',
));

// enable localization, default language is english
if (defined('KIRBY')) {
    $site = kirby()->site();
    $code = $site->multilang()
        ? $site->language()->code
        : c::get('analytics.dashboard.language', 'en');

    if ($code) {
        $filename = __DIR__.DS.'languages'.DS."$code.php";

        if (file_exists($filename)) {
            include_once __DIR__.DS.'languages'.DS."$code.php";
        } else {
            include_once __DIR__.DS.'languages'.DS."en.php";
        }
    }
}

// define widgets
$widgets = ['visitors'];
foreach ($widgets as $widget) {
    $kirby->set('widget', $widget, __DIR__.DS.'widgets'.DS.$widget);
}
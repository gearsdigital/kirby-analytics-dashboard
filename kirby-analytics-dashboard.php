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
define('PLUGIN_ROOT', kirby()->roots()->plugins() . DS . PLUGIN_NAME);
// pretty sure there is a better way :(
define('PLUGIN_DIST_ROOT', DS .'assets'. DS .'plugins'. DS . PLUGIN_NAME . DS .'js'. DS . 'dist' . DS);

$kirby->set('widget', 'visitors', __DIR__ . DS . 'widgets'. DS . 'visitors');

$kirby->set('option', 'panel.stylesheet', array(
    'assets/plugins/kirby-analytics-dashboard/css/dashboard.css',
    'assets/plugins/kirby-analytics-dashboard/css/google-buttons.css',
));
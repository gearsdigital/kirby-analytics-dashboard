<?php

return [
    'title' => [
        'text' => l::get('gears-visitors')
    ],
    'html' => function () {
        return tpl::load(__DIR__ . DS . 'visitors.html.php');
    }
];


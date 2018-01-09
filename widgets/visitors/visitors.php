<?php

return [
    'title' => [
        'text' => l('widget.widget.visitors.headline', 'Besucher')
    ],
    'html' => function () {
        return tpl::load(__DIR__ . DS . 'visitors.html.php');
    }
];


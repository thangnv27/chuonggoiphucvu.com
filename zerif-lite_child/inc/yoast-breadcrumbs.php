<?php

class Yoast_Breadcrumb_Widget extends WP_Widget {

    function Yoast_Breadcrumb_Widget() {
        $widget_ops = array('classname' => 'yoast-breadcrumb', 'description' => 'Adds a breadcrumb trail to your sidebar');
        $control_ops = array('id_base' => 'yoast_breadcrumb_widget');
        parent::__construct('yoast_breadcrumb_widget', 'PPO: Yoast Breadcrumb', $widget_ops, $control_ops);
    }

    function form($instance) {
    }

    function update($new_instance, $old_instance) {
    }

    function widget($args, $instance) {
        extract($args);

        yoast_breadcrumb('<div class="breadcrumbs">','</div>');
    }

}

if ( function_exists('yoast_breadcrumb') ) {
    register_widget('Yoast_Breadcrumb_Widget');
}
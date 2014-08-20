/**
 * Reveal behavior
 *
 * Provides binary show/hide behavior based on the element's value
 *
 * Element must implement the data-reveal-value attribute; the supplied value
 * will be used to test against all data-reveal-if target attributes.  Those matching
 * will display, those not matching will hide
 *
 * example usage:
 * select data-reveal-if="5"
 *
 * data-reveal-if="5" <!-- revealed when select element's value is changed to 5 -->
 * data-reveal-if-not="5" <!-- revealed when select element's value is changed to other than 5 -->
 */
define(function(require) {
    'use strict';

    var $ = require('jquery');

    return {
        priority: 100,
        attach: function($el) {
            var revealCondition = $el.attr('data-reveal-if');
            var groupName = $el.attr('name');

            function updateTargets() {
                var newValue = $el.val();

                // type convertion will be handy if numeric or boolean values are required
                /*jshint eqeqeq:false */
                var meetsCondition = revealCondition == newValue;

                $('[data-reveal-if-target="' + groupName + '"]').each(function(i, el) {
                    var $el = $(el);

                    if (meetsCondition) {
                        $el.show();
                    } else {
                        $el.hide();
                    }
                });

                $('[data-reveal-if-not-target="' + groupName + '"]').each(function(i, el) {
                    var $el = $(el);

                    if (!meetsCondition) {
                        $el.show();
                    } else {
                        $el.hide();
                    }
                });
            }

            $el.on('change', updateTargets);

            updateTargets();
        }
    };
});

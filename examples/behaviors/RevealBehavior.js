/**
 * Reveal behavior
 *
 * Provides a "tab"-like behavior to radio inputs
 */
define(function(require) {
    'use strict';

    var $ = require('jquery');

    var GROUPS = {};

    function getGroup(name) {
        if (!GROUPS[name]) {
            GROUPS[name] = [];
        }

        return GROUPS[name];
    }

    return {
        priority: 200,
        attach: function($el) {
            var groupName = $el.attr('name');
            var targetName = $el.attr('value');

            var group = getGroup(groupName);
            var set = {
                $trigger: $el,
                $target: $('[data-reveal-target="' + targetName + '"]')
            };
            group.push(set);

            function updateReveal() {
                var i;
                var len = group.length;
                for (i = 0; i < len; i++) {
                    if (group[i].$trigger.prop('checked')) {
                        group[i].$target.show();
                    } else {
                        group[i].$target.hide();
                    }
                }

            }

            $el.on('change', updateReveal);

            updateReveal();
        }
    };
});

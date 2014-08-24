define(function() {
    'use strict';

    function ElementMap() {
        this._values = {};
        this._keys = [];
    }

    ElementMap.prototype = {
        _values: null,
        _keys: null,

        length: 0,

        add: function(name, element) {
            if (!this._values[name]) {
                this._values[name] = [];
                this._keys.push(name);
                this.length++;
            }

            this._values[name].push(element);
        },

        each: function(iteratorMethod) {
            var i;
            var key;

            for (i = 0; i < this.length; i++) {
                key = this._keys[i];

                iteratorMethod(
                    key,
                    this._values[key]
                );
            }
        }
    };

    return ElementMap;
});




var listeners = (function() {

    var $group = {};

    return {
        target: function(uid) {
            var buff = [];
            for (var name in $group) {
                if (name.indexOf(uid) === 1) {
                    buff.extend($group[name]);
                }
            }
            return buff;
        },
        type: function(uid, type) {
            var sid = '_' + uid + '_' + type;
            if (!(sid in $group)) {
                $group[sid] = [];
            }
            return {
                findAll: function() {
                    return $group[sid].concat();
                },
                contains: function(callback) {
                    var listeners = $group[sid];
                    for (var i = 0; i < listeners.length; i += 1) {
                        if (listeners[i].callback === callback) {
                            return true;
                        }
                    }

                    return false;
                },
                find: function(callback) {

                    var listeners = $group[sid];
                    for (var i = 0; i < listeners.length; i += 1) {
                        if (listeners[i].callback === callback) {
                            return listeners[i];
                        }
                    }
                    return null;
                },
                remove: function(callback) {
                    var listeners = $group[sid];
                    for (var i = 0; i < listeners.length; i += 1) {
                        if (listeners[i].callback === callback) {
                            var tmp = listeners[i];
                            listeners.splice(i, 1);
                            return tmp;
                        }
                    }
                    return null;
                },
                add: function(type, callback, handler, bind) {
                    if (!this.contains(callback)) {
                        $group[sid].push({
                            type: type,
                            callback: callback,
                            handler: handler,
                            bind: bind
                        });
                    }
                }
            };
        }
    };
})();

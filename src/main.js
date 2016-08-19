import {isNative, getEventType} from './utils';


function addEvent(target, type, callback, bind) {
    bind = bind || null;

    var listeners = removeEvent(target, type, callback);
    var handler = isNative(type) ? () => callback.call(bind) : (e) => {
        callback.call(bind, new Event(e, type));
    };

    target.addEventListener(getEventType(type), handler, false);
    listeners.add(type, callback, handler, bind);

    return {
        remove: function() {
            removeEvent(target, type, callback);
        }
    };
}


function removeEvent(target, type, callback) {
    var items = listeners.type(utils.uid(target), type);
    var listener = items.remove(callback);
    if (listener !== null) {
        target.removeEventListener(getEventType(type), listener.handler, false);
    }
    return items;
}

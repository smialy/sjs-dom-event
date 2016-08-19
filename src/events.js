
let events = new WeakMap();

export function elementEvents(element){
    if(!events.has(element)){
        events.set(element, new Events(element));
    }
    return events.get(element);
}

class Events{
    constructor(element){
        this.element = element;
    }
    add(type, callback, bind){
        addEvent(this.element, type, callback, bind);
    }
    addAll(items) {
        for (let name in items) {
            addEvent(this.element, name, items[name]);
        }
    }
    once(type, callback, bind) {
        let handler = addEvent(this.element, type, function(e) {
            callback(e);
            handler.remove();
        }, bind);
        return handler;
    }
    remove(type, callback, bind) {
        removeEvent(this.element, type, callback, bind);
    }
    removeAll(types) {
        var items = [];
        var uid = utils.uid(this.element);
        if (typeof types === 'undefined') {
            items = listeners.target(uid);
        } else {
            if (typeof types === 'string') {
                types = types.trim().split(' ').unique();
            }
            for (var t = 0; t < types.length; t += 1) {
                items.extend(listeners.type(uid, types[t]).findAll());
            }
        }
        for (var i = 0; i < items.length; i += 1) {
            removeEvent(this.element, items[i].type, items[i].callback);
        }
    }
    dispose(){
        this.removeAll();
        this.element = null;
        events.delete(this.element);
    }
}

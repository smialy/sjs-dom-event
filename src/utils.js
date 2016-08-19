import {NATIVE_TYPES} from './consts';


let eventCache = {};

export function isEventSupport(name) {
    let el = document.createElement('div');
    if (name in eventCache) {
        return eventCache[name];
    }
    let ename = 'on' + name.toLowerCase();
    let isSupport = false;
    if (ename in el) {
        isSupport = true;
    } else {
        if (el.setAttribute) {
            el.setAttribute(ename, 'return;');
            isSupport = typeof el[ename] === 'function';
            el.removeAttribute(ename);
        }
    }
    eventCache[name] = isSupport;
    return isSupport;
}


export function isNative(type){
    return NATIVE_TYPES.indexOf(type) !== -1;
}

export function getEventType(type) {
    if (type === 'mousewheel') {
        if (!isEventSupport('mousewheel')) {
            type = 'DOMMouseScroll';
        }
    }
    return type;
}

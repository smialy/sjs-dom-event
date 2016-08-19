export default class Event{
    constructor(e, ctype){
        let target = e.target;
        while (target && target.nodeType === 3) {
            target = target.parentNode;
        }

        this.e = e;
        this.type = ctype || e.type;
        this.shift = e.shiftKey;
        this.control = e.ctrlKey;
        this.alt = e.altKey;
        this.meta = e.metaKey;
        this.target = e.target;
        this.related = e.relatedTarget;
        this.page = null;
        this.client = null;
        prepareEvent(this, e);
        Object.freeze(this);
    }
    preventDefault(){
        this.e.preventDefault();
    }
    stopPropagation(){
        this.e.stopPropagation();
    }
    stop() {
        this.preventDefault();
        this.stopPropagation();
    }
}


function prepareEvent(api, e) {
    let type = e.type;
    if (type.indexOf('key') === 0) {
        let code = e.which || e.keyCode;
        if (CODES[code]) {
            api.key = CODES[code];
        } else if (type === 'keydown' || type === 'keyup') {
            if (code > 111 && code < 124) {
                api.key = 'f' + (code - 111);
            } else if (code > 95 && code < 106) {
                api.key = code - 96;
            } else {
                api.key = String.fromCharCode(code).toLowerCase();
            }
        }
    } else if (type === 'click' || type === 'dbclick' || type.indexOf('mouse') === 0 || type === 'DOMMouseScroll' || type === 'wheel' || type === 'contextmenu') {
        let doc = (!document.compatMode || document.compatMode === 'CSS1Compat') ? document.html : document.body;
        api.page = {
            x: (e.pageX !== null) ? e.pageX : e.clientX + doc.scrollLeft,
            y: (e.pageY !== null) ? e.pageY : e.clientY + doc.scrollTop
        };
        api.client = {
            x: (e.pageX !== null) ? e.pageX - window.pageXOffset : e.clientX,
            y: (e.pageY !== null) ? e.pageY - window.pageYOffset : e.clientY
        };
        api.isRight = (e.which === 3 || e.button === 2);
        if (type === 'mouseover' || type === 'mouseout') {

        } else if (e.type === 'mousewheel' || e.type === 'DOMMouseScroll' || e.type === 'wheel') {
            api.wheel = (e.wheelDelta) ? e.wheelDelta / 120 : -(e.detail || 0) / 3;
            if (e.axis) {
                if (e.axis === e.HORIZONTAL_AXIS) {
                    api.axis = "horizontal";
                } else {
                    api.axis = "vertical";
                }
            } else if (e.wheelDeltaX && e.wheelDeltaX === e.wheelDelta) {
                api.axis = "horizontal";
            } else {
                api.axis = "vertical";
            }
        }
    } else if (type.indexOf('touch') === 0 || type.indexOf('gesture') === 0) {
        api.touch = {
            rotation: e.rotation,
            scale: e.scale,
            target: e.targetTouches,
            changed: e.changedTouches,
            touches: e.touches,
        };
        let touches = e.touches;
        if (touches && touches[0]) {
            let touch = touches[0];
            api.touch.page = {
                x: touch.pageX,
                y: touch.pageY
            };
            api.touch.client = {
                x: touch.clientX,
                y: touch.clientY
            };
        }
    }

}

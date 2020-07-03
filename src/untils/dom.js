import Vue from 'vue';
const isServer = Vue.prototype.$isServer;
import _ from "lodash";

/* istanbul ignore next */
export const on = (function () {
    if (!isServer && document.addEventListener) {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    } else {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler);
            }
        };
    }
})();

/* istanbul ignore next */
export const off = (function () {
    if (!isServer && document.removeEventListener) {
        return function (element, event, handler) {
            if (element && event) {
                element.removeEventListener(event, handler, false);
            }
        };
    } else {
        return function (element, event, handler) {
            if (element && event) {
                element.detachEvent('on' + event, handler);
            }
        };
    }
})();

// 
export function getUniqueID(prefix) {
    return _.uniqueId(prefix);
}



export const activeBackgroundColorMixins = {
        methods: {
    
 activeBackgroundColor($event, activeClassName) {
    //    this.show = !this.show;
    let currentTarget = $event.currentTarget;
    let uid = $event.currentTarget.getAttribute("data-uid");
    let olduid = this.activeEleUid;

    if (olduid == "") {
        this.show = true;
        currentTarget.classList.add(activeClassName);
        this.activeEleUid = uid;
        this.activeEle = currentTarget;
        //     setTimeout(() => {
        //       this.show = !this.show;
        //   }, 100);
    } else if (olduid == uid) {
        this.show = false;
        currentTarget.classList.remove(activeClassName);
        this.activeEleUid = '';
        this.activeEle = currentTarget;
    } else {
        this.activeEle.classList.remove(activeClassName);
        currentTarget.classList.add(activeClassName);
        this.activeEle = currentTarget;
        this.activeEleUid = uid;
    }
}
}
}

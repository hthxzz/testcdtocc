import Vue from 'vue';
Vue.directive('calcEleSize', {
    inserted: function (el, binding, vnode) {
        // console.log(el.getBoundingClientRect());
        el.style.height = el.getBoundingClientRect().height + 'px';
       
    }
})
import {
    mapMutations
} from "vuex";
export default {
    methods: {
        /**
         * 地图上面平缓移动到一个点
         * @param {Array} point 需要移动到的点
         * @param {number} duration 动画持续时间
         * @param {} callback 回调函数
         */
        moveToPoint(point, duration, callback) {
            if (!point) {
                console.log("point为必须,并且为一个数组");
                return;
            }
            let view = tmap.omap.getView();
            view.animate({
                center: point,
                duration: duration || 3000
            }, ev => {
                callback && callback();
            });

        },
        /**
         * 移动到一个点 层级同时变化
         * @param {Array} point 需要移动到的点
         * @param {number} duration 
         * @param {number} zoom1 层级
         * @param {number} zoom2 
         * @param {*} callback 
         */
        point2point(point, duration = 3000, zoom1, zoom2, callback) {
            let view = tmap.omap.getView();
            if (!point) {
                console.log("point为必须,并且为一个数组");
                return;
            }
            this.moveToPoint(point, duration);
            view.animate({
                    zoom: zoom1 || tmap.getMapZoomLevel() - 1,
                    duration: duration / 2
                }, {
                    zoom: zoom2 || tmap.getMapZoomLevel() + 1,
                    duration: duration / 2
                },
                ev => {
                    callback && callback()
                }
            );
        },
        addPoPHtml(point, html, option) {
            let omap = tmap.omap;
            var marker = new ol.Overlay({
                // position: [104.072165, 30.663431],
                positioning: "bottom-left",
                offset: [6, -13],
                element: html,
                stopEvent: true,
                autoPan: false,
                insertFirst: false
                // autoPanAnimation: {
                //   duration: 9500
                // }
            });
            omap.addOverlay(marker);
            marker.setPosition(point);
            this.marker = marker;
        },
        removePoPHtml() {
            if (this.marker) {
                tmap.omap.removeOverlay(this.marker);
            }

        },
        ...mapMutations({
            switchFullscreen: "app/switchFullscreen", //
            addPophtmlId: "app/addPophtmlId", //
            removePophtmlId: "app/removePophtmlId", //
        }),
    }
}
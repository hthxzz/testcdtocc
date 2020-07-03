// import * as L from 'leaflet';
// import icon from 'leaflet/dist/images/marker-icon.png';
// import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// let DefaultIcon = L.icon({
//     iconUrl: icon,
//     shadowUrl: iconShadow
// });
// L.Marker.prototype.options.icon = DefaultIcon;
// export default class tmap {
//     /**
//      * 
//      * @param {*} baseConfig Leaflet实例配置
//      * @param Lmap 原始实例
//      * @returns 包装后的实例
//      */
//     constructor(baseConfig){
//          this.Lmap = L.map('map', {
//             ...baseConfig
//         });
//     }
//     /**
//      * 
//      * @param {设置层级和中心点} level 
//      */
//     setZoomAndCenter(level = 6){
//         this.Lmap.setZoom(level);
//     }
//     /**
//      * 
//      */
//     flyTo(){

//     }
//     /**
//      * 
//      * @param {arry} LanLng 
//      * @param {object} options 
//      * @returns {layer} 
//      */
//     addPoint(LanLng, options, HTMLpop){
//         return L.marker(L.latLng([...LanLng]), { ...options }).bindPopup(HTMLpop)
//                 .addTo(this.Lmap);
//     }

//     /**
//      * 
//      * @param {*} pointLayer 
//      * @param {*} options 
//      * @param {html} HTMLcotent 弹出的html内容
//      */
//     addPopup(pointLayer,options,HTMLcotent) {
//             L.popup(options, pointLayer)
//              .setContent(HTMLcotent)
//              .openOn(this.Lmap);
//     }
//     /**
//      * 
//      * @param {object} options html className
//      */
//     addDivIcon(options) {
//         L.divIcon(options)
//     }
// }

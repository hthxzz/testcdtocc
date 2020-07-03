<template>
    <!-- 初始leaflet地图组件 -->
    <div class="left-baseMap-container">
        <div id="map">

        </div>
    </div>
</template>

<script>
    import * as ol from "./ol/ol-debug.js";
    export default {
        name: '',
        mounted () {
            		var jiaoguanjuLayer = new ol.layer.Tile({
                    source: new ol.source.XYZ({
                        projection: ol.proj.get('EPSG:4326'),
                        tileGrid: new ol.tilegrid.TileGrid({
						    origin:[-400.0, 400.0],
							resolutions:[0.17597825208524215,0.08798912485289058,0.04399456361617579,0.021997281808087896,0.010998639714313444,0.005499319857156722,0.002749659928578361,0.0013748311540196835,0.0006874143872793388,0.00034370838337017233,0.00017185419168508616,0.00008592709584254308,0.00004296354792127154,0.00002148177396063577,0.000010740886980317885,0.000005370443490158943,0.0000026852217450794713]
						}),
                        tileUrlFunction: function (tileCoord) {
                            var z = tileCoord[0];
                            var x = tileCoord[1];
                            var y = -tileCoord[2]-1;
                            return "http://20.5.11.26:6080/arcgis/rest/services/TOCC/TOCCMAP20191212/MapServer/tile/" + z + "/" + y + "/" + x;
                        }
                    })
               });
	    //经信委切片地图
		var jingxinweiLayer = new ol.layer.Tile({
			       source: new ol.source.XYZ({
                        projection: ol.proj.get('EPSG:4326'),
                        tileGrid: new ol.tilegrid.TileGrid({
						    origin:[-400.0, 400],
							resolutions:[0.17597825208524215,0.08798912485289058,0.04399456361617579,0.021997281808087896,0.010998639714313444,0.005499319857156722,0.002749659928578361,0.0013748311540196835,0.0006874143872793388,0.00034370838337017233,0.00017185419168508616,0.00008592709584254308,0.00004296354792127154,0.00002148177396063577,0.000010740886980317885,0.000005370443490158943,0.0000026852217450794713]
						}),
                        tileUrlFunction: function (tileCoord) {
                            var z = tileCoord[0];
                            var x = tileCoord[1];
                            var y = -tileCoord[2]-1;
                            return "http://10.190.230.165/arcgis/rest/services/jiaotongju/MAP20191210/MapServer/tile/" + z + "/" + y + "/" + x;
                        }
                    })
			   });
        var map = new ol.Map({
            target: 'map',
            view: new ol.View({
			    projection: "EPSG:4326",
				center: [104.06,30.64],
                //center: ol.proj.fromLonLat([104.06,30.64]),
                zoom: 4
            })
        });
		map.addLayer(jiaoguanjuLayer);
		map.addLayer(jingxinweiLayer);

        },
        data() {
            return {
                
            }
        }
    }
</script>

<style lang="scss" scoped>
    .left-baseMap-container, #map{
        height: 100%;
        width: 100%;
        position: relative;
    }
</style>
<style scoped>
    @import './ol/ol.css'
</style>
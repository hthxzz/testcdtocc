var labelText = {
    labelText1: {
        font: "12px Aria,sans-serif",
        offsetX: 20,
        offsetY: 0,
        scale: undefined,
        rotation: 0,
        textAlign: "start",
        textBaseline: "alphabetic",
        fillColor: "#333",
        stroke: {
            color: "",
            width: 1,
            lineCap: "",
            lineJoin: "",
            lineDash: [

            ],
            miterLimit: 10
        }
    }
};
//定义显示显示汇聚图层的分辨率，地图分辨率小于设置的分辨率时不进行汇聚显示，显示所有数据
var minClusterResolution = 1.7166137695312506E-4;
//192.167.252.246
export default {

    basemap1: {
        center: [
            125.5,
            43.7
        ],
        zoom: 1,
        /**默认显示级数*/
        minZoom: 1,
        /**最小级数*/
        maxZoom: 11,
        /**最大级数*/
        projection: "4326",
        resolutions: [
            0.010998639714313444,
            0.005499319857156722,
            0.002749659928578361,
            0.001374831154019683,
            0.000687414387279338,
            0.000343708383370172,
            0.000171854191685086,
            0.000085927095842543,
            0.000042963547921271,
            0.000021481773960635,
            0.000010740886980317
        ],
        baselayers: [{
            layerId: "background",
            layerName: "地形图",
            type: "amap"
        }]
    },
    basemap_google: {
        /*_google基础地图*/
        center: [11620889, 3554887],
        zoom: 6,
        /*默认显示级数*/
        minZoom: 3,
        /*最小级数*/
        maxZoom: 18,
        /*最大级数*/
        projection: "3857",
        baselayers: [{
                layerId: "background",
                layerName: "地形图",
                type: "google",
                extent: [8194049, 2299226, 15003671, 7088463],
                origin: [-20037508.342787001, 20037508.342787001]
            },
            {
                layerId: "background1",
                layerName: "卫星地图",
                type: "google_yx",
                visible: false,
                extent: [8194049, 2299226, 15003671, 7088463],
                origin: [-20037508.342787001, 20037508.342787001]
            },
            {
                layerId: "background1",
                layerName: "卫星地图",
                type: "google_yxbj",
                visible: false,
                extent: [8194049, 2299226, 15003671, 7088463],
                origin: [-20037508.342787001, 20037508.342787001]
            }
        ]
    },
    basemap_scjtt: {
        /*_google基础地图*/
        center: [104.06, 30.64],
        zoom: 9,
        /*默认显示级数*/
        minZoom: 3,
        /*最小级数*/
        maxZoom: 19,
        /*最大级数*/
        projection: "4326",
        baselayers: [{
                layerId: "background",
                layerName: "地形图",
                type: "agsTiled",
                url: "http://172.16.21.150:50001/proxy/server/B71DFE0E42734DC0BF422D55504C353B/25A0E34254A04FCFB2E3276924A03615/tile",
                //url:"http://172.16.22.163:6080/arcgis/rest/services/cd_vec/MapServer/tile/{z}/{y}/{x}",
                // url:"http://172.16.21.171:6080/arcgis/rest/services/map/chengdu_vec/MapServer/tile/{z}/{y}/{x}",
                resolutions: [
                    0.94107110058302823,
                    0.70312500000000022,
                    0.35156250000000011,
                    0.17578125000000006,
                    0.087890625000000028,
                    0.043945312500000014,
                    0.021972656250000007,
                    0.010986328125000003,
                    0.0054931640625000017,
                    0.0027465820312500009,
                    0.0013732910156250004,
                    6.866455078125002E-4,
                    3.433227539062501E-4,
                    1.7166137695312505E-4,
                    8.5830688476562527e-005,
                    4.2915344238281264e-005,
                    2.1457672119140632e-005,
                    1.0728836059570316E-5,
                    5.364418029785158E-6,
                    2.682209014892579E-6
                ],
                origin: [-180.0, 90.0]
            }
            /* ,
            	  {
                      layerId: "luk",
                      layerName: "路况图",
                      type: "agsTiled",
                      tileSize: 256,
                      url: "http://172.16.17.3:8888/LukServer/rest/luktiled/sichuan/MapServer/tile/{z}/{y}/{x}",
                      visible:false,
                      extent: [
                          98.322932,
                          26.135757,
                          108.142694,
                          34.122604
                      ],
                      origin: [
                          -180,
                          90
                      ],
                      projection: "4326",
                      resolutions: [
                          0.94107110058302823,
            		      0.70312500000000022,
            		      0.35156250000000011,
            		      0.17578125000000006,
            		      0.087890625000000028,
            		      0.043945312500000014,
            		      0.021972656250000007,
            		      0.010986328125000003,
            		      0.0054931640625000017,
            		      0.0027465820312500009,
            		      0.0013732910156250004,
            		      0.00068664550781250022,
            		      0.00034332275390625011,
            		      0.00017166137695312505,
            		      8.5830688476562527e-005,
            		      4.2915344238281264e-005,
            		      2.1457672119140632e-005
                      ],
                      minZoom: 7,
                      maxZoom: 16
                  },
                  {
                      layerId: "lukHis",
                      layerName: "历史路况图",
                      type: "agsTiled",
                      tileSize: 256,
                      url: "",
                      visible:false,
                      extent: [
                          98.322932,
                          26.135757,
                          108.142694,
                          34.122604
                      ],
                      origin: [
                          -180,
                          90
                      ],
                      projection: "4326",
                      resolutions: [
                          0.94107110058302823,
            		      0.70312500000000022,
            		      0.35156250000000011,
            		      0.17578125000000006,
            		      0.087890625000000028,
            		      0.043945312500000014,
            		      0.021972656250000007,
            		      0.010986328125000003,
            		      0.0054931640625000017,
            		      0.0027465820312500009,
            		      0.0013732910156250004,
            		      0.00068664550781250022,
            		      0.00034332275390625011,
            		      0.00017166137695312505,
            		      8.5830688476562527e-005,
            		      4.2915344238281264e-005,
            		      2.1457672119140632e-005
                      ],
                      minZoom: 7,
                      maxZoom: 16
                  } */
        ]
    },
    basemap: {
        /*成都交委地图*/
        center: [104.851015625, 34.3753515625],
        zoom: 5,
        /*默认显示级数*/
        minZoom: 3,
        /*最小级数*/
        maxZoom: 18,
        /*最大级数*/
        projection: "4326",
        baselayers: [

            {
                layerId: "background",
                layerName: "地形图",
                type: "agsTiled",
                // url: "/api/TOCCMAP20191212/arcgis/rest/services/TOCC/TOCCMapOfChina/MapServer/tile",
                // url: "http://10.1.170.107:6080/arcgis/rest/services/TOCC/TOCCMAP20191212/MapServer/tile",
                // url: "http://20.5.11.26:6080/arcgis/rest/services/TOCC/TOCCMapOfChina/MapServer/tile",
                url: "http://192.168.104.3:6080/api/TOCCMAP/arcgis/rest/services/TOCC/TOCCMapOfChina/MapServer/tile",
                resolutions: [
                    0.17597825208524215,
                    0.08798912485289058,
                    0.04399456361617579,
                    0.021997281808087896,
                    0.010998639714313444,
                    0.005499319857156722,
                    0.002749659928578361,
                    0.0013748311540196835,
                    0.0006874143872793388,
                    0.00034370838337017233,
                    0.00017185419168508616,
                    0.00008592709584254308,
                    0.00004296354792127154,
                    0.00002148177396063577,
                    0.000010740886980317885,
                    0.000005370443490158943,
                    0.0000026852217450794713
                ],
                origin: [-400.0, 400.0]
            },
            // {
            //     layerId: "background",
            //     layerName: "地形图",
            //     type: "agsTiled",
            //     /* url:"http://10.190.230.165/arcgis/rest/services/jiaotongju/MAP20200117/MapServer/tile",*/
            //     url: "http://10.190.230.165/arcgis/rest/services/jiaotongju/MAP20191210/MapServer/tile",
            //     //    url: "http://10.190.230.165/arcgis/rest/services/jiaotongju/MAP20191210/MapServer/tile",
            //     resolutions: [
            //         0.17597825208524215,
            //         0.08798912485289058,
            //         0.04399456361617579,
            //         0.021997281808087896,
            //         0.010998639714313444,
            //         0.005499319857156722,
            //         0.002749659928578361,
            //         0.0013748311540196835,
            //         0.0006874143872793388,
            //         0.00034370838337017233,
            //         0.00017185419168508616,
            //         0.00008592709584254308,
            //         0.00004296354792127154,
            //         0.00002148177396063577,
            //         0.000010740886980317885,
            //         0.000005370443490158943,
            //         0.0000026852217450794713
            //     ],
            //     origin: [-400.0, 400.0]
            // }
        ]
    },
    tiledlayers: {
        /*路况切面地图*/
        center: [104.06, 30.64],
        zoom: 9,
        /*默认显示级数*/
        minZoom: 3,
        /*最小级数*/
        maxZoom: 19,
        /*最大级数*/
        projection: "4326",
        baselayers: [{
                layerId: "luk",
                layerName: "路况图",
                type: "agsTiled",
                tileSize: 256,
                //url: "http://192.167.252.254:8088/LukServer/rest/luktiled/chengdu/MapServer/tile/{z}/{y}/{x};http://10.1.170.107:8001/LukServer/rest/luktiled/chengdu/MapServer/tile/{z}/{y}/{x}",
                url: "/api/LukServer/rest/luktiled/chengdu/MapServer/tile/{z}/{y}/{x}",
                visible: true,
                extent: [
                    98.322932,
                    26.135757,
                    108.142694,
                    34.122604
                ],
                origin: [
                    -180,
                    90
                ],
                projection: "4326",
                resolutions: [
                    0.94107110058302823,
                    0.70312500000000022,
                    0.35156250000000011,
                    0.17578125000000006,
                    0.087890625000000028,
                    0.043945312500000014,
                    0.021972656250000007,
                    0.010986328125000003,
                    0.0054931640625000017,
                    0.0027465820312500009,
                    0.0013732910156250004,
                    0.00068664550781250022,
                    0.00034332275390625011,
                    0.00017166137695312505,
                    8.5830688476562527e-005,
                    4.2915344238281264e-005,
                    2.1457672119140632e-005,
                    1.0728836059570316E-5,
                    5.364418029785158E-6,
                    2.682209014892579E-6
                ],
                minZoom: 10,
                maxZoom: 18
            },
            {
                layerId: "ditie",
                layerName: "地铁线路图",
                type: "agsTiled",
                tileSize: 256,
                //url: "http://192.167.252.254:8088/LukServer/rest/luktiled/chengdu/MapServer/tile/{z}/{y}/{x};http://10.1.170.107:8001/LukServer/rest/luktiled/chengdu/MapServer/tile/{z}/{y}/{x}",
                url: "http://10.190.230.165/arcgis/rest/services/jiaotongju/mapmetro/MapServer/tile/{z}/{y}/{x}",
                visible: true,
                extent: [
                    98.322932,
                    26.135757,
                    108.142694,
                    34.122604
                ],
                origin: [
                    -180,
                    90
                ],
                projection: "4326",
                resolutions: [
                    0.94107110058302823,
                    0.70312500000000022,
                    0.35156250000000011,
                    0.17578125000000006,
                    0.087890625000000028,
                    0.043945312500000014,
                    0.021972656250000007,
                    0.010986328125000003,
                    0.0054931640625000017,
                    0.0027465820312500009,
                    0.0013732910156250004,
                    0.00068664550781250022,
                    0.00034332275390625011,
                    0.00017166137695312505,
                    8.5830688476562527e-005,
                    4.2915344238281264e-005,
                    2.1457672119140632e-005,
                    1.0728836059570316E-5,
                    5.364418029785158E-6,
                    2.682209014892579E-6
                ],
                minZoom: 10,
                maxZoom: 18
            }
        ]
    },
    vectorlayers: {
        dc: {
            layerName: "热力图",
            dataUrl: "/api/tocc/gxdc_bikeServiceAnalysisHandler/test",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            blur: 15,
            radius: 5,
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "id",
            textColumn: "",
            rarefy: true,
            //onLayerFeatureClick:window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/

        },
        TEST_DATA: {
            "layerName": "测试数据图层",
            "dataUrl": "",
            "delayLoadData": true,
            "httpMethod": "POST",
            "datasourceType": "ogisRest",
            "projection": "4326",
            "rendererType": "Unique",
            "rendererColumn": "",
            "textColumn": "",
            "titleColumn": "",
            "rarefy": true,
            "onLayerFeatureClick": window.showFeatureInfo,
            "minResolution": 0,
            "maxResolution": 100000000
        },
        TR_EMG_EVENTINFO: {
            layerName: "应急事件",
            dataUrl: "rest/base/mapLayerDataHandle/getTrEventLayerData?layerName=TR_EMG_EVENTINFO",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "OID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "IS_DISPOSED",
            textColumn: "",
            titleColumn: "eventName|EVENT_NAME",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                        value: "#DEFAULT#",
                        imageSrc: "map/images/layers/shijian0.png"
                    },
                    {
                        value: "1",
                        imageSrc: "map/images/layers/shijian1.png"
                    },
                    {
                        value: "2",
                        imageSrc: "map/images/layers/shijian2.png"
                    },
                    {
                        value: "3",
                        imageSrc: "map/images/layers/shijian3.png"
                    }
                ]
            }]
        },
        TR_ROAD_CAR: {
            layerName: "GPS车辆",
            dataUrl: "",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "id",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                        value: "#DEFAULT#",
                        imageSrc: "jsp/audiovideotheme/audioVideoThemeAction/images/yjcl_qp.png"
                    },
                    {
                        value: "1",
                        imageSrc: "map/images/layers/shijian1.png"
                    },
                    {
                        value: "2",
                        imageSrc: "map/images/layers/shijian2.png"
                    },
                    {
                        value: "3",
                        imageSrc: "map/images/layers/shijian3.png"
                    }
                ]
            }]
        },
        TR_WATER_SHIP: {
            layerName: "船舶",
            dataUrl: "",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "id",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                        value: "#DEFAULT#",
                        imageSrc: "jsp/audiovideotheme/audioVideoThemeAction/images/yjcb_qp.png"
                    },
                    {
                        value: "1",
                        imageSrc: "map/images/layers/shijian1.png"
                    },
                    {
                        value: "2",
                        imageSrc: "map/images/layers/shijian2.png"
                    },
                    {
                        value: "3",
                        imageSrc: "map/images/layers/shijian3.png"
                    }
                ]
            }]
        },
        TR_EMERGENCY_TEAM: {
            layerName: "应急队伍",
            dataUrl: "{mapservice.local_layer}?layerName=TR_EMERGENCY_TEAM",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "OID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "map/images/layers/team_enable.png"
                }]
            }]
        },
        TR_EMERGENCY_WAREHOUSE: {
            layerName: "应急物资库",
            dataUrl: "{mapservice.local_layer}?layerName=TR_EMERGENCY_WAREHOUSE",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "OID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "map/images/layers/wzcbk.png"
                }]
            }]
        },
        TR_EMG_CAMERA: {
            layerName: "摄像头",
            dataUrl: "{mapservice.local_layer}?layerName=TR_EMG_CAMERA",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "OID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "PLACE_TYPE",
            textColumn: "",
            rarefy: true,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                        value: "#DEFAULT#",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "0",
                        imageSrc: "map/images/layers/keyunzhan_v.png"
                    },
                    {
                        value: "1",
                        imageSrc: "map/images/layers/shoufeizhan_v.png"
                    },
                    {
                        value: "2",
                        imageSrc: "map/images/layers/zhichaozhan_v.png"
                    },
                    {
                        value: "3",
                        imageSrc: "map/images/layers/fuwuqu_v.png"
                    },
                    {
                        value: "4",
                        imageSrc: "map/images/layers/qiaoliang_v.png"
                    },
                    {
                        value: "5",
                        imageSrc: "map/images/layers/suidao_v.png"
                    },
                    {
                        value: "6",
                        imageSrc: "map/images/layers/gangkou_v.png"
                    },
                    {
                        value: "7",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "8",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "9",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "10",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "11",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "12",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "13",
                        imageSrc: "map/images/layers/danbing_v.png"
                    },
                    {
                        value: "14",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "15",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "16",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "17",
                        imageSrc: "map/images/layers/matou_v.png"
                    },
                    {
                        value: "18",
                        imageSrc: "map/images/layers/matou_v.png"
                    }

                ]
            }]
        },
        TR_ROAD_CAMERA: {
            layerName: "摄像头",
            dataUrl: "{mapservice.local_layer}?layerName=TR_ROAD_CAMERA",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "oid",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "PLACE_TYPE",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                        value: "#DEFAULT#",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "0",
                        imageSrc: "map/images/layers/keyunzhan_v.png"
                    },
                    {
                        value: "1",
                        imageSrc: "map/images/layers/shoufeizhan_v.png"
                    },
                    {
                        value: "2",
                        imageSrc: "map/images/layers/zhichaozhan_v.png"
                    },
                    {
                        value: "3",
                        imageSrc: "map/images/layers/fuwuqu_v.png"
                    },
                    {
                        value: "4",
                        imageSrc: "map/images/layers/qiaoliang_v.png"
                    },
                    {
                        value: "5",
                        imageSrc: "map/images/layers/suidao_v.png"
                    },
                    {
                        value: "6",
                        imageSrc: "map/images/layers/gangkou_v.png"
                    },
                    {
                        value: "7",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "8",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "9",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "10",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "11",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "12",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "13",
                        imageSrc: "map/images/layers/danbing_v.png"
                    },
                    {
                        value: "14",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "15",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "16",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "17",
                        imageSrc: "map/images/layers/matou_v.png"
                    },
                    {
                        value: "18",
                        imageSrc: "map/images/layers/matou_v.png"
                    }

                ]
            }]
        },
        TR_ROAD_VMS: {
            layerName: "可变情报板",
            dataUrl: "{mapservice.local_layer}?layerName=TR_ROAD_VMS",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "OID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "map/images/layers/kbqbb.png"
                }]
            }]
        },
        TR_ROADTRANS_BUSSTATION: {
            layerName: "客运站",
            dataUrl: "{mapservice.local_layer}?layerName=TR_ROAD_CAMERA",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "PLACE_TYPE",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                        value: "#DEFAULT#",
                        imageSrc: "map/images/layers/keyunzhan_v.png"
                    },
                    {
                        value: "0",
                        imageSrc: "map/images/layers/keyunzhan_v.png"
                    },
                    {
                        value: "1",
                        imageSrc: "map/images/layers/shoufeizhan_v.png"
                    },
                    {
                        value: "2",
                        imageSrc: "map/images/layers/zhichaozhan_v.png"
                    },
                    {
                        value: "3",
                        imageSrc: "map/images/layers/fuwuqu_v.png"
                    },
                    {
                        value: "4",
                        imageSrc: "map/images/layers/qiaoliang_v.png"
                    },
                    {
                        value: "5",
                        imageSrc: "map/images/layers/suidao_v.png"
                    },
                    {
                        value: "6",
                        imageSrc: "map/images/layers/gangkou_v.png"
                    },
                    {
                        value: "7",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "8",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "9",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "10",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "11",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "12",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "13",
                        imageSrc: "map/images/layers/danbing_v.png"
                    },
                    {
                        value: "14",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "15",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "16",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "17",
                        imageSrc: "map/images/layers/matou_v.png"
                    },
                    {
                        value: "18",
                        imageSrc: "map/images/layers/matou_v.png"
                    }

                ]
            }]
        },
        TR_WATER_DOCKS: {
            layerName: "码头",
            dataUrl: "{mapservice.local_layer}?layerName=TR_ROAD_CAMERA",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "PLACE_TYPE",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                        value: "#DEFAULT#",
                        imageSrc: "map/images/layers/matou_v.png"
                    },
                    {
                        value: "0",
                        imageSrc: "map/images/layers/keyunzhan_v.png"
                    },
                    {
                        value: "1",
                        imageSrc: "map/images/layers/shoufeizhan_v.png"
                    },
                    {
                        value: "2",
                        imageSrc: "map/images/layers/zhichaozhan_v.png"
                    },
                    {
                        value: "3",
                        imageSrc: "map/images/layers/fuwuqu_v.png"
                    },
                    {
                        value: "4",
                        imageSrc: "map/images/layers/qiaoliang_v.png"
                    },
                    {
                        value: "5",
                        imageSrc: "map/images/layers/suidao_v.png"
                    },
                    {
                        value: "6",
                        imageSrc: "map/images/layers/gangkou_v.png"
                    },
                    {
                        value: "7",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "8",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "9",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "10",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "11",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "12",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "13",
                        imageSrc: "map/images/layers/danbing_v.png"
                    },
                    {
                        value: "14",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "15",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "16",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "17",
                        imageSrc: "map/images/layers/matou_v.png"
                    },
                    {
                        value: "18",
                        imageSrc: "map/images/layers/matou_v.png"
                    }

                ]
            }]
        },
        TR_WATER_STATION: {
            layerName: "港口",
            dataUrl: "{mapservice.local_layer}?layerName=TR_ROAD_CAMERA",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "PLACE_TYPE",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                        value: "#DEFAULT#",
                        imageSrc: "map/images/layers/gangkou_v.png"
                    },
                    {
                        value: "0",
                        imageSrc: "map/images/layers/keyunzhan_v.png"
                    },
                    {
                        value: "1",
                        imageSrc: "map/images/layers/shoufeizhan_v.png"
                    },
                    {
                        value: "2",
                        imageSrc: "map/images/layers/zhichaozhan_v.png"
                    },
                    {
                        value: "3",
                        imageSrc: "map/images/layers/fuwuqu_v.png"
                    },
                    {
                        value: "4",
                        imageSrc: "map/images/layers/qiaoliang_v.png"
                    },
                    {
                        value: "5",
                        imageSrc: "map/images/layers/suidao_v.png"
                    },
                    {
                        value: "6",
                        imageSrc: "map/images/layers/gangkou_v.png"
                    },
                    {
                        value: "7",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "8",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "9",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "10",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "11",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "12",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "13",
                        imageSrc: "map/images/layers/danbing_v.png"
                    },
                    {
                        value: "14",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "15",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "16",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "17",
                        imageSrc: "map/images/layers/matou_v.png"
                    },
                    {
                        value: "18",
                        imageSrc: "map/images/layers/matou_v.png"
                    }

                ]
            }]
        },
        WEIXIANPIN_CAR: {
            layerName: "危险品车",
            dataUrl: "rest/base/mapLayerDataHandle/getClfbLayerData",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "CID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "CID",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                        value: "#DEFAULT#",
                        imageSrc: "map/images/layers/yingjiche.png"
                    },
                    {
                        value: "1",
                        imageSrc: "map/images/layers/shijian1.png"
                    },
                    {
                        value: "2",
                        imageSrc: "map/images/layers/shijian2.png"
                    },
                    {
                        value: "3",
                        imageSrc: "map/images/layers/shijian3.png"
                    }
                ]
            }]
        },
        VW_EMERGENCY_TEAM: {
            layerName: "应急队伍",
            dataUrl: "{mapservice.local_layer}?layerName=VW_EMERGENCY_TEAM",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "OID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "map/images/layers/yjdw.png"
                }]
            }]
        },
        VW_EMG_VEHICHE: {
            layerName: "集结地",
            dataUrl: "{mapservice.local_layer}?layerName=VM_EMG_VEHICHE",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "OID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "map/images/layers/tr_yjjd.png"
                }]
            }]
        },
        VW_EMERGENCY_MATERIAL: {
            layerName: "应急资源",
            dataUrl: "{mapservice.local_layer}?layerName=VW_EMERGENCY_MATERIAL",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "OID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "map/images/layers/yjwz.png"
                }]
            }]
        },
        VW_EMERGENCY_EQUIPMENT: {
            layerName: "应急装备",
            dataUrl: "{mapservice.local_layer}?layerName=VW_EMERGENCY_EQUIPMENT",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "OID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "map/images/layers/yjzb.png"
                }]
            }]
        },
        VW_EMG_RES_CARRIAGE_COMPANY: {
            layerName: "供应商",
            dataUrl: "{mapservice.local_layer}?layerName=VW_EMG_RES_CARRIAGE_COMPANY",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "OID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "map/images/layers/yjyl.png"
                }]
            }]
        },
        VW_EMG_RES_SUPPLIER_INFO: {
            layerName: "运力储备",
            dataUrl: "{mapservice.local_layer}?layerName=VW_EMG_RES_SUPPLIER_INFO",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "OID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "map/images/layers/gys.png"
                }]
            }]
        },
        VW_EMERGENCY_EXPERT: {
            layerName: "专家",
            dataUrl: "{mapservice.local_layer}?layerName=VW_EMERGENCY_EXPERT",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "OID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "map/images/layers/yjzj.png"
                }]
            }]
        },
        SHENGJI_CAR: {
            layerName: "省际班车",
            dataUrl: "rest/base/mapLayerDataHandle/getClfbLayerData",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "CID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "CID",
            textColumn: "",
            rarefy: true,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                        value: "#DEFAULT#",
                        imageSrc: "map/images/layers/yingjiche.png"
                    },
                    {
                        value: "1",
                        imageSrc: "map/images/layers/shijian1.png"
                    },
                    {
                        value: "2",
                        imageSrc: "map/images/layers/shijian2.png"
                    },
                    {
                        value: "3",
                        imageSrc: "map/images/layers/shijian3.png"
                    }
                ]
            }]
        },
        LVYOU_CAR: {
            layerName: "旅游包车",
            dataUrl: "rest/base/mapLayerDataHandle/getClfbLayerData",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "CID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "CID",
            textColumn: "",
            rarefy: true,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                        value: "#DEFAULT#",
                        imageSrc: "map/images/layers/yingjiche.png"
                    },
                    {
                        value: "1",
                        imageSrc: "map/images/layers/shijian1.png"
                    },
                    {
                        value: "2",
                        imageSrc: "map/images/layers/shijian2.png"
                    },
                    {
                        value: "3",
                        imageSrc: "map/images/layers/shijian3.png"
                    }
                ]
            }]
        },
        TR_GC_PROJECT_EVENT: {
            layerName: "工程事故",
            dataUrl: "{mapservice.local_layer}?layerName=TR_GC_PROJECT_EVENT",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "eventStatus",
            textColumn: "",
            titleColumn: "eventName|EVENT_NAME",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                        value: "#DEFAULT#",
                        imageSrc: "map/images/layers/shijian0.png"
                    },
                    {
                        value: "1",
                        imageSrc: "map/images/layers/shijian1.png"
                    },
                    {
                        value: "2",
                        imageSrc: "map/images/layers/shijian2.png"
                    },
                    {
                        value: "3",
                        imageSrc: "map/images/layers/shijian3.png"
                    }
                ]
            }]
        },
        PROJECT_ROAD_GEOM: {
            "layerName": "项目路线",
            "dataUrl": "",
            "delayLoadData": true,
            "httpMethod": "POST",
            "datasourceType": "ogisRest",
            "shapeType": "Line",
            "idField": "id",
            "projection": "4326",
            "rendererType": "Unique",
            "rendererColumn": "",
            "textColumn": "",
            "titleColumn": "projectName|PROJECT_NAME",
            "rarefy": true,
            "onLayerFeatureClick": window.showFeatureInfo,
            "minResolution": 0,
            "maxResolution": 100000000,
            "zoomSymbols": [{
                "minResolution": 0,
                "maxResolution": 100000000,
                "filter": "none",
                "symbols": [{
                    "lineWidth": 10,
                    "lineColor": "#FFFF00"
                }]
            }]
        },
        CHANNEL_SEGMENT: {
            "layerName": "航段",
            "dataUrl": "",
            "delayLoadData": true,
            "httpMethod": "POST",
            "datasourceType": "ogisRest",
            "shapeType": "Line",
            "idField": "id",
            "projection": "4326",
            "rendererType": "Unique",
            "rendererColumn": "",
            "textColumn": "",
            "titleColumn": "channelSegmentName|CHANNEL_SEGMENT_NAME",
            "rarefy": true,
            "onLayerFeatureClick": window.showFeatureInfo,
            "minResolution": 0,
            "maxResolution": 100000000,
            "zoomSymbols": [{
                "minResolution": 0,
                "maxResolution": 100000000,
                "filter": "none",
                "symbols": [{
                    "lineWidth": 10,
                    "lineColor": "#FFFF00"
                }]
            }]
        },
        PROJECT_JOB: {
            "layerName": "程施工现场",
            "dataUrl": "",
            "delayLoadData": true,
            "httpMethod": "POST",
            "datasourceType": "ogisRest",
            "shapeType": "Point",
            "idField": "id",
            "projection": "4326",
            "rendererType": "Unique",
            "rendererColumn": "jobType|JOB_TYPE",
            "textColumn": "",
            "titleColumn": "jobName|JOB_NAME",
            "rarefy": true,
            "onLayerFeatureClick": window.showFeatureInfo,
            "minResolution": 0,
            "maxResolution": 100000000,
            "zoomSymbols": [{
                "minResolution": 0,
                "maxResolution": 100000000,
                "filter": "none",
                "symbols": [{
                        "value": "#DEFAULT#",
                        "imageSrc": "map/images/layers/shijian0.png"
                    },
                    {
                        "value": "1",
                        "imageSrc": "map/images/layers/shijian1.png"
                    },
                    {
                        "value": "2",
                        "imageSrc": "map/images/layers/shijian2.png"
                    },
                    {
                        "value": "3",
                        "imageSrc": "map/images/layers/shijian3.png"
                    }
                ]
            }]
        },
        TR_MONITOR_EVENT: {
            layerName: "监测事件",
            dataUrl: "rest/base/mapLayerDataHandle/getTrEventLayerData?layerName=TR_MONITOR_EVENT",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "tubiao",
            textColumn: "",
            titleColumn: "eventName|EVENT_NAME|blockReason",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            styleFunction: function (feature, resolution) {
                var styleOption = {};
                var imgOption = {
                    src: "view/chinatransinfo/jcsj/monitorEvent/img/" + feature.get("tubiao")
                };
                styleOption.image = new ol.style.Icon(imgOption);
                return new ol.style.Style(styleOption);
            }
        },
        TR_LIMIT_WATER_AREA: {
            layerName: "限制水域",
            dataUrl: "{mapservice.local_layer}?layerName=TR_LIMIT_WATER_AREA",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Polygon",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "PLACE_TYPE",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                        value: "#DEFAULT#",
                        imageSrc: "map/images/layers/matou_v.png",
                        fillColor: "rgba(55, 0, 0, 0.6)"
                    },
                    {
                        value: "0",
                        imageSrc: "map/images/layers/keyunzhan_v.png"
                    },
                    {
                        value: "1",
                        imageSrc: "map/images/layers/shoufeizhan_v.png"
                    },
                    {
                        value: "2",
                        imageSrc: "map/images/layers/zhichaozhan_v.png"
                    },
                    {
                        value: "3",
                        imageSrc: "map/images/layers/fuwuqu_v.png"
                    },
                    {
                        value: "4",
                        imageSrc: "map/images/layers/qiaoliang_v.png"
                    },
                    {
                        value: "5",
                        imageSrc: "map/images/layers/suidao_v.png"
                    },
                    {
                        value: "6",
                        imageSrc: "map/images/layers/gangkou_v.png"
                    },
                    {
                        value: "7",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "8",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "9",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "10",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "11",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "12",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "13",
                        imageSrc: "map/images/layers/danbing_v.png"
                    },
                    {
                        value: "14",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "15",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "16",
                        imageSrc: "map/images/layers/win_tool_gdsp.png"
                    },
                    {
                        value: "17",
                        imageSrc: "map/images/layers/matou_v.png"
                    },
                    {
                        value: "18",
                        imageSrc: "map/images/layers/matou_v.png"
                    }

                ]
            }]
        },
        TR_VEHICLES_KEY_ROAD: {
            layerName: "车辆行驶热点道路",
            //dataUrl: "api/omap/irest/base/basemap/query?layerName=BUS_LINE",
            dataUrl: "",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Line",
            idField: "id",
            projection: "4326",
            maxNum: 10000,
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "id",
            textColumn: "",
            titleColumn: 'name',
            rarefy: true,
            // onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                // symbols: [
                //     {
                //         lineWidth: 2,
                //         lineColor: "#2056DD",
                //     }
                // ]
                symbols: [{
                        value: "#DEFAULT#",
                        lineWidth: 2,
                        lineColor: "#CC91E2",
                    },
                    {
                        value: "1",
                        lineWidth: 2,
                        lineColor: "#2056DD",
                    },
                    {
                        value: "2",
                        lineWidth: 2,
                        lineColor: "#FFFF00",
                    },
                    {
                        value: "3",
                        lineWidth: 2,
                        lineColor: "#00B050",
                    },
                    {
                        value: "4",
                        lineWidth: 2,
                        lineColor: "#72F6FA",
                    },
                    {
                        value: "5",
                        lineWidth: 2,
                        lineColor: "#CC91E2",
                    }
                ]
            }]
        },
        TR_VEHICLE_PATH: {
            layerName: "车辆途径区域道路",
            dataUrl: "",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Polygon",
            idField: "id",
            projection: "4326",
            rendererType: "Class",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "count",
            textColumn: function (item) {
                let name = "TOP" + item.values_.id + '\n' + '\n' + item.values_.name + '--' + item.values_.count;
                return name;
            },
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    minValue: 0,
                    maxValue: 100,
                    fillColor: 'rgb(26, 117, 209,0.8)',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255)",
                    },
                }, {
                    minValue: 100,
                    maxValue: 150,
                    //fillColor: '#0B1E50',
                    //fillColor: '#FFFF00',
                    fillColor: 'rgb(238, 121, 26,0.8)',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255)",
                    },
                }, {
                    minValue: 150,
                    maxValue: 300,
                   // fillColor: '#0C2159',
                    //fillColor: '#00B050',
                    fillColor: 'rgb(238, 75, 129,0.8)',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255)",
                    },
                }, {
                    minValue: 300,
                    maxValue: 600,
                    //fillColor: '#0E2766',
                    //fillColor: '#72F6FA',
                    fillColor: 'rgb(108, 105, 236,0.8)',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255)",
                    },
                }, {
                    minValue: 600,
                    maxValue: 5000,
                   // fillColor: '#153893',
                   // fillColor: '#CC91E2',
                    fillColor: 'rgb(190, 81, 169,0.8)',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255)",
                    },
                }, {
                    minValue: 5000,
                    maxValue: 10000,                    
                   // fillColor: 'rgba(32,86,221,0.9)',
                    fillColor: 'rgb(118, 214, 222,0.8)',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255)",
                    },
                }, {
                    minValue: 10000,
                    maxValue: 20000,                    
                   // fillColor: 'rgba(32,86,221,0.9)',
                    fillColor: 'rgb(86,251,161,0.7)',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255)",
                    },
                },{
                    minValue: 20000,
                    maxValue: 30000,                    
                   // fillColor: 'rgba(32,86,221,0.9)',
                    fillColor: 'rgb(32,161,221,0.7)',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255)",
                    },
                },{
                    minValue: 30000,
                    maxValue: 40000,                    
                   // fillColor: 'rgba(32,86,221,0.9)',
                    fillColor: 'rgb(255,255,0,0.7)',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255)",
                    },
                },{                    
                    minValue: 40000,
                    maxValue: 100000,                    
                   // fillColor: 'rgba(32,86,221,0.9)',
                    fillColor: 'rgb(238, 75, 129,0.7)',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255)",
                    },
                },{
                    minValue: 100000,
                    maxValue: 1000000,                    
                   // fillColor: 'rgba(32,86,221,0.9)',
                    fillColor: 'rgb(238, 75, 129,0.8)',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255)",
                    },
                }]
            }]
        },
        TR_WARN_DISTRICT_AREA: {
            layerName: "预警行政区域",
            dataUrl: "{mapservice.local_layer}?layerName=TR_WARN_DISTRICT_AREA",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Polygon",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "PLACE_TYPE",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    fillColor: "rgba(0, 0, 255, 0.02)"
                }]
            }]
        },
        TR_WARN_DISTRICT_AREA_CENTER: {
            layerName: "预警行政区域中心点图层",
            dataUrl: "rest/base/mapLayerDataHandle/getTrEventLayerData?layerName=TR_WARN_DISTRICT_AREA_CENTER",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "tubiao",
            textColumn: "",
            titleColumn: "warnEventName",
            pagewidth: "600",
            pageheight: "520",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            styleFunction: function (feature, resolution) {
                var styleOption = {};
                var imgOption = {
                    src: "view/chinatransinfo/warn/emgWarnEvent/img/" + feature.get("tubiao") + ".png"
                };
                styleOption.image = new ol.style.Icon(imgOption);
                return new ol.style.Style(styleOption);
            }
        }

        ,
        TR_EVENTNUM_DISTRICT_AREA: {
            layerName: "预警行政区域",
            dataUrl: "{mapservice.local_layer}?layerName=TR_EVENTNUM_DISTRICT_AREA",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Polygon",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "PLACE_TYPE",
            textColumn: "",
            titleColumn: "districtName",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            autoCenter: true,
            styleFunction: function (feature, resolution) {
                return new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'red',
                        width: 0.8
                    }),
                    image: new ol.style.Circle({
                        radius: 5,
                        stroke: new ol.style.Stroke({
                            color: 'red'
                        }),
                        fill: new ol.style.Fill({
                            color: 'rgba(255, 255, 255, 0.2)'
                        })
                    })
                });
            }


        },
        TR_EVENTNUM_DISTRICT_AREA_CENTER: {
            layerName: "监测事件数量行政区域中心点图层",
            dataUrl: "rest/base/mapLayerDataHandle/getTrEventLayerData?layerName=TR_EVENTNUM_DISTRICT_AREA_CENTER",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "eventNum",
            textColumn: "eventNum",
            titleColumn: "districtName",
            pagewidth: "600",
            pageheight: "520",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            styleFunction: function (feature, resolution) {
                var styleOption = {};
                styleOption.text = new ol.style.Text({
                    font: '32px Calibri,sans-serif',
                    fill: new ol.style.Fill({
                        color: '#F00'
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#fff',
                        width: 0
                    }),
                    text: '' + feature.get("eventNum")
                });
                return new ol.style.Style(styleOption);
            }
        }

        ,
        ROAD_LINE: {
            "layerName": "路线",
            "dataUrl": "irest/base/basemap/road",
            "delayLoadData": true,
            "httpMethod": "POST",
            "pagewidth": "820",
            "datasourceType": "ogisRest",
            "shapeType": "Line",
            "idField": "id",
            "projection": "4326",
            "rendererType": "Unique",
            "rendererColumn": "",
            "textColumn": "",
            "titleColumn": "name",
            "rarefy": true,
            "onLayerFeatureClick": "window.showFeatureInfo",
            "minResolution": 0,
            "maxResolution": 100000000,
            "zoomSymbols": [{
                "minResolution": 0,
                "maxResolution": 100000000,
                "filter": "none",
                "symbols": [{
                    "lineWidth": 6,
                    "lineColor": "#0066CC"
                }]
            }],
            "selectedZoomSymbols": [{
                "minResolution": 0,
                "maxResolution": 100000000,
                "filter": "none",
                "symbols": [{
                    "lineWidth": 6,
                    "lineColor": "#EC6A00"
                }]
            }]
        },
        TR_ROAD_ROADINFO: {
            layerName: "桩号",
            dataUrl: "",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "ID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            rarefy: true,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                        value: "#DEFAULT#",
                        imageSrc: "view/chinatransinfo/lwjc/yxjc/img/locate.png"
                    }

                ]
            }]
        },
        LWJC_BICYCLE: {
            layerName: "共享单车图层",
            dataUrl: "",
            delayLoadData: true,
            httpMethod: "POST",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "type",
            textColumn: "text",
            minResolution: 0,
            maxNum: 100000,
            onLayerFeatureClick: window.showSeggregationFeature,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                        value: 1,
                        imageSrc: "http://192.167.252.246:8088/p/tocc/view/chinatransinfo/lkfx/img/bike_mb.png",
                        text: {
                            font: "10px 宋体,sans-serif",
                            offsetX: 0,
                            offsetY: 18,
                            fillColor: "#87CEEB",
                            stroke: {
                                color: "#87CEEB"
                            }
                        }
                    },
                    {
                        value: 2,
                        imageSrc: "http://192.167.252.246:8088/p/tocc/view/chinatransinfo/lkfx/img/bike_qj.png",
                        text: {
                            font: "10px 宋体,sans-serif",
                            offsetX: 0,
                            offsetY: 18,
                            fillColor: "#87CEEB",
                            stroke: {
                                color: "#87CEEB"
                            }
                        }
                    },
                    {
                        value: 3,
                        imageSrc: "http://192.167.252.246:8088/p/tocc/view/chinatransinfo/lkfx/img/bike_hl.png",
                        text: {
                            font: "10px 宋体,sans-serif",
                            offsetX: 0,
                            offsetY: 18,
                            fillColor: "#87CEEB",
                            stroke: {
                                color: "#87CEEB"
                            }
                        }
                    },
                    {
                        value: "#DEFAULT#",
                        imageSrc: "http://192.167.252.246:8088/p/tocc/view/chinatransinfo/lkfx/img/bike_qt.png",
                        text: {
                            font: "10px 宋体,sans-serif",
                            offsetX: 0,
                            offsetY: 18,
                            fillColor: "#87CEEB",
                            stroke: {
                                color: "#87CEEB"
                            }
                        }
                    }
                ]
            }]
        },
        LWJC_LKYWCAR: {
            layerName: "营运车辆图层",
            dataUrl: "",
            delayLoadData: true,
            httpMethod: "POST",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "type",
            textColumn: "text",
            minResolution: 0,
            maxNum: 100000,
            onLayerFeatureClick: window.showSeggregationFeature,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                        value: 1,
                        imageSrc: "http://192.167.252.246:8088/p/tocc/view/chinatransinfo/lkfx/img/lkyw_bf.png",
                        text: {
                            font: "10px 宋体,sans-serif",
                            offsetX: 0,
                            offsetY: 18,
                            fillColor: "#87CEEB",
                            stroke: {
                                color: "#87CEEB"
                            }
                        }
                    },
                    {
                        value: 2,
                        imageSrc: "http://192.167.252.246:8088/p/tocc/view/chinatransinfo/lkfx/img/lkyw_zt.png",
                        text: {
                            font: "10px 宋体,sans-serif",
                            offsetX: 0,
                            offsetY: 18,
                            fillColor: "#87CEEB",
                            stroke: {
                                color: "#87CEEB"
                            }
                        }
                    },
                    {
                        value: 3,
                        imageSrc: "http://192.167.252.246:8088/p/tocc/view/chinatransinfo/lkfx/img/lkyw_tz.png",
                        text: {
                            font: "10px 宋体,sans-serif",
                            offsetX: 0,
                            offsetY: 18,
                            fillColor: "#87CEEB",
                            stroke: {
                                color: "#87CEEB"
                            }
                        }
                    },
                    {
                        value: "#DEFAULT#",
                        imageSrc: "http://192.167.252.246:8088/p/tocc/view/chinatransinfo/lkfx/img/lkyw_tz.png",
                        text: {
                            font: "10px 宋体,sans-serif",
                            offsetX: 0,
                            offsetY: 18,
                            fillColor: "#87CEEB",
                            stroke: {
                                color: "#87CEEB"
                            }
                        }
                    }
                ]
            }]
        },
        DISTRICT_AREA_OUTLINE: {
            layerName: "预警行政区域",
            dataUrl: "irest/base/basemap/query?layerName=DISTRICT_AREA_OUTLINE",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Polygon",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            rendererColumn: "",
            titleColumn: "name",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            afterLoadedData: function (data, layer) {
                //var DISTRICT_CODE=data.data[0].DISTRICT_CODE,lonlat=data.data[0].CENTER_LONLAT.split(",");
                //layer.tmap.addImagePointOnLayer(layer.get("layerId"),"district_center_DISABLECLICK",lonlat[0],lonlat[1] , "page/img/"+DISTRICT_CODE+".png",{id:DISTRICT_CODE})
            },
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    lineWidth: 2,
                    lineDash: [8, 2],
                    lineColor: "#666",
                    fillColor: 'rgba(0, 0, 255, 0.01)'
                }]
            }]
        },
        LWJC_MONITOR_PLACE: {
            layerName: "监控点位",
            dataUrl: "http://192.167.252.246:8088/irest/base/basemap/query?layerName=LWJC_MONITOR_PLACE",
            delayLoadData: true,
            httpMethod: "GET",
            "pagewidth": "590",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "DEVICE_TYPE,DEVICE_STATUS",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            maxNum: 100000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [
                    /**桥梁**/
                    {
                        value: "1|1",
                        imageSrc: "http://192.167.252.246:8088/p/tocc/view/chinatransinfo/lkfx/img/qiangj_m.png"
                    },
                    /**隧道**/
                    {
                        value: "1|0",
                        imageSrc: "http://192.167.252.246:8088/p/tocc/view/chinatransinfo/lkfx/img/qiangj_m_u.png"
                    },
                    /**涵洞**/
                    {
                        value: "0|1",
                        imageSrc: "http://192.167.252.246:8088/p/tocc/view/chinatransinfo/lkfx/img/qiuj_m.png"
                    },
                    /**互通立交**/
                    {
                        value: "0|0",
                        imageSrc: "http://192.167.252.246:8088/p/tocc/view/chinatransinfo/lkfx/img/qiuj_m_u.png"
                    },
                    /**其他摄像头**/
                    {
                        value: "#DEFAULT#",
                        imageSrc: "http://192.167.252.246:8088/p/tocc/view/chinatransinfo/lkfx/img/sxt_m.png"
                    }
                ]
            }]
        },
        kyzwz: {
            layerName: "监控点位",
            dataUrl: "http://192.167.252.246:8088/irest/base/basemap/query?layerName=LWJC_MONITOR_PLACE",
            delayLoadData: true,
            httpMethod: "GET",
            "pagewidth": "590",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "DEVICE_TYPE,DEVICE_STATUS",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            maxNum: 100000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [
                    /**桥梁**/
                    {
                        value: "1|1",
                        imageSrc: "http://192.167.252.246:8088/p/tocc/view/chinatransinfo/lkfx/img/qiangj_m.png"
                    },
                    /**隧道**/
                    {
                        value: "1|0",
                        imageSrc: "http://192.167.252.246:8088/p/tocc/view/chinatransinfo/lkfx/img/qiangj_m_u.png"
                    },
                    /**涵洞**/
                    {
                        value: "0|1",
                        imageSrc: "http://192.167.252.246:8088/p/tocc/view/chinatransinfo/lkfx/img/qiuj_m.png"
                    },
                    /**互通立交**/
                    {
                        value: "0|0",
                        imageSrc: "http://192.167.252.246:8088/p/tocc/view/chinatransinfo/lkfx/img/qiuj_m_u.png"
                    },
                    /**其他摄像头**/
                    {
                        value: "#DEFAULT#",
                        imageSrc: "http://192.167.252.246:8088/p/tocc/view/chinatransinfo/lkfx/img/sxt_m.png"
                    }
                ]
            }]
        },
        INTERCHANGE: {
            layerName: "互通立交",
            dataUrl: "irest/base/basemap/query?layerName=INTERCHANGE",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            "pagewidth": "820",
            shapeType: "Point",
            idField: "ID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            titleColumn: "FTSLJXTMC|NAME",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "view/chinatransinfo/lwjc/yxjc/img/htlj_m.png"
                }]
            }]
        },
        OBSERVASION: {
            "layerName": "交调站",
            "dataUrl": "irest/base/basemap/query?layerName=OBSERVASION",
            "delayLoadData": true,
            "httpMethod": "GET",
            "datasourceType": "ogisRest",
            "shapeType": "Point",
            "idField": "ID",
            "projection": "4326",
            "pagewidth": "700",
            "rendererType": "Unique",
            "rendererColumn": "",
            "textColumn": "",
            "rarefy": true,
            "onLayerFeatureClick": "window.showFeatureInfoWithUrl",
            "minResolution": 0,
            "maxResolution": 100000000,
            "zoomSymbols": [{
                "minResolution": 0,
                "maxResolution": 100000000,
                "filter": "none",
                "symbols": [{
                    "value": "#DEFAULT#",
                    "imageSrc": "view/chinatransinfo/lwjc/yxjc/imgfrom7section/jdz_m.png"
                }]
            }]
        },
        TOLL_STATION: {
            "layerName": "收费站",
            "dataUrl": "irest/base/basemap/query?layerName=TOLL_STATION",
            "delayLoadData": true,
            "httpMethod": "GET",
            "datasourceType": "ogisRest",
            "shapeType": "Point",
            "idField": "ID",
            "projection": "4326",
            "pagewidth": "700",
            "rendererType": "Unique",
            "rendererColumn": "ISCLOSED",
            "textColumn": "",
            "rarefy": true,
            "onLayerFeatureClick": "window.showFeatureInfoWithUrl",
            "minResolution": 0,
            "maxResolution": 100000000,
            "zoomSymbols": [{
                "minResolution": 0,
                "maxResolution": 100000000,
                "filter": "none",
                "symbols": [{
                        "value": "1",
                        "imageSrc": "view/chinatransinfo/lwjc/yxjc/imgfrom7section/sfz_m_stop.png"
                    },
                    {
                        "value": "#DEFAULT#",
                        "imageSrc": "view/chinatransinfo/lwjc/yxjc/imgfrom7section/sfz_m.png"
                    }
                ]
            }]
        },
        SERVICE_AREA: {
            layerName: "服务区",
            dataUrl: "irest/base/basemap/query?layerName=SERVICE_AREA",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            "pagewidth": "820",
            shapeType: "Point",
            idField: "ID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            titleColumn: "FWQMC|NAME",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "view/chinatransinfo/lwjc/yxjc/imgfrom7section/fwq_m.png"
                }]
            }]
        },
        OVERLOAD_STATION: {
            layerName: "治超站",
            dataUrl: "irest/base/basemap/query?layerName=OVERLOAD_STATION",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            "pagewidth": "520",
            shapeType: "Point",
            idField: "ID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            titleColumn: "EQUIP_NAME",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "view/chinatransinfo/lwjc/yxjc/imgfrom7section/zcz_m.png"
                }]
            }]
        },
        SLJC_PORT: {
            layerName: "港口",
            dataUrl: "irest/base/basemap/query?layerName=SLJC_PORT",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "ID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "view/chinatransinfo/lwjc/yxjc/imgfrom7section/gk_m.png"
                }]
            }]
        },
        SLJC_RESERVOIR: {
            layerName: "库区",
            dataUrl: "irest/base/basemap/query?layerName=SLJC_RESERVOIR",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "ID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "view/chinatransinfo/lwjc/yxjc/imgfrom7section/kq_m.png"
                }]
            }]
        },
        FERRY: {
            layerName: "渡口",
            dataUrl: "irest/base/basemap/query?layerName=FERRY",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "ID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "PLACE_TYPE",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                        value: "#DEFAULT#",
                        imageSrc: "view/chinatransinfo/lwjc/yxjc/imgfrom7section/dk_m.png"
                    },
                    {
                        value: "1",
                        imageSrc: "view/chinatransinfo/lwjc/yxjc/imgfrom7section/dk_m.png"
                    },
                    {
                        value: "2",
                        imageSrc: "view/chinatransinfo/lwjc/yxjc/imgfrom7section/mt_m.png"
                    }
                ]
            }]
        },
        WHARF: {
            layerName: "码头",
            dataUrl: "irest/base/basemap/query?layerName=WHARF",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "ID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "view/chinatransinfo/lwjc/yxjc/imgfrom7section/mt_m.png"
                }]
            }]
        },
        INTELLIGENCE_BOARD: {
            layerName: "情报板",
            dataUrl: "irest/base/basemap/query?layerName=INTELLIGENCE_BOARD&where=DEVICE_TYPE=2",
            delayLoadData: true,
            httpMethod: "GET",
            "pagewidth": "580",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "ID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "view/chinatransinfo/lwjc/yxjc/imgfrom7section/qbb_m.png"
                }]
            }]
        },
        SLJC_CHANNEL: {
            layerName: "航道",
            dataUrl: "irest/base/basemap/query?layerName=SLJC_CHANNEL",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Line",
            idField: "ID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    lineWidth: 10,
                    lineColor: "#FFFF00"
                }]
            }]
        },
        FLOAT_BRIDGE: {
            layerName: "浮桥",
            dataUrl: "irest/base/basemap/query?layerName=FLOAT_BRIDGE",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "ID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "view/chinatransinfo/lwjc/yxjc/img/fq_m.png"
                }]
            }]
        },
        MG_STATION: {
            layerName: "管理站房",
            dataUrl: "irest/base/basemap/query?layerName=MG_STATION",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "ID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "view/chinatransinfo/lwjc/yxjc/img/glzf_m.png"
                }]
            }]
        },
        BRIDGE: {
            layerName: "桥梁",
            dataUrl: "irest/base/basemap/query?layerName=BRIDGE",
            delayLoadData: true,
            httpMethod: "GET",
            "pagewidth": "620",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "ID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "PDDJ_DM",
            textColumn: "",
            rarefy: true,
            symbolDistance: 120,
            onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                        value: "1",
                        imageSrc: "view/chinatransinfo/lwjc/yxjc/imgfrom7section/ql_1_m.png"
                    },
                    {
                        value: "2",
                        imageSrc: "view/chinatransinfo/lwjc/yxjc/imgfrom7section/ql_2_m.png"
                    },
                    {
                        value: "3",
                        imageSrc: "view/chinatransinfo/lwjc/yxjc/imgfrom7section/ql_3_m.png"
                    },
                    {
                        value: "4",
                        imageSrc: "view/chinatransinfo/lwjc/yxjc/imgfrom7section/ql_4_m.png"
                    },
                    {
                        value: "5",
                        imageSrc: "view/chinatransinfo/lwjc/yxjc/imgfrom7section/ql_5_m.png"
                    },
                    {
                        value: "#DEFAULT#",
                        imageSrc: "view/chinatransinfo/lwjc/yxjc/imgfrom7section/ql_6_m.png"
                    }
                ]
            }]
        },
        TUNNEL: {
            "layerName": "隧道",
            "dataUrl": "irest/base/basemap/query?layerName=TUNNEL",
            "delayLoadData": true,
            "httpMethod": "GET",
            "datasourceType": "ogisRest",
            "shapeType": "Point",
            "pagewidth": "820",
            "idField": "ID",
            "projection": "4326",
            "rendererType": "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            "rendererColumn": "JSZKPD_DJ",
            "textColumn": "",
            "rarefy": true,
            "onLayerFeatureClick": window.showFeatureInfoWithUrl,
            "minResolution": 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            "maxResolution": 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            "zoomSymbols": [{
                "minResolution": 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                "maxResolution": 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                "filter": "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                "symbols": [{
                        "value": "#DEFAULT#",
                        "imageSrc": "view/chinatransinfo/lwjc/yxjc/imgfrom7section/sd_m_1.png"
                    },
                    {
                        "value": "一类",
                        "imageSrc": "view/chinatransinfo/lwjc/yxjc/imgfrom7section/sd_m_1.png"
                    },
                    {
                        "value": "二类",
                        "imageSrc": "view/chinatransinfo/lwjc/yxjc/imgfrom7section/sd_m_2.png"
                    },
                    {
                        "value": "三类",
                        "imageSrc": "view/chinatransinfo/lwjc/yxjc/imgfrom7section/sd_m_3.png"
                    },
                    {
                        "value": "四类",
                        "imageSrc": "view/chinatransinfo/lwjc/yxjc/imgfrom7section/sd_m_4.png"
                    },
                    {
                        "value": "五类",
                        "imageSrc": "view/chinatransinfo/lwjc/yxjc/imgfrom7section/sd_m_5.png"
                    }
                ]
            }]
        },
        HEATMAPRidingPoint: {
            layerName: "热力图",
            dataUrl: "/api/tocc/gxdc_bikeServiceAnalysisHandler/getStartEndPoint",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            blur: 15,
            radius: 5,
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "id",
            textColumn: "",
            rarefy: true,
            //onLayerFeatureClick:window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/

        },
        HEATMAP_SHAREBIKE: {
            layerName: "共享单车起终点热力图",
            dataUrl: "api/tocc/lkfx_bikeSeggregationHandler/getBikeSeggregationPoints",
            delayLoadData: true,
            httpMethod: "POST",
            datasourceType: "ogisRest",
            /*权重点类型，WeightPoint类型，可以设置权重，返回数据中需有weight字段，值为0-1*/
            /*其他为点集类型，FeatureCollection，权重一致*/
            shapeType: "WeightPoint",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            blur: 15,
            radius: 14,
            weight: function (feature) {
                return feature.get('weight');
            },
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "id",
            textColumn: "",
            rarefy: true,
            //onLayerFeatureClick:window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
        },
        SHAREBIKE_FOCUS_AREA: {
            layerName: "共享单车重点关注区域",
            dataUrl: "",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Polygon",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "PLACE_TYPE",
            textColumn: "areaName",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    fillColor: "rgba(0, 0, 255, 0.02)"
                }]
            }]
        },
        SHAREBIKE_FOCUS_AREA_ALL: {
            layerName: "共享单车重点关注区域",
            dataUrl: "/api/tocc/gxdc_bikeAreaHandler/getAllAreaInfo",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Polygon",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "PLACE_TYPE",
            textColumn: "areaName",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    fillColor: "rgba(0, 255, 255,.4)",
                    style: {

                    }
                }]
            }]
        },
        VEHICLES_KEY_FOCUS_AREA: {
            layerName: "重点车辆运输重点关注区域",
            dataUrl: "",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Polygon",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "PLACE_TYPE",
            textColumn: "areaName",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    fillColor: "rgba(0, 0, 255, 0.02)"
                }]
            }]
        },
        VEHICLES_KEY_FOCUS_AREA_ALL: {
            layerName: "重点车辆运输重点关注区域",
            dataUrl: "/api/tocc/zdjc_vehicleAreaHandler/getAllAreaInfo",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Polygon",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "PLACE_TYPE",
            textColumn: "areaName",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    fillColor: "rgba(0, 255, 255,.4)",
                    style: {

                    }
                }]
            }]
        },
        CULVENT: {
            layerName: "涵洞",
            dataUrl: "irest/base/basemap/query?layerName=CULVENT",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            "pagewidth": "620",
            shapeType: "Point",
            idField: "ID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "JSZK",
            textColumn: "",
            titleColumn: "CULVERT_NAME|NAME",
            rarefy: true,
            symbolDistance: 100,
            onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                        value: "1",
                        imageSrc: "view/chinatransinfo/lwjc/yxjc/imgfrom7section/hd_m_1.png"
                    },
                    {
                        value: "2",
                        imageSrc: "view/chinatransinfo/lwjc/yxjc/imgfrom7section/hd_m_2.png"
                    },
                    {
                        value: "3",
                        imageSrc: "view/chinatransinfo/lwjc/yxjc/imgfrom7section/hd_m_3.png"
                    },
                    {
                        value: "4",
                        imageSrc: "view/chinatransinfo/lwjc/yxjc/imgfrom7section/hd_m_4.png"
                    },
                    {
                        value: "5",
                        imageSrc: "view/chinatransinfo/lwjc/yxjc/imgfrom7section/hd_m_5.png"
                    },
                    {
                        value: "#DEFAULT#",
                        imageSrc: "view/chinatransinfo/lwjc/yxjc/imgfrom7section/hd_m_5.png"
                    }
                ]
            }]
        },
        PORT_AREA: {
            layerName: "港区",
            dataUrl: "irest/base/basemap/query?layerName=PORT_AREA",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "ID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "view/chinatransinfo/lwjc/yxjc/img/gq_m.png"
                }]
            }]
        },
        NAVI_STRUCTURE: {
            layerName: "通航建筑",
            dataUrl: "irest/base/basemap/query?layerName=NAVI_STRUCTURE",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "ID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "view/chinatransinfo/lwjc/yxjc/img/gq_m.png"
                }]
            }]
        },
        TRAFFIC_FLOW: {
            "layerName": "通道断面流量分析",
            "dataUrl": "",
            "delayLoadData": true,
            "httpMethod": "POST",
            "datasourceType": "ogisRest",
            "shapeType": "Point",
            "idField": "name|NAME",
            "projection": "4326",
            "rendererType": "Unique",
            "rendererColumn": "name|NAME",
            "textColumn": "",
            "titleColumn": "name|NAME",
            "rarefy": true,
            autoCenter: true,
            "onLayerFeatureClick": window.showFeatureInfo,
            "minResolution": 0,
            "maxResolution": 100000000,
            "zoomSymbols": [{
                "minResolution": 0,
                "maxResolution": 100000000,
                "filter": "none",
                "symbols": [{
                    "value": "#DEFAULT#",
                    "imageSrc": "view/chinatransinfo/lwjc/yxjc/img/yjd_m.png"
                }]
            }]
        },
        PUMP_VESSEL: {
            layerName: "泵船",
            dataUrl: "irest/base/basemap/query?layerName=PUMP_VESSEL",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "ID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "view/chinatransinfo/lwjc/yxjc/img/bc_m.png"
                }]
            }]
        },
        WEATHER_STATION: {
            layerName: "气象监测站",
            dataUrl: "irest/base/basemap/query?layerName=WEATHER_STATION",
            delayLoadData: true,
            httpMethod: "GET",
            "pagewidth": "620",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "ID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "view/chinatransinfo/lwjc/yxjc/imgfrom7section/qxjc_m.png"
                }]
            }]
        },
        WATER_STATION: {
            layerName: "水文监测站",
            dataUrl: "irest/base/basemap/query?layerName=WATER_STATION",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "ID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "view/chinatransinfo/lwjc/yxjc/img/m_swjc.png"
                }]
            }]
        },
        GPS_VEHICLE: {
            layerName: "GPS车辆",
            dataUrl: "irest/base/basemap/query?layerName=GPS_VEHICLE",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "ID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "view/chinatransinfo/lwjc/yxjc/img/m_lkyw.png"
                }]
            }]
        },
        HIGHWAY_UNDER_CONSTRUCTION: {
            "layerName": "在建公路",
            "dataUrl": "irest/base/basemap/query?layerName=HIGHWAY_UNDER_CONSTRUCTION&where=PROJECT_TYPE=1 and STATUS !=3 ",
            "delayLoadData": true,
            "pagewidth": "620",
            "httpMethod": "GET",
            "datasourceType": "ogisRest",
            "shapeType": "Line",
            "idField": "ID",
            "projection": "4326",
            "rendererType": "Unique",
            "rendererColumn": "",
            "textColumn": "",
            "rarefy": true,
            "onLayerFeatureClick": "window.showFeatureInfoWithUrl",
            "minResolution": 0,
            "maxResolution": 100000000,
            "zoomSymbols": [{
                "minResolution": 0,
                "maxResolution": 100000000,
                "filter": "none",
                "symbols": [{
                    "lineWidth": 10,
                    "lineColor": "#FFFF00",
                    "imageSrc": "view/chinatransinfo/lwjc/yxjc/img/zjgl_m.png"
                }]
            }]
        },
        WATERWAY_UNDER_CONSTRUCTION: {
            layerName: "在建水运",
            dataUrl: "irest/base/basemap/query?layerName=WATERWAY_UNDER_CONSTRUCTION&where=PROJECT_TYPE=2 and STATUS !=3 ",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Line",
            idField: "ID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    lineWidth: 10,
                    lineColor: "#FFFF00",
                    imageSrc: "view/chinatransinfo/lwjc/yxjc/img/zjgl_m.png"
                }]
            }]
        },
        RAILWAY_UNDER_CONSTRUCTION: {
            layerName: "在建铁路",
            dataUrl: "irest/base/basemap/query?layerName=RAILWAY_UNDER_CONSTRUCTION&where=PROJECT_TYPE=1 and STATUS !=3 ",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "ID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    lineWidth: 10,
                    lineColor: "#FFFF00",
                    imageSrc: "view/chinatransinfo/lwjc/yxjc/img/zjtl_m.png"
                }]
            }]
        },
        COMPLETION_OF_HIGHWAY: {
            layerName: "竣工公路",
            dataUrl: "irest/base/basemap/query?layerName=COMPLETION_OF_HIGHWAY&where=PROJECT_TYPE=1 and STATUS =3 ",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Line",
            idField: "ID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    lineWidth: 10,
                    lineColor: "#FFFF00",
                    imageSrc: "view/chinatransinfo/lwjc/yxjc/img/wggl_m.png"
                }]
            }]
        },
        COMPLETION_OF_WATERWAY: {
            layerName: "竣工水运",
            dataUrl: "irest/base/basemap/query?layerName=COMPLETION_OF_WATERWAY&where=PROJECT_TYPE=3 and STATUS =3 ",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Line",
            idField: "ID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    lineWidth: 10,
                    lineColor: "#FFFF00",
                    imageSrc: "view/chinatransinfo/lwjc/yxjc/img/wgsy_m.png"
                }]
            }]
        },
        COMPLETION_OF_RAILWAY: {
            layerName: "竣工铁路",
            dataUrl: "irest/base/basemap/query?layerName=COMPLETION_OF_RAILWAY&where=PROJECT_TYPE=2 and STATUS =3 ",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Line",
            idField: "ID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    lineWidth: 10,
                    lineColor: "#FFFF00",
                    imageSrc: "view/chinatransinfo/lwjc/yxjc/img/wgtl_m.png"
                }]
            }]
        },
        SOLR_SEARCH: {
            "layerName": "全文搜索结果",
            "dataUrl": "irest/base/basemap/query?layerName={layerId}",
            "delayLoadData": true,
            "httpMethod": "POST",
            "datasourceType": "ogisRest",
            "shapeType": "Point",
            "idField": "id",
            "projection": "4326",
            "rendererType": "Unique",
            "rendererColumn": "",
            "textColumn": "",
            "titleColumn": "name",
            "rarefy": true,
            "onLayerFeatureClick": window.showFeatureInfoWithUrl,
            "minResolution": 0,
            "maxResolution": 100000000,
            "featureLayerId": function (feature) {
                var layerId = feature.getProperties().type;
                if (layerId == "TR_LWJC_DEVICES") layerId = "LWJC_MONITOR_PLACE";
                return mapConfig.layerIds[layerId] || layerId;
            },
            "styleFunction": function (feature, resolution) {
                var layerId = this.getFeatureLayerId(feature);
                return this.getVectorFeatureStyle(feature, resolution, layerId);
            }
        },
        RISK: {
            "layerName": "风险源",
            "dataUrl": "irest/base/basemap/query?layerName=RISK",
            "delayLoadData": true,
            "httpMethod": "GET",
            "datasourceType": "ogisRest",
            "shapeType": "Point",
            "pagewidth": "620",
            "idField": "ID",
            "projection": "4326",
            "rendererType": "Unique",
            "rendererColumn": "ICON",
            "titleColumn": "RISK_NAME|name|NAME",
            "textColumn": "",
            "rarefy": true,
            "onLayerFeatureClick": "window.showFeatureInfoWithUrl",
            "minResolution": 0,
            "maxResolution": 100000000,
            "zoomSymbols": [{
                "minResolution": 0,
                "maxResolution": 100000000,
                "filter": "none",
                "symbols": [{
                        "value": "#DEFAULT#",
                        "imageSrc": "view/chinatransinfo/lwjc/yxjc/img/fxy_m.png"
                    },
                    {
                        "value": "-1",
                        "imageSrc": "view/chinatransinfo/lwjc/yxjc/img/fxy_ed.png"
                    },
                    {
                        "value": "1",
                        "imageSrc": "view/chinatransinfo/lwjc/yxjc/img/fxy_zd.png"
                    },
                    {
                        "value": "2",
                        "imageSrc": "view/chinatransinfo/lwjc/yxjc/img/fxy_zd.png"
                    }
                ]
            }]
        },
        HIDEN_DANGER: {
            "layerName": "隐患",
            "dataUrl": "irest/base/basemap/query?layerName=HIDEN_DANGER",
            "delayLoadData": true,
            "httpMethod": "GET",
            "pagewidth": "620",
            "datasourceType": "ogisRest",
            "shapeType": "Point",
            "idField": "ID",
            "projection": "4326",
            "rendererType": "Unique",
            "rendererColumn": "ICON",
            "titleColumn": "DANGER_NAME|name|NAME",
            "textColumn": "",
            "rarefy": true,
            "onLayerFeatureClick": "window.showFeatureInfoWithUrl",
            "minResolution": 0,
            "maxResolution": 100000000,
            "zoomSymbols": [{
                "minResolution": 0,
                "maxResolution": 100000000,
                "filter": "none",
                "symbols": [{
                        "value": "#DEFAULT#",
                        "imageSrc": "view/chinatransinfo/lwjc/yxjc/img/yinh_m.png"
                    },
                    {
                        "value": "-1",
                        "imageSrc": "view/chinatransinfo/lwjc/yxjc/img/yinh_ed.png"
                    },
                    {
                        "value": "1",
                        "imageSrc": "view/chinatransinfo/lwjc/yxjc/img/yh_zd.png"
                    }
                ]
            }]
        },
        ROAD_SECTION: {
            layerName: "路线",
            dataUrl: "irest/base/basemap/query?layerName=ROAD_SECTION",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Line",
            idField: "ID",
            projection: "4326",
            pagewidth: "1000",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    lineWidth: 10,
                    lineColor: "#FFFF00"
                }]
            }]
        },
        // ROAD_LINE: {
        //     "layerName": "路线",
        //     "dataUrl": "irest/base/basemap/road",
        //     "delayLoadData": true,
        //     "httpMethod": "POST",
        //     "pagewidth": "820",
        //     "datasourceType": "ogisRest",
        //     "shapeType": "Line",
        //     "idField": "id",
        //     "projection": "4326",
        //     "rendererType": "Unique",
        //     "rendererColumn": "",
        //     "textColumn": "",
        //     "titleColumn": "name",
        //     "rarefy": true,
        //     "onLayerFeatureClick": "window.showFeatureInfo",
        //     "minResolution": 0,
        //     "maxResolution": 100000000,
        //     "zoomSymbols": [{
        //         "minResolution": 0,
        //         "maxResolution": 100000000,
        //         "filter": "none",
        //         "symbols": [{
        //             "lineWidth": 6,
        //             "lineColor": "#0066CC"
        //         }]
        //     }],
        //     "selectedZoomSymbols": [{
        //         "minResolution": 0,
        //         "maxResolution": 100000000,
        //         "filter": "none",
        //         "symbols": [{
        //             "lineWidth": 6,
        //             "lineColor": "#EC6A00"
        //         }]
        //     }]
        // },
        AQUUEDUCT: {
            "layerName": "跨线桥（渡槽）",
            "dataUrl": "irest/base/basemap/query?layerName=AQUUEDUCT",
            "delayLoadData": true,
            "httpMethod": "GET",
            "pagewidth": "620",
            "datasourceType": "ogisRest",
            "shapeType": "Point",
            "idField": "ID",
            "projection": "4326",
            "rendererType": "Unique",
            "rendererColumn": "",
            "textColumn": "",
            "rarefy": true,
            "onLayerFeatureClick": "window.showFeatureInfoWithUrl",
            "minResolution": 0,
            "maxResolution": 100000000,
            "zoomSymbols": [{
                "minResolution": 0,
                "maxResolution": 100000000,
                "filter": "none",
                "symbols": [{
                    "value": "#DEFAULT#",
                    "imageSrc": "view/chinatransinfo/lwjc/yxjc/img/kxq_m.png"
                }]
            }]
        },
        GL_FERRY: {
            "layerName": "公路渡口",
            "dataUrl": "irest/base/basemap/query?layerName=GL_FERRY",
            "delayLoadData": true,
            "httpMethod": "GET",
            "datasourceType": "ogisRest",
            "shapeType": "Point",
            "pagewidth": "620",
            "idField": "ID",
            "projection": "4326",
            "rendererType": "Unique",
            "rendererColumn": "",
            "textColumn": "",
            "rarefy": true,
            "onLayerFeatureClick": "window.showFeatureInfoWithUrl",
            "minResolution": 0,
            "maxResolution": 100000000,
            "zoomSymbols": [{
                "minResolution": 0,
                "maxResolution": 100000000,
                "filter": "none",
                "symbols": [{
                    "value": "#DEFAULT#",
                    "imageSrc": "view/chinatransinfo/lwjc/yxjc/img/gldk_m.png"
                }]
            }]
        },
        SERVICE_ORG: {
            layerName: "管理服务机构",
            dataUrl: "irest/base/basemap/query?layerName=SERVICE_ORG",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "ID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            rarefy: true,
            //symbolDistance:60,
            onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "view/chinatransinfo/lwjc/yxjc/img/fwjg_m.png"
                }]
            }]
        },
        TRAFFIC_HUB: {
            layerName: "交通运输枢纽",
            dataUrl: "irest/base/basemap/query?layerName=TRAFFIC_HUB",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "ID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "TRAFFIC_HUB_TYPE",
            textColumn: "",
            rarefy: true,
            //symbolDistance:60,
            onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                        value: "#DEFAULT#",
                        imageSrc: "view/chinatransinfo/lwjc/yxjc/img/jtsn_m.png"
                    },
                    {
                        value: "1",
                        imageSrc: "view/chinatransinfo/lwjc/yxjc/img/kycz_m.png"
                    },
                    {
                        value: "2",
                        imageSrc: "view/chinatransinfo/lwjc/yxjc/img/jtsn_m.png"
                    },
                    {
                        value: "3",
                        imageSrc: "view/chinatransinfo/lwjc/yxjc/img/hkg_m.png"
                    },
                    {
                        value: "4",
                        imageSrc: "view/chinatransinfo/lwjc/yxjc/img/dxwly_m.png"
                    },
                    {
                        value: "5",
                        imageSrc: "view/chinatransinfo/lwjc/yxjc/img/ccjd_m.png"
                    },
                    {
                        value: "6",
                        imageSrc: "view/chinatransinfo/lwjc/yxjc/img/pfsc_m.png"
                    }
                ]
            }]
        },
        PASSENGER_STATION: {
            layerName: "客运场站",
            dataUrl: "api/omap/irest/base/basemap/query?layerName=PASSENGER_STATION",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "name",
            rarefy: true,
            //symbolDistance:60,
            onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "http://192.167.252.246:8088/view/img/kyz.png"
                }]
            }]
        },
        banxianindex: {
            layerName: "客运站",
            dataUrl: "api/tocc/kyjc_indexHandler/getStationLonAndLatInfo",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "flow",
            textColumn: "stationName",
            rarefy: true,
            //symbolDistance:60,
            onLayerFeatureClick: window.getBxkyInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                        value: "#DEFAULT#",
                        imageSrc: "",
                        text: {
                            font: "10px 宋体,sans-serif",
                            offsetX: 0,
                            offsetY: 21,
                            fillColor: "#fff",
                            stroke: {
                                color: "#fff"
                            }
                        }
                    },
                    {
                        value: 0,
                        imageSrc: "http://192.167.252.246:8088/view/img/bxky.png",
                        text: {
                            font: "10px 宋体,sans-serif",
                            offsetX: 0,
                            offsetY: 18,
                            fillColor: "#fff",
                            stroke: {
                                color: "#fff"
                            }
                        }
                    }
                ]
            }]
        },
        clxxxq: {
            layerName: "车俩信息详情",
            dataUrl: "api/tocc/kyjc_indexHandler/getVehicleDetailInfo",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "status",
            textColumn: "vehicleNo",
            rarefy: true,
            symbolDistance: 160,
            // onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                        value: 0,
                        imageSrc: "http://192.167.252.246:8088/view/img/bxky.png",
                        text: {
                            font: "10px 宋体,sans-serif",
                            offsetX: 0,
                            offsetY: 18,
                            fillColor: "#fff",
                            stroke: {
                                color: "#fff"
                            }
                        }
                    },
                    {
                        value: 1,
                        imageSrc: "http://192.167.252.246:8088/view/img/bxkyOut.png",
                        text: {
                            font: "10px 宋体,sans-serif",
                            offsetX: 0,
                            offsetY: 18,
                            fillColor: "#fff",
                            stroke: {
                                color: "#fff"
                            }
                        }
                    },
                    {
                        value: 3,
                        imageSrc: "http://192.167.252.246:8088/p/tocc/view/chinatransinfo/lkfx/img/bike_hl.png",
                        text: {
                            font: "10px 宋体,sans-serif",
                            offsetX: 0,
                            offsetY: 18,
                            fillColor: "#87CEEB",
                            stroke: {
                                color: "#87CEEB"
                            }
                        }
                    },
                    {
                        value: "#DEFAULT#",
                        imageSrc: "http://192.167.252.246:8088/p/tocc/view/chinatransinfo/lkfx/img/bike_qt.png",
                        text: {
                            font: "10px 宋体,sans-serif",
                            offsetX: 0,
                            offsetY: 18,
                            fillColor: "#87CEEB",
                            stroke: {
                                color: "#87CEEB"
                            }
                        }
                    }
                ]
            }]
        },
        bxzxcl: {
            layerName: "班线在线车辆",
            dataUrl: "api/tocc/kyjc_indexHandler/getOnlineVehicleList",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "status",
            // textColumn: "vehicleNo",
            rarefy: true,
            symbolDistance: 160,
            // onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "http://192.167.252.246:8089/image/smallPoint1.png",
                    text: {
                        font: "10px 宋体,sans-serif",
                        offsetX: 0,
                        offsetY: 18,
                        fillColor: "#87CEEB",
                        stroke: {
                            color: "#87CEEB"
                        }
                    }
                }]
            }]
        },
        GD_STATION: {
            layerName: "地铁站点名称",
            dataUrl: "api/omap/irest/base/basemap/query?layerName=GD_STATION",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "name",
            textColumn: "",
            rarefy: true,
            //symbolDistance:60,
            // onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 1000000,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "view/chinatransinfo/lwjc/yxjc/imgfrom7section/jyz_m.png"
                }]
            }]
        },
        BLOCK_EVENT: {
            layerName: "阻断事件",
            dataUrl: "irest/base/basemap/query?layerName=BLOCK_EVENT&where=REOPENING=1",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "ID",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            rarefy: true,
            //symbolDistance:60,
            onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "view/chinatransinfo/lwjc/yxjc/img/zd_jcsj.gif"
                }]
            }]
        },
        BUS_LINE: {
            layerName: "公交线路",
            dataUrl: "api/omap/irest/base/basemap/query?layerName=BUS_LINE",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Line",
            idField: "id",
            projection: "4326",
            maxNum: 10000,
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "lineLevel",
            textColumn: "",
            titleColumn: 'name',
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                // symbols: [
                //     {
                //         lineWidth: 2,
                //         lineColor: "#2056DD",
                //     }
                // ]
                symbols: [{
                        value: "#DEFAULT#",
                        lineWidth: 2,
                        lineColor: "#CC91E2",
                    },
                    {
                        value: "1",
                        lineWidth: 2,
                        lineColor: "#2056DD",
                    },
                    {
                        value: "2",
                        lineWidth: 2,
                        lineColor: "#FFFF00",
                    },
                    {
                        value: "3",
                        lineWidth: 2,
                        lineColor: "#00B050",
                    },
                    {
                        value: "4",
                        lineWidth: 2,
                        lineColor: "#72F6FA",
                    },
                    {
                        value: "5",
                        lineWidth: 2,
                        lineColor: "#CC91E2",
                    }
                ]
            }]
        },
        BUS_LINE_QUICK: {
            layerName: "公交线路_快线",
            dataUrl: "api/omap/irest/base/basemap/query?layerName=BUS_LINE_QUICK",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Line",
            idField: "id",
            projection: "4326",
            maxNum: 10000,
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            titleColumn: 'name',
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                // symbols: [
                //     {
                //         lineWidth: 2,
                //         lineColor: "#2056DD",
                //     }
                // ]
                symbols: [{
                        lineWidth: 2,
                        lineColor: "#2056DD",
                    },

                ]
            }]
        },

        BUS_LINE_MAIN: {
            layerName: "公交线路_干线",
            dataUrl: "api/omap/irest/base/basemap/query?layerName=BUS_LINE_MAIN",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Line",
            idField: "id",
            projection: "4326",
            maxNum: 10000,
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            titleColumn: 'name',
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                // symbols: [
                //     {
                //         lineWidth: 2,
                //         lineColor: "#2056DD",
                //     }
                // ]
                symbols: [{
                        lineWidth: 2,
                        lineColor: "#FFFF00",
                    },

                ]
            }]
        },
        BUS_LINE_REGIONAL: {
            layerName: "公交线路_支线",
            dataUrl: "api/omap/irest/base/basemap/query?layerName=BUS_LINE_REGIONAL",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Line",
            idField: "id",
            projection: "4326",
            maxNum: 10000,
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            titleColumn: 'name',
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                // symbols: [
                //     {
                //         lineWidth: 2,
                //         lineColor: "#2056DD",
                //     }
                // ]
                symbols: [{
                        lineWidth: 2,
                        lineColor: "#00B050",
                    },

                ]
            }]
        },
        BUS_LINE_MICRO: {
            layerName: "公交线路_微线",
            dataUrl: "api/omap/irest/base/basemap/query?layerName=BUS_LINE_MICRO",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Line",
            idField: "id",
            projection: "4326",
            maxNum: 10000,
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            titleColumn: 'name',
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                // symbols: [
                //     {
                //         lineWidth: 2,
                //         lineColor: "#2056DD",
                //     }
                // ]
                symbols: [{
                        lineWidth: 2,
                        lineColor: "#72F6FA",
                    },

                ]
            }]
        },
        BUS_LINE_OTHER: {
            layerName: "公交线路_其它",
            dataUrl: "api/omap/irest/base/basemap/query?layerName=BUS_LINE_OTHER",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Line",
            idField: "id",
            projection: "4326",
            maxNum: 10000,
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            titleColumn: 'name',
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                // symbols: [
                //     {
                //         lineWidth: 2,
                //         lineColor: "#2056DD",
                //     }
                // ]
                symbols: [{
                        lineWidth: 2,
                        lineColor: "#CC91E2",
                    },

                ]
            }]
        },
        BUS_STATION: {
            layerName: "公交站点",
            dataUrl: "api/omap/irest/base/basemap/query?layerName=BUS_STATION",
            delayLoadData: true,
            httpMethod: "GET",
            pagewidth: 340,
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "type",
            textColumn: "",
            rarefy: true,
            maxNum: 1000,
            // symbolDistance: 20,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                    minResolution: 0,
                    /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                    maxResolution: 100000000,
                    /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                    filter: "none",
                    /**nonerandomfunction(feature){returnrendererValue}*/
                    symbols: [{
                        value: "#DEFAULT#",
                        imageSrc: "http://192.167.252.246:8089/image/smallPoint1.png",

                    }, {
                        value: "1",
                        imageSrc: "http://192.167.252.246:8089/image/smallPoint2.png",

                    }]
                }
                /*  , {
                      minResolution: 0,
                      /!**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*!/
                      maxResolution: 0.00017185419168508616,
                      /!**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*!/
                      filter: "none",
                      /!**nonerandomfunction(feature){returnrendererValue}*!/
                      symbols: [{
                          value: "#DEFAULT#",
                          imageSrc: "http://192.167.252.246:8088/view/img/bus_point.png",

                      }, {
                          value: "1",
                          imageSrc: "http://192.167.252.246:8089/image/smz.png",

                      }]
                  }*/
            ]
        },
        BUS_HUB_STATION: {
            layerName: "公交枢纽站",
            dataUrl: "api/omap/irest/base/basemap/query?layerName=BUS_HUB_STATION",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "id",
            maxNum: 2000,
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "name",
            rarefy: true,
            symbolDistance: 20,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    // value: "#DEFAULT#",
                    imageSrc: "http://192.167.252.246:8089/image/bus_hub_station.png",
                    text: {
                        font: "12px 幼圆",
                        offsetX: 0,
                        offsetY: 22,
                        fillColor: "#fff",
                        stroke: {
                            color: "#333"
                        }
                    },
                }]
            }]
        },
        BUS_ONLINE: {
            layerName: "在线车辆",
            dataUrl: "api/omap/irest/base/basemap/query?layerName=BUS_ONLINE",
            delayLoadData: true,
            httpMethod: "GET",
            pagewidth: 340,
            maxNum: 20000,
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "type",
            textColumn: "",
            // rarefy: true,
            // symbolDistance: 30,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0.00008592709584254308,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                        value: "#DEFAULT#",
                        imageSrc: "http://192.167.252.246:8089/image/smallPoint2.png",
                    },
                    {
                        value: "2" || "4",
                        imageSrc: "http://192.167.252.246:8089/image/smallPoint3.png", //电动
                    },
                    {
                        value: "1" || "7",
                        imageSrc: "http://192.167.252.246:8089/image/smallPoint1.png", //CNG
                    },
                    {
                        value: "3" || "5" || "6",
                        imageSrc: "http://192.167.252.246:8089/image/smallPoint2.png", //LNG
                    },
                    {
                        value: "8",
                        imageSrc: "http://192.167.252.246:8089/image/smallPoint7.png", //柴油

                    }
                ]
            }, {
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 0.00008592709584254308,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                        value: "#DEFAULT#",
                        imageSrc: "http://192.167.252.246:8089/image/busQt.png",
                    },
                    {
                        value: "2" || "4",
                        imageSrc: "http://192.167.252.246:8089/image/busG.png",
                    },
                    {
                        value: "1" || "7",
                        imageSrc: "http://192.167.252.246:8089/image/bus.png",
                    },
                    {
                        value: "3" || "5" || "6",
                        imageSrc: "http://192.167.252.246:8089/image/busQt.png",
                    },
                    {
                        value: "8",
                        imageSrc: "http://192.167.252.246:8089/image/busCNG.png",

                    }
                ]
            }]
        },
        BUS_ONLINE_LNG: {
            layerName: "在线车辆-LNG",
            dataUrl: "api/omap/irest/base/basemap/query?layerName=BUS_ONLINE_LNG",
            delayLoadData: true,
            httpMethod: "GET",
            maxNum: 20000,
            pagewidth: 340,
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "type",
            textColumn: "",
            // rarefy: true,
            // symbolDistance: 30,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0.00008592709584254308,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "http://192.167.252.246:8089/image/smallPoint2.png",
                }]
            }, {
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 0.00008592709584254308,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "http://192.167.252.246:8089/image/busQt.png",
                }]
            }]
        },
        BUS_ONLINE_CNG: {
            layerName: "在线车辆-CNG",
            dataUrl: "api/omap/irest/base/basemap/query?layerName=BUS_ONLINE_CNG",
            delayLoadData: true,
            httpMethod: "GET",
            maxNum: 20000,
            pagewidth: 340,
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "type",
            textColumn: "",
            // rarefy: true,
            // symbolDistance: 30,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0.00008592709584254308,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "http://192.167.252.246:8089/image/smallPoint1.png",
                }]
            }, {
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 0.00008592709584254308,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "http://192.167.252.246:8089/image/bus.png",
                }]
            }]
        },
        BUS_ONLINE_DD: {
            layerName: "在线车辆-电动",
            dataUrl: "api/omap/irest/base/basemap/query?layerName=BUS_ONLINE_DD",
            delayLoadData: true,
            httpMethod: "GET",
            maxNum: 20000,
            pagewidth: 340,
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "type",
            textColumn: "",
            // rarefy: true,
            // symbolDistance: 30,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0.00008592709584254308,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "http://192.167.252.246:8089/image/smallPoint3.png",
                }]
            }, {
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 0.00008592709584254308,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "http://192.167.252.246:8089/image/busG.png",
                }]
            }]
        },
        BUS_ONLINE_DIESEL: {
            layerName: "在线车辆-柴油",
            dataUrl: "api/omap/irest/base/basemap/query?layerName=BUS_ONLINE_DIESEL",
            delayLoadData: true,
            httpMethod: "GET",
            maxNum: 20000,
            pagewidth: 340,
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "type",
            textColumn: "",
            // rarefy: true,
            // symbolDistance: 30,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0.00008592709584254308,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "http://192.167.252.246:8089/image/smallPoint7.png",
                }]
            }, {
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 0.00008592709584254308,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "#DEFAULT#",
                    imageSrc: "http://192.167.252.246:8089/image/busCNG.png",
                }]
            }]
        },
        BUS_CORRIDOR: {
            layerName: "公交走廊",
            dataUrl: "api/omap/irest/base/basemap/query?layerName=BUS_CORRIDOR",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Line",
            idField: "id",
            projection: "4326",
            maxNum: 10000,
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            titleColumn: 'name',
            rarefy: true,
            // onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                    minResolution: 0,
                    /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                    maxResolution: 100000000,
                    /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                    filter: "none",
                    /**nonerandomfunction(feature){returnrendererValue}*/
                    symbols: [{
                        lineWidth: 8,
                        lineColor: "#2056DD",
                    }]
                }

            ]
        },
        BUS_SPECIAL: {
            layerName: "公交专用道",
            dataUrl: "api/omap/irest/base/basemap/query?layerName=BUS_SPECIAL",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Line",
            idField: "id",
            projection: "4326",
            maxNum: 10000,
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "type",
            // textColumn: "name",
            titleColumn: 'name',
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                        value: "#DEFAULT#",
                        lineWidth: 2,
                        lineColor: "#006AFA",
                    },
                    { //白天时段
                        value: "1",
                        lineWidth: 3,
                        // lineColor: "#2056DD",
                        lineColor: "#006AFA",
                    },
                    { //潮汐
                        value: "2",
                        lineWidth: 3,
                        // lineColor: "#FFFF00",
                        lineColor: "#35AAE7",
                    },
                    { //单向全天候
                        value: "3",
                        lineWidth: 3,
                        lineColor: "#54A74D",
                    },
                    { //高峰
                        value: "4",
                        lineWidth: 3,
                        lineColor: "#E03F46",
                    },
                    { //双向全天候
                        value: "5",
                        lineWidth: 3,
                        lineColor: "#8D3DD7",
                    }
                ]
            }]
        },
        BUS_SPECIAL_DAY: {
            layerName: "公交专用道-白天时段",
            dataUrl: "api/omap/irest/base/basemap/query?layerName=BUS_SPECIAL_DAY",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Line",
            idField: "id",
            projection: "4326",
            maxNum: 10000,
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "type",
            // textColumn: "name",
            titleColumn: 'name',
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                        lineWidth: 3,
                        lineColor: "#006AFA",
                    }

                ]
            }]
        },
        BUS_SPECIAL_TIDE: {
            layerName: "公交专用道-潮汐",
            dataUrl: "api/omap/irest/base/basemap/query?layerName=BUS_SPECIAL_TIDE",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Line",
            idField: "id",
            projection: "4326",
            maxNum: 10000,
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "type",
            // textColumn: "name",
            titleColumn: 'name',
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    lineWidth: 3,
                    lineColor: "#35AAE7",
                }]
            }]
        },
        BUS_SPECIAL_ONEWAY: {
            layerName: "公交专用道-单向全天候",
            dataUrl: "api/omap/irest/base/basemap/query?layerName=BUS_SPECIAL_ONEWAY",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Line",
            idField: "id",
            projection: "4326",
            maxNum: 10000,
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "type",
            // textColumn: "name",
            titleColumn: 'name',
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    lineWidth: 3,
                    lineColor: "#54A74D",
                }]
            }]
        },
        BUS_SPECIAL_PEAK: {
            layerName: "公交专用道-高峰",
            dataUrl: "api/omap/irest/base/basemap/query?layerName=BUS_SPECIAL_PEAK",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Line",
            idField: "id",
            projection: "4326",
            maxNum: 10000,
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "type",
            // textColumn: "name",
            titleColumn: 'name',
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    lineWidth: 3,
                    lineColor: "#E03F46",
                }]
            }]
        },
        BUS_SPECIAL_QUICK: {
            layerName: "公交专用道-快速路",
            dataUrl: "api/omap/irest/base/basemap/query?layerName=BUS_SPECIAL_QUICK",
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Line",
            idField: "id",
            projection: "4326",
            maxNum: 10000,
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "type",
            // textColumn: "name",
            titleColumn: 'name',
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    lineWidth: 3,
                    lineColor: "#8D3DD7",
                }]
            }]
        },
        BUS_CoBUS_METROverRate300: {
            layerName: "500米覆盖率",
            dataUrl: "",
            delayLoadData: true,
            httpMethod: "GET",
            maxNum: 100000,
            datasourceType: "ogisRest",
            shapeType: "Polygon",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            rarefy: true,
            // onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                        value: "#DEFAULT#",
                        imageSrc: "map/images/layers/matou_v.png",
                        fillColor: "rgba(55, 0, 0, 0.6)"
                    },

                ]
            }]
        },
        BUS_CoverRate500: {
            layerName: "300米覆盖率",
            dataUrl: "",
            delayLoadData: true,
            httpMethod: "GET",
            maxNum: 100000,
            datasourceType: "ogisRest",
            shapeType: "Polygon",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            rarefy: true,
            // onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                        value: "#DEFAULT#",
                        imageSrc: "map/images/layers/matou_v.png",
                        fillColor: "rgba(55, 0, 0, 0.6)"
                    },

                ]
            }]
        },
        BUS_METRO: {
            layerName: "公交地铁换乘",
            dataUrl: "api/omap/irest/base/basemap/query?layerName=GD_STATION",
            delayLoadData: true,
            httpMethod: "GET",
            maxNum: 100000,
            datasourceType: "ogisRest",
            shapeType: "Polygon",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            textColumn: "",
            rarefy: true,
            onLayerFeatureClick: window.showFeatureInfo,
            // minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            // maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 0.00017185419168508616,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                        value: "#DEFAULT#",
                        imageSrc: "http://192.167.252.246:8089/image/smallPoint1.png",
                        // fillColor: "rgba(55, 0, 0, 0.6)"
                    },

                ]
            }, {
                minResolution: 0.00017185419168508616,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 10000000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                        value: "#DEFAULT#",
                        imageSrc: "",
                        // fillColor: "rgba(55, 0, 0, 0.6)"
                    },

                ]
            }]
        },
        AREA_VEHICLES: {
            layerName: "区域车辆",
            dataUrl: null,
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "status,vehicleType",
            textColumn: "vehicleNo",
            rarefy: true,
            // symbolDistance: 10,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "0|111",
                    imageSrc: "http://192.167.252.246:8088/view/img/bxkyOut.png",
                    text: {
                        font: "10px 宋体,sans-serif",
                        offsetX: 0,
                        offsetY: 18,
                        fillColor: "#fff",
                        stroke: {
                            color: "#fff"
                        }
                    }
                }, {
                    value: "1|111",
                    imageSrc: "http://192.167.252.246:8088/view/img/bxky.png",
                    text: {
                        font: "10px 宋体,sans-serif",
                        offsetX: 0,
                        offsetY: 18,
                        fillColor: "#fff",
                        stroke: {
                            color: "#fff"
                        }
                    }
                }, {
                    value: "0|114",
                    imageSrc: "http://192.167.252.246:8088/view/img/lybcOut.png",
                    text: {
                        font: "10px 宋体,sans-serif",
                        offsetX: 0,
                        offsetY: 18,
                        fillColor: "#fff",
                        stroke: {
                            color: "#fff"
                        }
                    }
                }, {
                    value: "1|114",
                    imageSrc: "http://192.167.252.246:8088/view/img/lybc.png",
                    text: {
                        font: "10px 宋体,sans-serif",
                        offsetX: 0,
                        offsetY: 18,
                        fillColor: "#fff",
                        stroke: {
                            color: "#fff"
                        }
                    }
                }, {
                    value: "0|140",
                    imageSrc: "http://192.167.252.246:8088/view/img/wxpcOut.png",
                    text: {
                        font: "10px 宋体,sans-serif",
                        offsetX: 0,
                        offsetY: 18,
                        fillColor: "#fff",
                        stroke: {
                            color: "#fff"
                        }
                    }
                }, {
                    value: "1|140",
                    imageSrc: "http://192.167.252.246:8088/view/img/wxpc.png",
                    text: {
                        font: "10px 宋体,sans-serif",
                        offsetX: 0,
                        offsetY: 18,
                        fillColor: "#fff",
                        stroke: {
                            color: "#fff"
                        }
                    }
                }, {
                    value: "0|112",
                    imageSrc: "http://192.167.252.246:8088/view/img/busOut.png",
                    text: {
                        font: "10px 宋体,sans-serif",
                        offsetX: 0,
                        offsetY: 18,
                        fillColor: "#fff",
                        stroke: {
                            color: "#fff"
                        }
                    }
                }, {
                    value: "1|112",
                    imageSrc: "http://192.167.252.246:8088/view/img/bus.png",
                    text: {
                        font: "10px 宋体,sans-serif",
                        offsetX: 0,
                        offsetY: 18,
                        fillColor: "#fff",
                        stroke: {
                            color: "#fff"
                        }
                    }
                }, {
                    value: "0|113",
                    imageSrc: "http://192.167.252.246:8088/view/img/czOut.png",
                    text: {
                        font: "10px 宋体,sans-serif",
                        offsetX: 0,
                        offsetY: 18,
                        fillColor: "#fff",
                        stroke: {
                            color: "#fff"
                        }
                    }
                }, {
                    value: "1|113",
                    imageSrc: "http://192.167.252.246:8088/view/img/cz.png",
                    text: {
                        font: "10px 宋体,sans-serif",
                        offsetX: 0,
                        offsetY: 18,
                        fillColor: "#fff",
                        stroke: {
                            color: "#fff"
                        }
                    }
                }, {
                    value: "0|115",
                    imageSrc: "http://192.167.252.246:8088/view/img/wyczOut.png",
                    text: {
                        font: "10px 宋体,sans-serif",
                        offsetX: 0,
                        offsetY: 18,
                        fillColor: "#fff",
                        stroke: {
                            color: "#fff"
                        }
                    }
                }, {
                    value: "1|115",
                    imageSrc: "http://192.167.252.246:8088/view/img/wycz.png",
                    text: {
                        font: "10px 宋体,sans-serif",
                        offsetX: 0,
                        offsetY: 18,
                        fillColor: "#fff",
                        stroke: {
                            color: "#fff"
                        }
                    }
                }, {
                    value: "#DEFAULT#",
                    imageSrc: "http://192.167.252.246:8088/view/img/bxky.png",
                    text: {
                        font: "10px 宋体,sans-serif",
                        offsetX: 0,
                        offsetY: 18,
                        fillColor: "#fff",
                        stroke: {
                            color: "#fff"
                        }
                    }
                }]
            }, ]
        },
        NATIONWIDE_VEHICLES: {
            layerName: "全国车辆",
            dataUrl: null,
            delayLoadData: true,
            httpMethod: "POST",
            datasourceType: "ogisRest",
            shapeType: "Polygon",
            idField: "id",
            projection: "4326",
            rendererType: "Class",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "allAreaNum",
            // titleColumn:'codeName|allAreaNum',
            textColumn: function (item) {
                let name = item.values_.allAreaNum + '\n' + '\n' + item.values_.codeName
                return name
            },
            rarefy: true,
            // symbolDistance: 20,
            // onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    minValue: 0,
                    maxValue: 50,
                    fillColor: '#0A1B49',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255,.5)",
                    },
                }, {
                    minValue: 50,
                    maxValue: 150,
                    fillColor: '#0B1E50',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255,.6)",
                    },
                }, {
                    minValue: 150,
                    maxValue: 300,
                    fillColor: '#0C2159',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255,.7)",
                    },
                }, {
                    minValue: 300,
                    maxValue: 600,
                    fillColor: '#0E2766',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255,.8)",
                    },
                }, {
                    minValue: 600,
                    maxValue: 5000,
                    fillColor: '#153893',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255,.9)",
                    },
                }, {
                    minValue: 5000,
                    maxValue: 1000000,
                    fillColor: 'rgba(32,86,221,0.9)',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255,.9)",
                    },
                }]
            }],
            // selectedZoomSymbols: [{
            //     minResolution: 0,
            //     /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            //     maxResolution: 100000000,
            //     /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            //     filter: "none",
            //     /**nonerandomfunction(feature){returnrendererValue}*/
            //     symbols: [{
            //         // fillColor: 'rgba(32,86,221,1)',
            //         lineWidth: 1,
            //         lineColor: 'rgba(32, 86, 221,1)',
            //         text: {
            //             font: "16px 幼圆,sans-serif",
            //             fillColor: "#fff",
            //         }
            //     }]
            // }]
        },
        PROVINCE_VEHICLES: {
            layerName: "省内车辆",
            dataUrl: null,
            delayLoadData: true,
            httpMethod: "POST",
            datasourceType: "ogisRest",
            shapeType: "Polygon",
            idField: "id",
            projection: "4326",
            rendererType: "Class",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "allAreaNum",
            // titleColumn:'codeName|allAreaNum',
            textColumn: function (item) {
                let name = item.values_.allAreaNum + '\n' + '\n' + item.values_.codeName
                return name
            },
            rarefy: true,
            // symbolDistance: 20,
            // onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    minValue: 0,
                    maxValue: 100,
                    fillColor: '#0A1B49',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255,.5)",
                    },
                }, {
                    minValue: 100,
                    maxValue: 150,
                    fillColor: '#0B1E50',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255,.6)",
                    },
                }, {
                    minValue: 150,
                    maxValue: 300,
                    fillColor: '#0C2159',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255,.7)",
                    },
                }, {
                    minValue: 300,
                    maxValue: 600,
                    fillColor: '#0E2766',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255,.8)",
                    },
                }, {
                    minValue: 600,
                    maxValue: 5000,
                    fillColor: '#153893',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255,.9)",
                    },
                }, {
                    minValue: 5000,
                    maxValue: 1000000,
                    fillColor: 'rgba(32,86,221,0.9)',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255,.9)",
                    },
                }]
            }],
            // selectedZoomSymbols: [{
            //     minResolution: 0,
            //     /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            //     maxResolution: 100000000,
            //     /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            //     filter: "none",
            //     /**nonerandomfunction(feature){returnrendererValue}*/
            //     symbols: [{
            //         // fillColor: 'rgba(32,86,221,1)',
            //         lineWidth: 1,
            //         lineColor: 'rgba(32, 86, 221,1)',
            //         text: {
            //             font: "16px 幼圆,sans-serif",
            //             fillColor: "#fff",
            //         }
            //     }]
            // }]
        },
        bxky_index_rmmdd: {
            layerName: "班线客运热门目的地",
            dataUrl: null,
            delayLoadData: true,
            httpMethod: "POST",
            datasourceType: "ogisRest",
            shapeType: "Polygon",
            idField: "id",
            projection: "4326",
            rendererType: "Class",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "value",
            // titleColumn:'codeName|allAreaNum',
            textColumn: function (item) {
                let name = "客运量:" + item.values_.value + '\n' + '\n' + "班次:" + item.values_.shifts + '\n' + '\n' + item.values_.toName
                return name
            },
            rarefy: true,
            // symbolDistance: 20,
            // onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                // ["#25272b", "#464f61", "#445577", "#48659e", "#436bbb", "#226ea7", "#0e43b1", "#1457e0", "#2056dd", "#2056dd"];
                symbols: [{ // 1
                    minValue: 0,
                    maxValue: 100,
                    fillColor: 'rgba(32, 83, 197,0.4)',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255,1)",
                    },
                }, { //2
                    minValue: 100,
                    maxValue: 150,
                    fillColor: 'rgba(32, 83, 197,0.6)',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255,1)",
                    },
                }, { //3
                    minValue: 150,
                    maxValue: 300,
                    fillColor: 'rgba(32, 83, 197,0.8)',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255,1)",
                    },
                }, { //4
                    minValue: 300,
                    maxValue: 600,
                    fillColor: 'rgba(32, 83, 197,1)',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255,1)",
                    },
                }, { //5
                    minValue: 600,
                    maxValue: 5000,
                    fillColor: '#436bbb',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255,1)",
                    },
                }, { //6
                    minValue: 5000,
                    maxValue: 1000000,
                    fillColor: 'rgba(11, 76, 239,0.4)',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255,1)",
                    },
                }, { //7
                    minValue: 5000,
                    maxValue: 1000000,
                    fillColor: 'rgba(11, 76, 239,0.4)',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255,1)",
                    },
                }, { //8
                    minValue: 5000,
                    maxValue: 1000000,
                    fillColor: 'rgba(11, 76, 239,0.6)',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255,1)",
                    },
                }, { //9
                    minValue: 5000,
                    maxValue: 1000000,
                    fillColor: 'rgba(11, 76, 239,0.8)',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255,1)",
                    },
                }, { //10
                    minValue: 5000,
                    maxValue: 1000000,
                    fillColor: 'rgba(11, 76, 239,1)',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255,1)",
                    },
                }]
            }],
            // selectedZoomSymbols: [{
            //     minResolution: 0,
            //     /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            //     maxResolution: 100000000,
            //     /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            //     filter: "none",
            //     /**nonerandomfunction(feature){returnrendererValue}*/
            //     symbols: [{
            //         // fillColor: 'rgba(32,86,221,1)',
            //         lineWidth: 1,
            //         lineColor: 'rgba(32, 86, 221,1)',
            //         text: {
            //             font: "16px 幼圆,sans-serif",
            //             fillColor: "#fff",
            //         }
            //     }]
            // }]
        },
        testaa: {
            layerName: "班线客运热门目的地",
            dataUrl: null,
            delayLoadData: true,
            httpMethod: "POST",
            datasourceType: "ogisRest",
            shapeType: "Line",
            idField: "id",
            projection: "4326",
            rendererType: "Class",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "",
            // titleColumn:'codeName|allAreaNum',
            textColumn: function (item) {
                // let name = "客运量:" + item.values_.value + '\n' + '\n' + "班次:" + item.values_.shifts + '\n' + '\n' + item.values_.toName
                // return name
            },
            rarefy: true,
            // symbolDistance: 20,
            // onLayerFeatureClick: window.showFeatureInfoWithUrl,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                // ["#25272b", "#464f61", "#445577", "#48659e", "#436bbb", "#226ea7", "#0e43b1", "#1457e0", "#2056dd", "#2056dd"];
                symbols: [{ // 1
                    minValue: 0,
                    maxValue: 100,
                    fillColor: 'rgba(32, 83, 197,0.4)',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255,1)",
                    },
                }, { //2
                    minValue: 100,
                    maxValue: 150,
                    fillColor: 'rgba(32, 83, 197,0.6)',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255,1)",
                    },
                }, { //3
                    minValue: 150,
                    maxValue: 300,
                    fillColor: 'rgba(32, 83, 197,0.8)',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255,1)",
                    },
                }, { //4
                    minValue: 300,
                    maxValue: 600,
                    fillColor: 'rgba(32, 83, 197,1)',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255,1)",
                    },
                }, { //5
                    minValue: 600,
                    maxValue: 5000,
                    fillColor: '#436bbb',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255,1)",
                    },
                }, { //6
                    minValue: 5000,
                    maxValue: 1000000,
                    fillColor: 'rgba(11, 76, 239,0.4)',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255,1)",
                    },
                }, { //7
                    minValue: 5000,
                    maxValue: 1000000,
                    fillColor: 'rgba(11, 76, 239,0.4)',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255,1)",
                    },
                }, { //8
                    minValue: 5000,
                    maxValue: 1000000,
                    fillColor: 'rgba(11, 76, 239,0.6)',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255,1)",
                    },
                }, { //9
                    minValue: 5000,
                    maxValue: 1000000,
                    fillColor: 'rgba(11, 76, 239,0.8)',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255,1)",
                    },
                }, { //10
                    minValue: 5000,
                    maxValue: 1000000,
                    fillColor: 'rgba(11, 76, 239,1)',
                    lineWidth: 1,
                    lineColor: 'rgba(32, 86, 221,0.6)',
                    text: {
                        font: "12px 幼圆,sans-serif",
                        fillColor: "rgba(255,255,255,1)",
                    },
                }]
            }],
            // selectedZoomSymbols: [{
            //     minResolution: 0,
            //     /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            //     maxResolution: 100000000,
            //     /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            //     filter: "none",
            //     /**nonerandomfunction(feature){returnrendererValue}*/
            //     symbols: [{
            //         // fillColor: 'rgba(32,86,221,1)',
            //         lineWidth: 1,
            //         lineColor: 'rgba(32, 86, 221,1)',
            //         text: {
            //             font: "16px 幼圆,sans-serif",
            //             fillColor: "#fff",
            //         }
            //     }]
            // }]
        },
        BUS_VEHICLES: {
            layerName: "公交运输",
            dataUrl: null,
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "status",
            textColumn: "vehicleNo",
            rarefy: true,
            //symbolDistance: 160,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0.00008592709584254308,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [
                    // {
                    //     value: "0",
                    //     imageSrc: "http://192.167.252.246:8088/view/img/busOut.png",
                    //     text: {
                    //         font: "10px 宋体,sans-serif",
                    //         offsetX: 0,
                    //         offsetY: 18,
                    //         fillColor: "#fff",
                    //         stroke: {
                    //             color: "#fff"
                    //         }
                    //     }
                    // }, 
                    {
                        value: "1",
                        imageSrc: "http://192.167.252.246:8089/image/smallPoint4.png",
                        // text: {
                        //     font: "10px 宋体,sans-serif",
                        //     offsetX: 0,
                        //     offsetY: 18,
                        //     fillColor: "#fff",
                        //     stroke: {
                        //         color: "#fff"
                        //     }
                        // }
                    }
                ]
            }, {
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 0.00008592709584254308,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "1",
                    imageSrc: "http://192.167.252.246:8089/image/bus.png"
                }]
            }]
        },
        NETABOUT_VEHICLES: {
            layerName: "网约出租",
            dataUrl: null,
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "status",
            textColumn: "",
            rarefy: true,
            //symbolDistance: 160,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0.00008592709584254308,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [
                    //     {
                    //     value: "0",
                    //     imageSrc: "http://192.167.252.246:8088/view/img/wyczOut.png",
                    //     text: {
                    //         font: "10px 宋体,sans-serif",
                    //         offsetX: 0,
                    //         offsetY: 18,
                    //         fillColor: "#fff",
                    //         stroke: {
                    //             color: "#fff"
                    //         }
                    //     }
                    // }, 
                    {
                        value: "1",
                        imageSrc: "http://192.167.252.246:8089/image/smallPoint2.png",
                        // text: {
                        //     font: "10px 宋体,sans-serif",
                        //     offsetX: 0,
                        //     offsetY: 18,
                        //     fillColor: "#fff",
                        //     stroke: {
                        //         color: "#fff"
                        //     }
                        // }
                    }
                ]
            }, {
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 0.00008592709584254308,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "1",
                    imageSrc: "http://192.167.252.246:8089/image/cz.png"
                }]
            }]
        },
        CRUISE_VEHICLES: {
            layerName: "巡游出租",
            dataUrl: null,
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "status",
            textColumn: "",
            // textColumn: "plateNumber",
            rarefy: true,
            //symbolDistance: 160,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0.00008592709584254308,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [
                    //     {
                    //     value: "0",
                    //     imageSrc: "http://192.167.252.246:8088/view/img/czOut.png",
                    //     text: {
                    //         font: "10px 宋体,sans-serif",
                    //         offsetX: 0,
                    //         offsetY: 18,
                    //         fillColor: "#fff",
                    //         stroke: {
                    //             color: "#fff"
                    //         }
                    //     }
                    // }, 
                    {
                        value: "1",
                        imageSrc: "http://192.167.252.246:8089/image/smallPoint10.png",
                        // text: {
                        //     font: "10px 宋体,sans-serif",
                        //     offsetX: 0,
                        //     offsetY: 18,
                        //     fillColor: "#fff",
                        //     stroke: {
                        //         color: "#fff"
                        //     }
                        // }
                    }
                ]
            }, {
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 0.00008592709584254308,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "1",
                    imageSrc: "http://192.167.252.246:8089/image/cz.png"
                }]
            }]
        },
        WXPC_VEHICLES: {
            layerName: "危险品车",
            dataUrl: null,
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "status,vehicleType",
            textColumn: "",
            rarefy: true,
            //symbolDistance: 160,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0.00008592709584254308,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "1|141",
                    imageSrc: "http://192.167.252.246:8089/image/smallPoint11.png",
                }]
            }, {
                minResolution: 0,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 0.00008592709584254308,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                    value: "1",
                    imageSrc: "http://192.167.252.246:8089/image/wxpc.png"
                }]
            }]
        },
        LYBC_VEHICLES: {
            layerName: "旅游包车",
            dataUrl: null,
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "status,vehicleType",
            textColumn: "",
            rarefy: true,
            //symbolDistance: 160,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                minResolution: 0.00008592709584254308,
                /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                maxResolution: 100000000,
                /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                filter: "none",
                /**nonerandomfunction(feature){returnrendererValue}*/
                symbols: [{
                        value: "1|114",
                        imageSrc: "http://192.167.252.246:8089/image/smallPoint3.png",
                    },
                    {
                        minResolution: 0,
                        /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                        maxResolution: 0.00008592709584254308,
                        /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                        filter: "none",
                        /**nonerandomfunction(feature){returnrendererValue}*/
                        symbols: [{
                            value: "1|114",
                            imageSrc: "http://192.167.252.246:8089/image/lybc.png"
                        }]
                    }
                ]
            }]
        },
        BXKY_VEHICLES: {
            layerName: "班线客运",
            dataUrl: null,
            delayLoadData: true,
            httpMethod: "GET",
            datasourceType: "ogisRest",
            shapeType: "Point",
            idField: "id",
            projection: "4326",
            rendererType: "Unique",
            /*Simple|Unique|Class*/
            /*Class: min<=value<max*/
            rendererColumn: "status,vehicleType",
            textColumn: "",
            rarefy: true,
            //symbolDistance: 160,
            onLayerFeatureClick: window.showFeatureInfo,
            minResolution: 0,
            /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
            maxResolution: 100000000,
            /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
            zoomSymbols: [{
                    minResolution: 0.00008592709584254308,
                    /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                    maxResolution: 100000000,
                    /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                    filter: "none",
                    /**nonerandomfunction(feature){returnrendererValue}*/
                    symbols: [{
                        value: "1|111",
                        imageSrc: "http://192.167.252.246:8089/image/smallPoint1.png",
                    }]
                },
                {
                    minResolution: 0,
                    /**Theminimumresolution(inclusive)atwhichthislayerwillbevisible.*/
                    maxResolution: 0.00008592709584254308,
                    /**Themaximumresolution(inclusive)atwhichthislayerwillbevisible.*/
                    filter: "none",
                    /**nonerandomfunction(feature){returnrendererValue}*/
                    symbols: [{
                        value: "1|111",
                        imageSrc: "http://192.167.252.246:8089/image/bxky.png"
                    }]
                }
            ]
        },

    },
    layerIds: {
        TR_LWJC_MONITOR_PLACE: "LWJC_MONITOR_PLACE",
        TR_GL_INTERCHANGE: "INTERCHANGE",
        TR_GL_OBSERVASION: "OBSERVASION",
        TR_GL_TOLL_STATION_INFO: "TOLL_STATION",
        TR_GL_SERVICE_AREA_INFO: "SERVICE_AREA",
        TR_GL_OVERLOAD_STATION_INFO: "OVERLOAD_STATION",
        TR_SLJC_PORT: "SLJC_PORT",
        TR_SLJC_RESERVOIR: "SLJC_RESERVOIR",
        TR_SLJC_CHANNEL: "SLJC_CHANNEL",
        TR_SLJC_FLOAT_BRIDGE: "FLOAT_BRIDGE",
        TR_SLJC_MG_STATION: "MG_STATION",
        TR_GL_BRIDGE_INFO: "BRIDGE",
        TR_GL_TUNNEL_INFO: "TUNNEL",
        TR_GL_CULVENT_INFO: "CULVENT",
        TR_SLJC_PORT_AREA: "PORT_AREA",
        TR_SLJC_NAVI_STRUCTURE: "NAVI_STRUCTURE",
        TR_LWJC_WEATHER_STATION: "WEATHER_STATION",
        TR_LWJC_WATER_STATION: "WATER_STATION",
        TR_LWJC_GPS_VEHICLE: "GPS_VEHICLE",
        TR_MONITOR_RISK: "RISK",
        TR_MONITOR_HIDDEN_DANGER: "HIDEN_DANGER",
        TR_GL_ROAD_SECTION: "ROAD_SECTION",
        TR_GL_AQUUEDUCT: "AQUUEDUCT",
        TR_GL_FERRY: "GL_FERRY",
        TR_GL_SERVICE_ORG: "SERVICE_ORG",
        TR_GL_TRAFFIC_HUB: "TRAFFIC_HUB",
        TR_DL_PASSENGER_STATION: "PASSENGER_STATION",
        TR_GL_GAS_STATION: "GAS_STATION",
        // GD_STATION: "GD_STATION",
        TR_EMG_BLOCK_EVENT: "BLOCK_EVENT",
        AREA_VEHICLES: "AREA_VEHICLES",
        NATIONWIDE_VEHICLES: "NATIONWIDE_VEHICLES",
        PROVINCE_VEHICLES: 'PROVINCE_VEHICLES',
    }
};
var mapProxyPageId = new Date().getTime() * 1000 + Math.ceil(Math.random() * 1000);
function TMapProxy() {
    this.tmap = null;
    this.tmapWindow = null;
    this.callbacks = {};
    this.afterTMapLoadedCallbacks = [];
}
window.mapProxy = new TMapProxy();
$(function () {
    window.topwindow = window.parent;
    try {
        while (topwindow.frameElement) {
            topwindow = topwindow.parent;
        }
    } catch (e) {
    }
    var addEventMethod=window.attachEvent?"attachEvent":"addEventListener";
	window[addEventMethod]('message', onMessage, false);
    if (window.topwindow.mapFrame) {
        checkTMapLoaded();
    }
});

function onMessage(e) {
    var msg = (typeof e.data=="string")?JSON.parse(e.data):e.data;
    if (msg.MSG_ID === "ON_GET_MAP_POINT") {
        if (typeof(mapProxy.callbacks.ON_GET_MAP_POINT_CALLBACK) === 'function') {
            mapProxy.callbacks.ON_GET_MAP_POINT_CALLBACK(msg);
        }
    } else if (msg.MSG_ID === "ON_FEATURE_CLICK") {
        var layerId = msg.layerId;
        if (layerId) {
            var callback = mapProxy.callbacks[layerId + "_ON_FEATURE_CLICK_CALLBACK"];
            if (typeof(callback) === 'function') {
                callback(msg);
            }
        }
    }
}

function checkTMapLoaded(flag) {
	if(flag&&mapProxy.waitMapLoaded)return ;
	mapProxy.waitMapLoaded=true;
    if (!mapProxy.getTMap()) {
        setTimeout(checkTMapLoaded, 100);
    } else {
        var callbacks = mapProxy.afterTMapLoadedCallbacks;
        for (var i = 0; i < callbacks.length; i++) {
        	if(typeof callbacks[i].method=="string"){
        		mapProxy[callbacks[i].method].apply(mapProxy, callbacks[i].params);
        	}else{
        		callbacks[i].method(callbacks[i].params);
        	}
        }
        if (typeof window.afterTMapLoaded === "function") {
            window.afterTMapLoaded();
        }
    }
}


TMapProxy.prototype.safeExcute = function (method) {
    if (method || (typeof TMapProxy[method]) === "function") {
        var params = [];
        for (var i = 1; i < arguments.length; i++) {
            params[i - 1] = arguments[i];
        }
        if (this.getTMap()) {
        	if(typeof method=="string"){
        		this[method].apply(this, params);
        	}else{
        		method(params);
        	}
        } else {
        	if(TMapProxy[method]&&/remove/.test(method)){
        		;//移除操作直接忽略
        	}else{
        		this.afterTMapLoadedCallbacks.push({method: method, params: params});
        	}
        }
    }
    checkTMapLoaded(true);
};
TMapProxy.prototype.getTMap = function () {
    if (!this.tmap) {
        this.tmapWindow = topwindow.tmapWindow;
    }
    if(topwindow.tmap){
    	this.tmap = topwindow.tmap;
    }
    return this.tmap;
};

/**向TMap对象发送一个消息
 * 告诉TMap，要监听哪个事件*/
TMapProxy.prototype.listenEvent = function (msgId, params) {
    var self = this;
    if (!this.getTMap()) {
        setTimeout(function () {
            self.listenEvent(msgId, params);
        }, 1000);
        return;
    }
    var msgData = {};
    msgData.MSG_ID = msgId;
    msgData.params = params;
    this.tmapWindow.postMessage(JSON.stringify(msgData), "*");
};

TMapProxy.prototype.setLayerVisible = function (layerId, visible) {
    this.getTMap();
    return this.tmap.setLayerVisible(layerId, visible);
};

TMapProxy.prototype.getMapZoomLevel = function () {
    this.getTMap();
    return this.tmap.getMapZoomLevel();
};

TMapProxy.prototype.setMapZoomLevel = function (level) {
    this.getTMap();
    this.tmap.setMapZoomLevel(level);
};

TMapProxy.prototype.getMapExtent = function () {
    this.getTMap();
    return this.tmap.getMapExtent();
};
/**
 * x为行政区域编码时，y必须为undefined
 */
TMapProxy.prototype.centerAt = function (x, y,mapLevel) {
    this.getTMap();
    return this.tmap.centerAt(x, y,mapLevel);
};

TMapProxy.prototype.setMapExtent = function (xmin, ymin, xmax, ymax, scale) {
    this.getTMap();
    this.tmap.setMapExtent(xmin, ymin, xmax, ymax, scale);
};
/**
 * 使图层所有元素可见
 */
TMapProxy.prototype.viewInLayer = function(layerId){
	this.getTMap();
    this.tmap.viewInLayer(layerId);
}
TMapProxy.prototype.clickForMapPoint = function (onGetMapPoint) {
    this.callbacks.ON_GET_MAP_POINT_CALLBACK = onGetMapPoint;	//goto onMessage(e);
    return this.listenEvent("GET_MAP_POINT", null);
};
TMapProxy.prototype.cancelClickForMapPoint = function(){
	this.getTMap();
	return this.tmap.cancelClickForMapPoint();
}
TMapProxy.prototype.addLayer = function (layerId, dataDispose, vacuate, url,param) {//by k
    this.getTMap();
    return this.tmap.addLayer(layerId, dataDispose, vacuate, url,param);//by k
};

/**
 * 通过指定url添加Ags切片地图
 * 地图配置仍来自于配置文件，数据地址动态传入
 * 创建者：LDjiang
 * 创建时间：2018年11月14日 10:17
 */
TMapProxy.prototype.addAgsTileLayerByUrl = function (layerId, url) {
    this.getTMap();
    return this.tmap.addAgsTileLayerByUrl(layerId, url);
};


TMapProxy.prototype.removeLayer = function (layerId, layerConfigId) {
    this.getTMap();
    return this.tmap.removeLayer(layerId, layerConfigId);
};

/**监听Feature的Click事件。
 *
 * @param layerId 仅仅监听此图层
 * @param callback feature点击时的回调函数。参数为(data); data的定义为: {layerId,layerName,featureId,coordinate}
 * @returns
 */
TMapProxy.prototype.onFeatureClick = function (layerId, callback) {
    this.callbacks[layerId + "_ON_FEATURE_CLICK_CALLBACK"] = callback;	//goto onMessage(e);
    return this.listenEvent("ON_FEATURE_CLICK", null);
};
/**弹出一个信息框
 * @param coordinate 坐标，一个数组，比如[126.3344,39.3212]
 * @param html  要显示的html内容
 * @param title
 * @param width
 * @param height
 * @param showToolbar
 * @title 标题，目前没有使用
 * @width 信息框的宽度 可以为空，0表示空
 * @height 信息框的高度 可以为空，0表示空
 * @author wanghua
 */
TMapProxy.prototype.popupHtml = function (coordinate, html, title, width, height, showToolbar) {
    return this.getTMap().popupHtml(coordinate, html, title, width, height, showToolbar);
};
/**弹出一个信息框
 * @param coordinate 坐标，一个数组，比如[126.3344,39.3212]
 * @param url
 * @param title
 * @param width
 * @param height
 * @param showToolbar
 * @title 标题，目前没有使用
 * @width 信息框的宽度 可以为空，0表示空
 * @height 信息框的高度 可以为空，0表示空
 * @author wanghua
 */
TMapProxy.prototype.popupUrl = function (coordinate, url, title, width, height, showToolbar) {
    return this.getTMap().popupUrl(coordinate, url, title, width, height, showToolbar);
};
TMapProxy.prototype.popupTip = function(x,y,tipText,mapLevel,feature){
	return this.getTMap().popupTip(x,y, tipText,mapLevel,feature);
};
TMapProxy.prototype.triggerFeatureClick = function(feature,layer,evtCoordinate,pixel){
	this.getTMap().triggerFeatureClick(feature,layer,pixel,evtCoordinate);
}
TMapProxy.prototype.hidePopupWindow = function () {
    this.getTMap().hidePopupWindow();
};
/**根据layerId获取图层
 * @param layerId 图层id，在mapconfig.js中配置图层时，每个图层都有一个唯一的id
 * @author wanghua
 */
TMapProxy.prototype.getLayer = function (layerId) {
    return this.getTMap().getLayer(layerId);
};

/**获取地图中所有图层，包含底图
 * @author lidejiang
 */
TMapProxy.prototype.getAllLayers = function () {
    return this.getTMap().getAllLayers();
};

/**获取feature
 * @author wanghua
 * @param layerId 图层id，在mapconfig.js中配置图层时，每个图层都有一个唯一的id
 * @param featureId feature的id。必须在图层配置时，定义idField属性，才能获取到featureId
 * @returns
 */
TMapProxy.prototype.getFeature = function (layerId, featureId) {
    this.getTMap();
    return this.tmap.getFeature(layerId, featureId);
};

/**
 *根据两个经纬度坐标计算距离
 * @returns
 */
TMapProxy.prototype.calcDistance = function (lat1, lng1, lat2, lng2) {
    this.getTMap();
    return this.tmap.calcDistance(lat1, lng1, lat2, lng2);
};

/**
 * 测距
 * @returns
 */
TMapProxy.prototype.measureLength = function () {
    this.getTMap();
    return this.tmap.measureLength();
};

/**
 * 测面积
 * @returns
 */
TMapProxy.prototype.measureArea = function () {
    this.getTMap();
    return this.tmap.measureArea();
};

/**
 * 绘图工具
 * @param drawType 绘图类型（ployline、polygon、circle）
 * @param callback 回调函数
 * @returns
 */
TMapProxy.prototype.setActiveTool = function (drawType, callback) {
    this.getTMap();
    return this.tmap.setActiveTool(drawType, callback);
};
/**
 * 态势标绘
 * @param plotType 标绘类型
 * @returns
 */
TMapProxy.prototype.setPlotTool = function (plotType) {
    this.getTMap();
    return this.tmap.setPlotTool(plotType);
};

/**
 * 移除单个态势标绘图标
 * @returns
 */
TMapProxy.prototype.delPlotFeature = function () {
    this.getTMap();
    return this.tmap.delPlotFeature();
};

/**
 * 工具类全局变量置为空
 */
TMapProxy.prototype.resetTool = function () {
    this.getTMap();
    return this.tmap.resetTool();
};

/**
 * 在地图上增加一个图表
 * @param id 图表id
 * @param chartOptions echart图表属性
 * @param params 图表图层参数{width,height,stopEvent}
 * @param x 图表所在经度
 * @param y 图表所在纬度
 * @returns {ol.layer.QChart}
 */
TMapProxy.prototype.addChart = function (id, chartOptions, x, y, params) {
    this.getTMap();
    this.tmap.addChart(id, chartOptions,x,y, params);
};
/**
 * 根据html元素id删除图表
 * @param id
 */
TMapProxy.prototype.removeChart = function (id) {
    this.getTMap();
    this.tmap.removeChart(id);
};

//********************************************************************************************************************************************************/
TMapProxy.prototype.addPointOnLayer = function (layerId, pointId, x, y, style, size, color, xoffset, yoffset, angle, outline, text, textStyle, attr, onclick) {
    this.getTMap();
    return this.tmap.addPointOnLayer(layerId, pointId, x, y, style, size, color, xoffset, yoffset, angle, outline, text, textStyle, attr, onclick);
};
TMapProxy.prototype.addPoint = function (pointId, x, y, style, size, color, xoffset, yoffset, angle, outline, text, textStyle, attr, onclick) {
    this.getTMap();
    return this.tmap.addPoint(pointId, x, y, style, size, color, xoffset, yoffset, angle, outline, text, textStyle, attr, onclick);
};
TMapProxy.prototype.addFeatureOnLayer = function (layerId, attr, layerConfigId, showHightAnimation, removeOldFeature) {
    this.getTMap();
    return this.tmap.addFeatureOnLayer(layerId, attr, layerConfigId, showHightAnimation, removeOldFeature);
};
TMapProxy.prototype.modifyPointOnLayer = function (layerId, pointId, newX, newY, text) {
    this.getTMap();
    return this.tmap.modifyPointOnLayer(layerId, pointId, newX, newY, text);
};
TMapProxy.prototype.modifyPoint = function (pointId, newX, newY, text) {
    this.getTMap();
    return this.tmap.modifyPoint(pointId, newX, newY, text);
};

TMapProxy.prototype.addImagePointOnLayer = function (layerId, pointId, x, y, imageUrl, valign, text, textOffsetY, textStyle, attr, onclick) {
    this.getTMap();
    return this.tmap.addImagePointOnLayer(layerId, pointId, x, y, imageUrl, valign, text, textOffsetY, textStyle, attr, onclick);
};
TMapProxy.prototype.addImagePoint = function (pointId, x, y, imageUrl, valign, text, textOffsetY, textStyle, attr, onclick) {
    this.getTMap();
    return this.tmap.addImagePoint(pointId, x, y, imageUrl, valign, text, textOffsetY, textStyle, attr, onclick);
};

TMapProxy.prototype.removePointOnLayer = function (layerId, pointId) {
    this.getTMap();
    return this.tmap.removePointOnLayer(layerId, pointId);
};
TMapProxy.prototype.removePoint = function (pointId) {
    this.getTMap();
    return this.tmap.removePoint(pointId);
};

TMapProxy.prototype.clearPointsOnLayer = function (layerId, fast) {
    this.getTMap();
    return this.tmap.clearPointsOnLayer(layerId, fast);
};
TMapProxy.prototype.clearPoints = function (fast) {
    this.getTMap();
    return this.tmap.clearPoints(fast);
};
TMapProxy.prototype.addHightAnimation = function (x, y, id) {
    this.getTMap();
    return this.tmap.addHightAnimation(x, y, id);
};
TMapProxy.prototype.addOverlay = function (groupId, overlayId, html, x, y, attr,onclick,offset) {
    this.getTMap();
    return this.tmap.addOverlay(groupId, overlayId, html, x, y,attr,onclick,offset);
};
TMapProxy.prototype.deleteOverlay = function (overlayId, groupId) {
    this.getTMap();
    return this.tmap.deleteOverlay(overlayId, groupId);
};
TMapProxy.prototype.addImage = function (groupId, imageId, x, y, imgUrl, xoffset, yoffset, attr, textHtml, onclick) {
    this.getTMap();
    return this.tmap.addImage(groupId, imageId, x, y, imgUrl, xoffset, yoffset, attr, textHtml, onclick);
};

TMapProxy.prototype.deleteImage = function (imageId) {
    this.getTMap();
    return this.tmap.deleteImage(imageId);
};

TMapProxy.prototype.deleteImageByGroupId = function (groupId) {
    this.getTMap();
    return this.tmap.deleteImageByGroupId(groupId);
};
//********************************************************************************************************************************************************/
//*********************************************************** Line *********************************************************************************************/
TMapProxy.prototype.addLine = function (lineId, coordinates, width, color, attr, extentTo, onclick) {
    this.getTMap();
    return this.tmap.addLine(lineId, coordinates, width, color, attr, extentTo, onclick);
};
TMapProxy.prototype.addLineFeatureOnLayer = function (layerId, fea, width, color, extentTo, onclick) {
    this.getTMap();
    return this.tmap.addLineFeatureOnLayer(layerId, fea, width, color, extentTo, onclick);
};
TMapProxy.prototype.addLineOnLayer = function (layerId, lineId, coordinates, width, color, attr, extentTo, onclick) {
    this.getTMap();
    return this.tmap.addLineOnLayer(layerId, lineId, coordinates, width, color, attr, extentTo, onclick);
};

TMapProxy.prototype.removeLine = function (lineId) {
    this.getTMap();
    return this.tmap.removeLine(lineId);
};
/**
 * 删除图层上的一个点
 * @param layerId 图层id，如果没有指定，则使用默认的点图层
 * @param lineId  addPoint 或者 addPointImage 的返回值
 * @author wanghua
 */
TMapProxy.prototype.removeLineOnLayer = function (layerId, lineId) {
    this.getTMap();
    return this.tmap.removeLineOnLayer(layerId, lineId);
};

/**
 * @author wanghua
 * @param opt_fast
 */
TMapProxy.prototype.clearLines = function (opt_fast) {
    this.getTMap();
    return this.tmap.clearLines(opt_fast);
};

/**
 * @author wanghua
 * @param layerId
 * @param opt_fast
 */
TMapProxy.prototype.clearLinesOnLayer = function (layerId, opt_fast) {
    this.getTMap();
    return this.tmap.clearLinesOnLayer(layerId, opt_fast);
};

//********************************************************************************************************************************************************/
//*********************************************************** Polygon *********************************************************************************************/
TMapProxy.prototype.addPolygon = function (polygonId, coordinates, color, outline, attr, extentTo, onclick,textStyle) {
    this.getTMap();
    return this.tmap.addPolygon(polygonId, coordinates, color, outline, attr, extentTo, onclick,textStyle);
};

TMapProxy.prototype.addPolygonOnLayer = function (layerId, polygonId, coordinates, color, outline, attr, extentTo, onclick,textStyle) {
    this.getTMap();
    return this.tmap.addPolygonOnLayer(layerId, polygonId, coordinates, color, outline, attr, extentTo, onclick,textStyle);
};

TMapProxy.prototype.removePolygon = function (polygonId) {
    this.getTMap();
    return this.tmap.removePolygon(polygonId);
};

TMapProxy.prototype.removePolygonOnLayer = function (layerId, polygonId) {
    this.getTMap();
    return this.tmap.removePolygonOnLayer(layerId, polygonId);
};

TMapProxy.prototype.clearPolygons = function (opt_fast) {
    this.getTMap();
    return this.tmap.clearPolygons(opt_fast);
};

TMapProxy.prototype.clearPolygonsOnLayer = function (layerId, opt_fast) {
    this.getTMap();
    return this.tmap.clearPolygonsOnLayer(layerId, opt_fast);
};

TMapProxy.prototype.addCircleOnLayer = function (layerId, polygonId, x, y, radius, extentTo) {
    this.getTMap();
    return this.tmap.addCircleOnLayer(layerId, polygonId, x, y, radius, extentTo);
};

//********************************************************************************************************************************************************/
TMapProxy.prototype.parse2Features = function (data, shapeType, idField, datasourceType) {
    this.getTMap();
    return this.tmap.parse2Features(this.tmap, data, shapeType, idField, datasourceType);
};
//********************************************************************************************************************************************************/

/**
 * 历史轨迹回放
 */
TMapProxy.prototype.showGnssHisPath = function (deviceId, gnssPathOption) {
    this.getTMap();
    return this.tmap.showGnssHisPath(deviceId, gnssPathOption);
};

/**
 * 实时轨迹跟踪
 * @param deviceId
 * @param gnssPathOption
 */
TMapProxy.prototype.showGnssRealtimePath = function (deviceId, gnssPathOption) {
    this.getTMap();
    return this.tmap.showGnssRealtimePath(deviceId, gnssPathOption);
};
TMapProxy.prototype.stopGnssHisPath = function (deviceId) {
    return this.getTMap().stopGnssHisPath(deviceId);
};

/**
 * 实时轨迹跟踪
 * @param deviceId
 */
TMapProxy.prototype.stopGnssRealtimePath = function (deviceId) {
    return this.getTMap().stopGnssRealtimePath(deviceId);
};

/**
 * 获取路况地图配置信息
 */
TMapProxy.prototype.getLukMapConfig = function (layerId) {
    return this.tmap.getLukMapConfig(layerId);
};

/**
 * 增加地图事件，地图范围变化时响应
 * by lidejiang
 */
TMapProxy.prototype.onMoveEnd = function(callback){
	this.getTMap();
	this.tmap.onMoveEnd(callback);
};

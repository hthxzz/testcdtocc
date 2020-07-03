//添加右键菜单的元素
!(function(){
	var contextmenuHtml='<div id="contextmenuOverlay" class="omap-context-menu">';
	contextmenuHtml+='<div id="serchRangeDiv" class="ssfw"><lable>搜索范围：</lable><br/><input type="radio" class="radiobutton first_ipt" name="serch_range" value="5" checked="true"><span data-range="0" title="5km范围内">5km</span>';
	contextmenuHtml+='<input type="radio" class="radiobutton" name="serch_range" value="10" style="margin-left:13px;"><span data-range="1" title="10km范围内">10km</span>';
	contextmenuHtml+='<input type="radio" class="radiobutton" name="serch_range" value="20"><span data-range="2" title="20km范围内">20km</span>';
	contextmenuHtml+='<br/><input type="radio" class="radiobutton first_ipt" name="serch_range" value="30"><span data-range="3" title="30km范围内">30km</span>';
	contextmenuHtml+='<input type="radio" class="radiobutton" name="serch_range" value="50"><span data-range="4" title="50km范围内">50km</span>';
	contextmenuHtml+='</div>';
	contextmenuHtml+='<ul class="yj_list"><li data-layer="ROAD_LINE" class="yj_lx" title="附近的路线">附近的路线</li>';
	contextmenuHtml+='<li data-layer="LWJC_MONITOR_PLACE" class="yj_sxt" title="附近摄像头">附近摄像头</li>';
	contextmenuHtml+='<li data-layer="TOLL_STATION,BRIDGE,TUNNEL" class="yj_jcss" title="附近基础设施">附近基础设施</li>';
	contextmenuHtml+='<li data-layer="VW_EMERGENCY_TEAM,TR_EMERGENCY_WAREHOUSE" class="yj_yjzy" title="附近应急资源">附近应急资源</li>';
	//contextmenuHtml+='<li class="yj_fjsj" title="附近的事件">附近的事件</li>';
	contextmenuHtml+='</ul></div>';
	$("body").append(contextmenuHtml);
	$("#contextmenuOverlay").find("li").click(function(){
		tmap.removeLayer();
		var center=tmap.qTipTool.contextmenuOverlay.getPosition();
		var range=parseInt($('#serchRangeDiv input[name="serch_range"]:checked').val()); 
		if(!center)return false;
		//转换为经纬度坐标
		center=tmap.transToLonLat(center);
		var extents=[center[0]-0.05,center[1]-0.04,center[0]+0.05,center[1]+0.04];//[mixx,miny,maxx,maxy]
		for(var i=0;i<extents.length;i++){
			extents[i]=extents[i].toFixed(8);
		}
		//绘制搜索范围框
		tmap.setMapExtent(extents[0],extents[1],extents[2],extents[3]);
		
		//tmap.addCircleOnLayer("test","tset","40000");
		tmap.qTipTool.contextmenuOverlay.setPosition(undefined);//
		//1.0/111000,1度大约代表111公里
		//tmap.addLayer($(this).data("layer"),null,null,null,"points="+extents.join(","));
		var layerIds=$(this).data("layer");
		if(layerIds=="ROAD_LINE"){
			$.get("irest/base/basemap/lngLatToZh",{x:center[0],y:center[1]},function(rs){
				if(rs.data&&rs.data.roadCode){
					var roadLayer=tmap.addLayer("ROAD_LINE");
					var roadDistrict=rs.data.districtId?rs.data.districtId.toString():"";
					var dataDistrict=topwindow.dataLimitDistrictCode;
					if(dataDistrict){
						dataDistrict=dataDistrict.toString().replace(/(00)+$/,"")
					}
					var param="roadCode="+rs.data.roadCode;
					if(rs.data.zh){
						param=param+"&startMile="+(rs.data.zh-50)+"&endMile="+(rs.data.zh*1.0+50);
					}
					//roadLayer.autoCenter=true;
					if(roadDistrict&&dataDistrict&&roadDistrict.indexOf(dataDistrict)!=0){
						param+="&districtId=";  
					}
					roadLayer.loadData(param);  
				}
			});
			
		}else{
			tmap.addCircleOnLayer("","TR_NEARBY_SERCH_CIRCLE__DISABLECLICK",center[0],center[1],range*1000/111000);
			var layerId=layerIds.split(",");
			for(var i=0;i<layerId.length;i++){
				if(layerIds.indexOf("VW")!=-1||layerIds.indexOf("TR_EMERGENCY_WAREHOUSE")!=-1){
					searchByCircle(layerId[i],center,range);
				}else{
					tmap.addLayer(layerId[i]).loadData("points="+center.join(",")+"&buffer="+range*1000+"&filter2=true");
				}
			}
			
		} 
	});
	$("#serchRangeDiv").find("span").click(function(){
		$("#serchRangeDiv input").eq($(this).data("range")).click();
	});
}());
function searchByCircle(layerName,center,range){
	if(!layerName){
		return false;
	}
	var x=center[0],y=center[1];
	var radius=range;
	if(x==""||y==""){
		alert("请设置中心位置的经纬度");
		return false;
	}
	if(radius<2||radius>200){
		alert("搜索半径不能小于2千米或大于200千米");
		return false;
	}
	//$("#exportExcelBar").show();
	var circleId="circle"+parseInt(x*100)+"_"+parseInt(y*100)+"_"+parseInt(radius*10);
/*	if(bufferLayer){
		var isExit=mapProxy.getLayer(bufferLayer.name);
		if(isExit==undefined||bufferLayer.circleId!=circleId){
			//mapProxy.removeLayer("TR_EMG_EVENTINFO_DISPOSED1");
			mapProxy.addCircleOnLayer("TR_EMG_EVENTINFO_DISPOSED_NOTCLEARLAYER","TR_EMG_EVENTINFO_DISPOSED_CIRCLE__DISABLECLICK",longitude,latitude,radius*1000/111000);
			bufferLayer.name="TR_EMG_EVENTINFO_DISPOSED_NOTCLEARLAYER";
			bufferLayer.circleId=circleId;
		};
	}else{
		bufferLayer={};
		//mapProxy.safeExcute("addCircleOnLayer","TR_EMG_EVENTINFO_DISPOSED","TR_EMG_EVENTINFO_DISPOSED_CIRCLE__DISABLECLICK",longitude,latitude,radius*1000);
		bufferLayer.name="TR_EMG_EVENTINFO_DISPOSED";
		bufferLayer.circleId=circleId;
	}*/
	var urlParam={};
	//loading_frame.showOnLoading("搜索中");
/*	if(searchControlLayerName==layerName){
		//detailContainer.hide();
	}*/
	if(layerName.indexOf("VW_EM")==0||layerName=="TR_EMERGENCY_WAREHOUSE"){//应急资源
		urlParam.districtId=$("#districtId").val()||510000;
		urlParam.tableName=layerName;
//		urlParam.columnName=$("#queryColumn").val();
//		urlParam.value=$("#columnValue").val();
		urlParam.scope=radius;
		urlParam.genre="str";
		urlParam.dotx=x;
		urlParam.doty=y;
		urlParam.pageSize=9999;
		urlParam.page=1;
		if(layerName=="VW_EMERGENCY_EXPERT"||layerName=="VW_EMG_RES_SUPPLIER_INFO"||layerName=="VW_EMG_RES_CARRIAGE_COMPANY"){
			urlParam.scope="";
		}
		$.post('rest/base/resourceHandler/searchResource?js_plugin_type=LigerGrid',urlParam,function(data){
			var json={returnFlag:0,layerName:layerName};
			if(!data.hasError){
				json.data=data.Rows;
				json.returnFlag=1;
				loadDefRes(data.Rows,layerName);
    	 	}
			//serachCallback(json);
		});
	}else{
		urlParam.points=x+","+y;
		urlParam.geometryType="Point";
		urlParam.bufferDistance=1000*radius;
		top.window.mapSearch.nearbySearch(layerName,"1=1",urlParam,serachCallback);
	}
	//return true;
}
function loadDefRes(data,layerName){
	tmap.removePoint(null,layerName);
	var oids = "";
	for ( var i = 0; i < data.length; i++) {
		oids += data[i].OID+",";
	}
	oids = oids.length>0?oids.substring(0,oids.length-1):"";
	var imgstr = "";
	var tipAttrName="";
	if(layerName=="VW_EMERGENCY_EQUIPMENT"){//应急设备
		imgstr="map/images/layers/yjzb.png";
	}else if(layerName=="VW_EMERGENCY_MATERIAL"){//应急物资
		imgstr="map/images/layers/yjwz.png";
	}else if(layerName=="TR_EMERGENCY_WAREHOUSE"){//物资库
		imgstr="map/images/layers/wzcbk.png";
	}else if(layerName=="VW_EMG_RES_CARRIAGE_COMPANY"){//运力储备
		imgstr="map/images/layers/station.png";
		tipAttrName="COMPANY_NAME";
	}else if(layerName=="VW_EMG_RES_SUPPLIER_INFO"){//供应商
		imgstr="map/images/layers/gys.png";
		tipAttrName="SUPPLIER";
	}else if(layerName=="VW_EMERGENCY_TEAM"){//应急队伍
		imgstr="map/images/layers/yjdw.png";
		tipAttrName="TEAMNAME";
	}else if(layerName == "VW_EMERGENCY_EXPERT"){//应急专家
		imgstr="map/images/layers/yjzj.png";
	}else if(layerName == "VW_EMG_VEHICHE"){//集结地
		imgstr="map/images/layers/tr_yjjd.png";
	}
	if(layerName=="VW_EMERGENCY_EQUIPMENT"||layerName=="VW_EMERGENCY_MATERIAL"){
		var dataMap={};
		for ( var i = 0; i < data.length; i++) {
			if(data[i].LONGITUDE!=undefined){
				//data[i].EVENTID = eventId;
				data[i].oids = oids;
				data[i].TABLENAME=layerName;
				if(tipAttrName)data[i].NAME=data[i][tipAttrName];
			/*	top.window.mapLayer.addPoint("TR_EMG_RESOURCE"+i,data[i].LONGITUDE,data[i].LATITUDE,data[i],null,layerName);*/
				dataMap[data[i].TO_NAME]=data[i];
			}
		}
		var changdu=Object.keys(dataMap).length;
		if(changdu>0){
			var i=0;
			var dataList=[changdu];
			for(key in dataMap){
				var map={};
				var mapValue={};
				map["OID"]=i+1;
				map["NAME"]=key;
				map["LATITUDE"]=dataMap[key].LATITUDE;
				map["LONGITUDE"]=dataMap[key].LONGITUDE;
				for(var j=0; j< data.length;j++){
					var abc=data[j].TO_NAME;
					if(key== abc){
						mapValue[data[j].NAME]=data[j];
					}
				}
				var sum=Object.keys(mapValue).length;
				var valueList=[sum];
				var k=0;
				for(key2 in mapValue){
					valueList[k]=mapValue[key2];
					k++;
				}
				map["value"]=valueList;//数据数组
				dataList[i]=map;
				i++;
			}
			tmap.addFeatureOnLayer(layerName,dataList,layerName);
		}
		
	}else if(layerName=="VW_EMG_RES_CARRIAGE_COMPANY"||layerName=="VW_EMERGENCY_EXPERT"||layerName=="VW_EMG_RES_SUPPLIER_INFO"){
		
	}else{
		for( var i = 0; i < data.length; i++) {
			if(data[i].LONGITUDE!=undefined){
				//data[i].EVENTID = eventId;
				data[i].oids = oids;
				data[i].TABLENAME=layerName;
				if(tipAttrName)data[i].NAME=data[i][tipAttrName];
		}}
		tmap.addFeatureOnLayer(layerName,data,layerName);
	}
	
}
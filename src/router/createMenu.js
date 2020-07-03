import {
    assistantDecision,
    emergencyCoordination,
    monitoringAndEarlyWarn,
    specialSubjectAnalysis,
    informationPublish

} from "./subRouters";
import {setItem,getItem} from "@/untils/storage";


// import monitoringAndEarlyWarn from "./subRouters/monitoringAndEarlyWarn/busOperationMonitor";



// 路由跟目录
const root = {
    assistantDecision,
    emergencyCoordination,
    specialSubjectAnalysis,
    monitoringAndEarlyWarn,
    informationPublish
}

export function createLeftMenu(routeArr) {
     let path = "/" + routeArr[1] + "/" + routeArr[2] + "/";
    let hoc = routeArr[1];
    //
    // return this.$store.state.app.menuList[hoc];
    var yiji=[];
    let a=JSON.parse(getItem("caidan"));
    for(var i=0;i<a.length;i++) {
        if (a[i].name == hoc) {
            yiji = a[i].children != undefined ? a[i].children : [];
            break;
        }
    }
    const data = yiji.filter((ele) => {
        return ele.name == routeArr[2];
    });
     getFullPath(data[0].children, path);
    return data;

}
// 递归为每个路径添加fullPath
const getFullPath = (data, path) => {
    if (data.length != 0) {
        for (let index = 0; index < data.length; index++) {
            if (path) {
                data[index].fullPath = path + data[index].path;
                if(data[index].meta.icon){
                    data[index].meta.icon=require('@/image/'+data[index].meta.icon);
                }
                if (data[index].children) {
                    getFullPath(data[index].children, data[index].fullPath + "/")
                }
            }

        }
    }

}
// import assistantDecision from "../router/subRouters/assistantDecision.js";
import monitoringAndEarlyWarn from "../router/subRouters/monitoringAndEarlyWarn.js";
import specialSubjectAnalysis from "../router/subRouters/specialSubjectAnalysis.js";
import assistantDecision from "../router/subRouters/assistantDecision.js";
import informationPublish from "../router/subRouters/informationPublish.js";
// assistantDecision.children.forEach(element => {
//     const data = {};
//     data.title = element.meta.title;
//     data.children = element;
//     data.icon = element.meta.icon;
//     data.route = assistantDecision.path + "/" + element.path;
//     arr.push(data);
// });

// 从配置信息生成二级菜单

const getMenu = (menuInfo) => {
    const arr = [];
    menuInfo && menuInfo.children.forEach(element => {
        const data = {};
        data.title = element.meta.title;
        data.children = element;
        data.icon = element.meta.icon;
        data.route = menuInfo.path + "/" + element.path;
        arr.push(data);
    });
    return arr;
}



export default {
    jcyj: [
        ...getMenu(monitoringAndEarlyWarn),
    ],
    //专题检测
    ztjc: [
        ...getMenu(specialSubjectAnalysis),
    ],
    fzjc: [
        ...getMenu(assistantDecision),
    ],

    xxfb: [
        ...getMenu(informationPublish),
    ],
    //应急协同
    yjxt: [{
        "id": "23",
        "title": "双流机场应急协同",
        "icon": require("../assets/index/menu/hyjtxx.png"),
        "route": "/emergencyCoordination/shuangliuAirportIndex"
    }],
    //   fzjc: [...arr],
}
// 预警监测根路由 
// 导入预警监测路由所有的二级路由
// import {
//     busOperationMonitor,
//     roadNetworkOperationMonitor,
//     roadTransportOperationMonitore,
//     AirTransport,
//     modules

// } from "./monitoringAndEarlyWarn/index";

const modulesFiles = require.context('./informationPublish', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    // const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    if (value.default) {
        modules.push(value.default);
    }
    return modules
}, [])
export default {
    //  监测预警
    path: '/informationPublish',
    name: 'informationPublish',
    component: () => import('../../views/layOut/GlobleBaseLayOut.vue'),
    children: [
        // // 公交 运行监测--二级菜单
        // ...busOperationMonitor,
        // // 路网 运行监测--二级菜单
        // ...roadNetworkOperationMonitor,
        // // 路网 道路运输--二级菜单
        // ...roadTransportOperationMonitore,
        // ...AirTransport,
        ...modules.flat()
    ]
}
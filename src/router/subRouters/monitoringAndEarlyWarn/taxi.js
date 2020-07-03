// 预警监测---轨道交通    路由
// roadTransportOperationMonitore
export default [{
    path: 'taxi', //轨道交通 --- 二级菜单
    name: 'taxi',
    redirect: "/monitoringAndEarlyWarn/taxi/index",
    meta: {
        title: "出租车",
        icon: require("@/assets/index/menu/czc.png"),
    },
    component: () => import('@/views/layOut/root/FirstLayout.vue'),
    children: [{
            path: 'index', //轨道交通 ---  运行监测
            name: 'railIndex',
            meta: {
                title: "运行监测",
                icon: require("@/image/common/leftmenu/zhjc.png"),
            },
            component: () => import('../../../views/monitoringAndEarlyWarning/railTraffic/industryOviews/IndustryOviews.vue')
        },

    ]
}]
// 预警监测---轨道交通    路由
// roadTransportOperationMonitore
export default [{
    path: 'railTraffic', //轨道交通 --- 二级菜单
    name: 'railTraffic',
    redirect: "/monitoringAndEarlyWarn/railTraffic/industryOviews",
    meta: {
        title: "轨道交通",
        icon: require("@/assets/index/menu/glys.png"),
    },
    component: () => import('@/views/layOut/root/FirstLayout.vue'),
    children: [{
            path: 'industryOviews', //轨道交通 ---  运行监测
            name: 'railTrafficIndustryOviews',
            meta: {
                title: "运行监测",
                icon: require("@/image/common/leftmenu/zhjc.png"),
            },
            component: () => import('../../../views/monitoringAndEarlyWarning/railTraffic/industryOviews/IndustryOviews.vue')
        },
        // 客流分析
        {
            path: 'PassengerTransport', //客流分析 ---  客流分析
            name: 'lineRoadPassengerTransport',
            meta: {
                icon: require("@/image/common/leftmenu/tjfx.png"),
                title: "统计分析"
            },
            component: () => import('@/views/layOut/root/SecondLayout.vue'),
            redirect: "/monitoringAndEarlyWarn/roadTransportOperationMonitore/PassengerTransport/PassengerFlowTrend",
            children: [{
                    path: 'linePassengerCapacity', //客流分析 --- 线路客运量
                    name: 'linePassengerCapacity',
                    meta: {
                        title: "线路客运量",
                        icon: 'default',
                    },
                    component: () => import('../../../views/monitoringAndEarlyWarning/railTraffic/analysis/linePassengerCapacity.vue')
                },
                {
                    path: 'passengerDistribution', //客流分析 --- 不同时期客流分布
                    name: 'passengerDistribution',
                    meta: {
                        title: "不同时期客流分布",
                        icon: 'default',
                    },
                    component: () => import('../../../views/monitoringAndEarlyWarning/railTraffic/analysis/passengerDistribution.vue')
                }, {
                    path: 'sitePassengerFb', //客流分析 --- 站点客流分布
                    name: 'sitePassengerFb',
                    meta: {
                        title: "站点客流分布",
                        icon: 'default',
                    },
                    component: () => import('../../../views/monitoringAndEarlyWarning/railTraffic/analysis/sitePassengerFb.vue')
                }, {
                    path: 'siteTransfer', //客流分析 --- 站点客流换乘
                    name: 'siteTransfer',
                    meta: {
                        title: "站点客流换乘",
                        icon: 'default',
                    },
                    component: () => import('../../../views/monitoringAndEarlyWarning/railTraffic/analysis/siteTransfer.vue')
                },
                {
                    path: 'stationPassenger', //客流分析 --- 站点客流出行
                    name: 'stationPassenger',
                    meta: {
                        title: "站点客流出行",
                        icon: 'default',
                    },
                    component: () => import('../../../views/monitoringAndEarlyWarning/railTraffic/analysis/stationPassenger.vue')
                }, {
                    path: 'sectionTraffic', //客流分析 --- 断面客流分析
                    name: 'sectionTraffic',
                    meta: {
                        title: "断面客流分析",
                        icon: 'default',
                    },
                    component: () => import('../../../views/monitoringAndEarlyWarning/railTraffic/analysis/sectionTraffic.vue')
                },
                {
                    path: 'customQuery', //客流分析 --- 自定义查询统计
                    name: 'customQuery',
                    meta: {
                        title: "自定义查询统计",
                        icon: 'default',
                    },
                    component: () => import('../../../views/monitoringAndEarlyWarning/railTraffic/analysis/customQuery.vue')
                }
            ]
        },
        // 信息管理
        {
            path: 'infoManage', //
            name: 'infoManage',
            meta: {
                icon: require("@/image/common/leftmenu/jcsj.png"),
                title: "信息管理"
            },
            component: () => import('@/views/layOut/root/SecondLayout.vue'),
            redirect: "/specialSubjectAnalysis/railTraffic/infoManage/lineInfo",
            // 信息管理子路由
            children: [{
                    path: 'lineInfo', //信息管理 --- 线路档案
                    name: 'railTrafficLineInfo',
                    meta: {
                        title: "线路档案",
                        icon: 'default',
                    },
                    component: () => import('../../../views/monitoringAndEarlyWarning/railTraffic/infoManage/lineInfo.vue')
                },
                {
                    path: 'stationInfo', //信息管理 --- 站点档案
                    name: 'railTrafficStationInfo',
                    meta: {
                        title: "站点档案",
                        icon: 'default',
                    },
                    component: () => import('../../../views/monitoringAndEarlyWarning/railTraffic/infoManage/stationInfo.vue')
                }, {
                    path: 'infoSet', //信息管理 --- 信息设置
                    name: 'railTrafficInfoSet',
                    meta: {
                        title: "信息设置",
                        icon: 'default',
                    },
                    component: () => import('../../../views/monitoringAndEarlyWarning/railTraffic/infoManage/infoSet.vue')
                },
            ]
        },

    ]
}]
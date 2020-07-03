// 地面公共交通运行监测   公交运行监测  路由
// busOperationMonitor  
export default [
    // 地面公共交通运行监测--二级菜单
    {
        path: 'busOperationMonitor', //地面公共交通运行监测 --- 二级菜单
        name: 'busOperationMonitor',
        redirect: "/monitoringAndEarlyWarn/busOperationMonitor/homePageIndex",
        meta: {
            title: "地面公共交通",
            icon: require("@/assets/index/menu/dmgj.png"),
        },
        component: () => import('@/views/layOut/root/FirstLayout.vue'),
        children: [
            {
                path: 'homePageIndex', //地面公共交通运行监测 ---  综合 监测
                name: 'homePageIndex',
                meta: {
                    title: " 公交首页",
                    icon: require("@/image/common/leftmenu/zhjc.png"),
                },
                // component: () => import('@/views/monitoringAndEarlyWarning/busOperationMonitor/ComprehensiveMonitor.vue')
                component: () => import('@/views/monitoringAndEarlyWarning/busOperationMonitor/HomePage/HomePageIndex.vue')
            },
            {
                path: 'comprehensiveMonitor', //地面公共交通运行监测 ---  综合 监测
                name: 'comprehensiveMonitor',
                meta: {
                    title: " 行业概览",
                    icon: require("@/image/common/leftmenu/zhjc.png"),
                },
                // component: () => import('@/views/monitoringAndEarlyWarning/busOperationMonitor/ComprehensiveMonitor.vue')
                component: () => import('@/views/monitoringAndEarlyWarning/busOperationMonitor/ComprehensiveMonitor.vue')
            },
            {
                path: 'realTimeMonitor', //地面公共交通运行监测 --- 实时 监测
                name: 'realTimeMonitor',
                meta: {
                    icon: require("@/image/common/leftmenu/nav_xwfx.png"),
                    title: "运行监测"
                },
                component: () => import('@/views/monitoringAndEarlyWarning/busOperationMonitor/RealTimeMonitor.vue')
            },
            {
                path: 'baseData', //地面公共交通运行监测 ---  基础 数据
                name: 'baseData',
                meta: {
                    icon: require("@/image/common/leftmenu/jcsj.png"),
                    title: " 基础数据"
                },
                component: () => import('@/views/layOut/root/SecondLayout.vue'),
                redirect: "/monitoringAndEarlyWarn/busOperationMonitor/baseData/enterpriseInformation",
                // 基础数据子路由
                children: [{
                        path: 'enterpriseInformation', //基础 数据 --- 企业信息
                        name: 'enterpriseInformation',
                        meta: {
                            title: "企业信息",
                            icon: 'default',
                        },
                        component: () => import('@/views/monitoringAndEarlyWarning/busOperationMonitor/BaseData/EnterpriseInformation.vue')
                    },
                    {
                        path: 'vehicleInformation', //基础 数据 --- 车辆信息
                        name: 'vehicleInformation',
                        meta: {
                            title: "车辆信息",
                            icon: 'default',
                        },
                        component: () => import('@/views/monitoringAndEarlyWarning/busOperationMonitor/BaseData/VehicleInformation.vue')
                    }, {
                        path: 'lineInformation', //基础 数据 --- 线路信息
                        name: 'lineInformation',
                        meta: {
                            title: "线路信息",
                            icon: 'default',
                        },
                        component: () => import('@/views/monitoringAndEarlyWarning/busOperationMonitor/BaseData/LineInformation.vue')
                    }, {
                        path: 'busTerminal', //基础 数据 --- 公交场 站
                        name: 'busTerminal',
                        meta: {
                            title: "公交场站",
                            icon: 'default',
                        },
                        component: () => import('@/views/monitoringAndEarlyWarning/busOperationMonitor/BaseData/BusTerminal.vue')
                    }, {
                        path: 'busStation', //基础 数据 ---  公交 站
                        name: 'busStation',
                        meta: {
                            title: "公交站",
                            icon: 'default',
                        },
                        component: () => import('@/views/monitoringAndEarlyWarning/busOperationMonitor/BaseData/BusStation.vue')
                    }, {
                        path: 'practitioners', //基础 数据 --- 从业人员
                        name: 'practitioners',
                        meta: {
                            title: "从业人员",
                            icon: 'default',
                        },
                        component: () => import('@/views/monitoringAndEarlyWarning/busOperationMonitor/BaseData/practitioners.vue')
                    }, {
                        path: 'specialRoad', //基础 数据 --- 专用道
                        name: 'specialRoad',
                        meta: {
                            title: "专用道",
                            icon: 'default',
                        },
                        component: () => import('@/views/monitoringAndEarlyWarning/busOperationMonitor/BaseData/SpecialRoad.vue')
                    }
                ]

            }, {
                path: 'monitorData', //地面公共交通运行监测 --- 监测 数据
                name: 'monitorData',
                meta: {
                    icon: require("@/image/common/leftmenu/nav_jcsj.png"),
                    title: "监测数据"
                },
                component: () => import('@/views/layOut/root/SecondLayout.vue'),
                redirect: "/monitoringAndEarlyWarn/busOperationMonitor/monitorData/LineAdjustment",
                // 基础数据子路由
                children: [{
                        path: 'LineAdjustment', //监测 数据 --- 线路调整
                        name: 'LineAdjustment',
                        meta: {
                            title: "线路调整",
                            icon: 'default',
                        },
                        component: () => import('@/views/monitoringAndEarlyWarning/busOperationMonitor/monitorData/LineAdjustment.vue')
                    },
                    {
                        path: 'BusComplaints', //监测 数据 --- 公交投诉
                        name: 'BusComplaints',
                        meta: {
                            title: "公交投诉",
                            icon: 'default',
                        },
                        component: () => import('@/views/monitoringAndEarlyWarning/busOperationMonitor/monitorData/BusComplaints.vue')
                    }, {
                        path: 'TrafficAccident', //监测 数据 --- 交通事故
                        name: 'TrafficAccident',
                        meta: {
                            title: "交通事故",
                            icon: 'default',
                        },
                        component: () => import('@/views/monitoringAndEarlyWarning/busOperationMonitor/monitorData/TrafficAccident.vue')
                    }, {
                        path: 'TrafficBreakLaw', //监测 数据 --- 交通违法
                        name: 'TrafficBreakLaw',
                        meta: {
                            title: "交通违法",
                            icon: 'default',
                        },
                        component: () => import('@/views/monitoringAndEarlyWarning/busOperationMonitor/monitorData/TrafficBreakLaw.vue')
                    }, {
                        path: 'MonitoringEvents', //监测 数据 --- 监测事件
                        name: 'MonitoringEvents',
                        meta: {
                            title: "监测事件",
                            icon: 'default',
                        },
                        component: () => import('@/views/monitoringAndEarlyWarning/busOperationMonitor/monitorData/MonitoringEvents.vue')
                    }, {
                        path: 'AdministrativePunishment', //监测 数据 --- 行政处罚
                        name: 'AdministrativePunishment',
                        meta: {
                            title: "行政处罚",
                            icon: 'default',
                        },
                        component: () => import('@/views/monitoringAndEarlyWarning/busOperationMonitor/monitorData/AdministrativePunishment.vue')
                    }
                ]

            }
            //  {
            //     path: 'externalData', //地面公共交通运行监测 ---  外部 数据
            //     name: 'externalData',
            //     meta: {
            //         icon: require("@/image/common/leftmenu/nav_aqfx.png"),
            //         title: " 外部数据"
            //     },
            //     component: () => import('@/views/monitoringAndEarlyWarning/busOperationMonitor/ExternalData.vue')
            // }
        ]
    }
]
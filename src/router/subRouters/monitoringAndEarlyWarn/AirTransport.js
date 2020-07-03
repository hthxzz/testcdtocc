// 航空运输运行监测    路由
// AirTransport  
export default [
    // 航空运输运行监测--二级菜单
    {
        path: 'AirTransport', //航空运输运行监测 --- 二级菜单
        name: 'AirTransport',
        redirect: "/monitoringAndEarlyWarn/AirTransport/comprehensiveMonitor",
        meta: {
            title: "航空运输",
            icon: require("@/assets/index/menu/hkys.png"),
        },
        component: () => import('@/views/layOut/root/FirstLayout.vue'),
        children: [{
                path: 'comprehensiveMonitor', //航空运输运行监测 ---  综合 监测
                name: 'comprehensiveMonitor',
                meta: {
                    title: "行业概览",
                    icon: require("@/image/common/leftmenu/zhjc.png"),
                },
                component: () => import('@/views/monitoringAndEarlyWarning/AirTransport/ComprehensiveMonitore.vue')
            },
            {
                path: 'realTimeMonitor', //航空运输运行监测 --- 实时 监测
                name: 'realTimeMonitor',
                meta: {
                    icon: require("@/image/common/leftmenu/nav_xwfx.png"),
                    title: "运行监测"
                },
                component: () => import('@/views/monitoringAndEarlyWarning/AirTransport/RealtimeMonitore.vue')
            },
            {
                path: 'Analysis', //航空运输运行监测 ---  基础 数据
                name: 'Analysis',
                meta: {
                    icon: require("@/image/common/leftmenu/jcsj.png"),
                    title: " 航运分析"
                },
                component: () => import('@/views/layOut/root/SecondLayout.vue'),
                redirect: "/monitoringAndEarlyWarn/AirTransport/Analysis/PassengerFlow",
                // 航运分析子路由
                children: [{
                        path: 'PassengerFlow', //航运分析 --- 进出港客流
                        name: 'PassengerFlow',
                        meta: {
                            title: "进出港客流",
                            icon: 'default',
                        },
                        component: () => import('@/views/monitoringAndEarlyWarning/AirTransport/PassengerFlow.vue')
                    },
                    {
                        path: 'Shift', //航运分析 --- 进出港班次
                        name: 'Shift',
                        meta: {
                            title: "进出港班次",
                            icon: 'default',
                        },
                        component: () => import('@/views/monitoringAndEarlyWarning/AirTransport/Shift.vue')
                    }, {
                        path: 'destination', //航运分析 --- 市内客流分析
                        name: 'destination',
                        meta: {
                            title: "市内客流分析",
                            icon: 'default',
                        },
                        component: () => import('@/views/monitoringAndEarlyWarning/AirTransport/destination.vue')
                    }, {
                        path: 'shiftAnalysis', //航运分析 --- 航运班次分析
                        name: 'shiftAnalysis',
                        meta: {
                            title: "航运班次分析",
                            icon: 'default',
                        },
                        component: () => import('@/views/monitoringAndEarlyWarning/AirTransport/shiftAnalysis.vue')
                    }
                ]

            }
        ]
    }
]
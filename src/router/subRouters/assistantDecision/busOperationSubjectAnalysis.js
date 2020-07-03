// 地面公交运行专题分析   公交运行专题分析  路由
// busOperationSubjectAnalysis
export default [
    // 地面公共交通运行监测--二级菜单
    {
        path: 'busOperationSubjectAnalysis', //地面公共交通运行监测 --- 二级菜单
        name: 'busOperationSubjectAnalysis',
        redirect: "/specialSubjectAnalysis/busOperationSubjectAnalysis/CityBus",
        meta: {
            title: "地面公交运行专题分析",
            icon: require("@/assets/index/menu/dmgj.png"),
        },
        component: () => import('@/views/layOut/root/FirstLayout.vue'),
        children: [
            {
                path: 'CityBus', //地面公共交通运行监测 ---  都市公交
                name: 'CityBus',
                meta: {
                    icon: require("@/image/monitoringAndEarlyWarning/roadNetworkRunMonitor/lwsj.png"),
                    title: " 公交都市"
                },
                component: () => import('@/views/layOut/root/SecondLayout.vue'),
                redirect: "/specialSubjectAnalysis/busOperationSubjectAnalysis/CityBus/CompositeIndicator",
                // 都市公交子路由
                children: [{
                        path: 'CompositeIndicator', //都市公交 --- 综合指标
                        name: 'CompositeIndicator',
                        meta: {
                            title: "综合指标",
                            icon: require("@/views/specialSubjectAnalysis/busOperationSubjectAnalysis/img/nav_bus.png"),
                        },
                        component: () => import('@/views/specialSubjectAnalysis/busOperationSubjectAnalysis/CompositeIndicator.vue')
                    },
                    {
                        path: 'index', //都市公交 --- 公交汽车线路网比率管理
                        name: 'index',
                        meta: {
                            title: "公交汽车综合指标管理",
                            icon: require("@/image/monitoringAndEarlyWarning/roadNetworkRunMonitor/jcss.png"),
                        },
                        component: () => import('@/views/specialSubjectAnalysis/busOperationSubjectAnalysis/busIndicatorInstall/index.vue')
                    }
                    // {
                    //     path: 'BusRouteNetRatioManage', //都市公交 --- 公交汽车线路网比率管理
                    //     name: 'BusRouteNetRatioManage',
                    //     meta: {
                    //         title: "公交汽车线路网比率管理",
                    //         icon: require("@/image/monitoringAndEarlyWarning/roadNetworkRunMonitor/jcss.png"),
                    //     },
                    //     component: () => import('@/views/specialSubjectAnalysis/busOperationSubjectAnalysis/BusRouteNetRatioManage.vue')
                    // }
                ]

            },
             // 客流分析
             {
                 path: 'PassengerFlow', //地面公共交通运行监测 ---  客流分析
                 name: 'PassengerFlow',
                 meta: {
                     icon: require("@/views/specialSubjectAnalysis/busOperationSubjectAnalysis/img/nav_klfx.png"),
                     title: "客流分析"
                 },
                 component: () => import('@/views/layOut/root/SecondLayout.vue'),
                 redirect: "/specialSubjectAnalysis/busOperationSubjectAnalysis/PassengerFlow/PassengerFlowTrend",
                 // 客流分析子路由
                 children: [{
                         path: 'PassengerFlowTrend', //客流分析 --- 客流趋势分析
                         name: 'PassengerFlowTrend',
                         meta: {
                             title: "客流趋势分析",
                             icon: require("@/image/monitoringAndEarlyWarning/roadNetworkRunMonitor/jcss.png"),
                         },
                         component: () => import('@/views/specialSubjectAnalysis/busOperationSubjectAnalysis/PassengerFlowTrend.vue')
                     },
                     {
                         path: 'KeyAreaPassengerFlow', //客流分析 --- 重点区域客流分析
                         name: 'KeyAreaPassengerFlow',
                         meta: {
                             title: "重点区域客流分析",
                             icon: require("@/image/monitoringAndEarlyWarning/roadNetworkRunMonitor/jcss.png"),
                         },
                         component: () => import('@/views/specialSubjectAnalysis/busOperationSubjectAnalysis/KeyAreaPassengerFlow.vue')
                     }, {
                         path: 'TransferPassengerFlow', //客流分析 --- 换乘客流分析
                         name: 'TransferPassengerFlow',
                         meta: {
                             title: "换乘客流分析",
                             icon: require("@/image/monitoringAndEarlyWarning/roadNetworkRunMonitor/jcss.png"),
                         },
                         component: () => import('@/views/specialSubjectAnalysis/busOperationSubjectAnalysis/TransferPassengerFlow.vue')
                     }, {
                         path: 'PassengerFlowChannel', //客流分析 --- 客流通道分析
                         name: 'PassengerFlowChannel',
                         meta: {
                             title: "客流通道分析",
                             icon: require("@/image/monitoringAndEarlyWarning/roadNetworkRunMonitor/jcss.png"),
                         },
                         component: () => import('@/views/specialSubjectAnalysis/busOperationSubjectAnalysis/PassengerFlowChannel.vue')
                     }
                 ]
             },
            
            {
                path: 'ServiceGuarantee', //地面公共交通运行监测 --- 服务保障
                name: 'ServiceGuarantee',
                meta: {
                    icon: require("@/views/specialSubjectAnalysis/busOperationSubjectAnalysis/img/nav_fwbz.png"),
                    title: "服务保障"
                },
                component: () => import('@/views/layOut/root/SecondLayout.vue'),
                redirect: "/specialSubjectAnalysis/busOperationSubjectAnalysis/ServiceGuarantee/ShiftExecutionRate",
                // 服务保障子路由
                children: [{
                        path: 'ShiftExecutionRate', //服务保障 --- 班次执行率
                        name: 'ShiftExecutionRate',
                        meta: {
                            title: "班次执行率",
                            icon: require("@/image/monitoringAndEarlyWarning/roadNetworkRunMonitor/jcss.png"),
                        },
                        component: () => import('@/views/specialSubjectAnalysis/busOperationSubjectAnalysis/ShiftExecutionRate.vue')
                    },
                    {
                        path: 'BusDepartureFrequency', //服务保障 --- 公交发车频率分析
                        name: 'BusDepartureFrequency',
                        meta: {
                            title: "公交发车频率分析",
                            icon: require("@/image/monitoringAndEarlyWarning/roadNetworkRunMonitor/jcss.png"),
                        },
                        component: () => import('@/views/specialSubjectAnalysis/busOperationSubjectAnalysis/BusDepartureFrequency.vue')
                    }, {
                        path: 'BusAverageSpeed', //服务保障 --- 公交车平均车速分析
                        name: 'BusAverageSpeed',
                        meta: {
                            title: "公交车平均车速分析",
                            icon: require("@/image/monitoringAndEarlyWarning/roadNetworkRunMonitor/jcss.png"),
                        },
                        component: () => import('@/views/specialSubjectAnalysis/busOperationSubjectAnalysis/BusAverageSpeed.vue')
                    }, {
                        path: 'OperationMileage', //服务保障 --- 营运里程分析
                        name: 'OperationMileage',
                        meta: {
                            title: "营运里程分析",
                            icon: require("@/image/monitoringAndEarlyWarning/roadNetworkRunMonitor/jcss.png"),
                        },
                        component: () => import('@/views/specialSubjectAnalysis/busOperationSubjectAnalysis/OperationMileage.vue')
                    }, {
                        path: 'ShiftAnalysis', //服务保障 --- 发班班次分析
                        name: 'ShiftAnalysis',
                        meta: {
                            title: "发班班次分析",
                            icon: require("@/image/monitoringAndEarlyWarning/roadNetworkRunMonitor/jcss.png"),
                        },
                        component: () => import('@/views/specialSubjectAnalysis/busOperationSubjectAnalysis/ShiftAnalysis.vue')
                    }, {
                        path: 'BusOnlineRate', //服务保障 --- 公交车在线率
                        name: 'BusOnlineRate',
                        meta: {
                            title: "公交车在线率",
                            icon: require("@/image/monitoringAndEarlyWarning/roadNetworkRunMonitor/jcss.png"),
                        },
                        component: () => import('@/views/specialSubjectAnalysis/busOperationSubjectAnalysis/BusOnlineRate.vue')
                    }, {
                        path: 'BusComplaints', //服务保障 --- 公交投诉分析
                        name: 'BusComplaints',
                        meta: {
                            title: "公交投诉分析",
                            icon: require("@/image/monitoringAndEarlyWarning/roadNetworkRunMonitor/jcss.png"),
                        },
                        component: () => import('@/views/specialSubjectAnalysis/busOperationSubjectAnalysis/BusComplaints.vue')
                    }
                ]

            }, {
                path: 'LineNetwork', //地面公共交通运行监测 ---  线网分析
                name: 'LineNetwork',
                meta: {
                        icon: require("@/views/specialSubjectAnalysis/busOperationSubjectAnalysis/img/nav_xwfx.png"),
                        title: "线网分析"
                    },
                    component: () => import('@/views/layOut/root/SecondLayout.vue'),
                    redirect: "/specialSubjectAnalysis/busOperationSubjectAnalysis/LineNetwork/ShiftExecutionRate",
                    // 线网分析子路由
                    children: [{
                            path: 'BusRouteReliability', //线网分析 --- 公交线路可靠度
                            name: 'BusRouteReliability',
                            meta: {
                                title: "公交线路可靠度",
                                icon: require("@/image/monitoringAndEarlyWarning/roadNetworkRunMonitor/jcss.png"),
                            },
                            component: () => import('@/views/specialSubjectAnalysis/busOperationSubjectAnalysis/BusRouteReliability.vue')
                        },
                        {
                            path: 'BusRoutePunctuality', //线网分析 --- 公交线路准点率分析
                            name: 'BusRoutePunctuality',
                            meta: {
                                title: "公交线路准点率分析",
                                icon: require("@/image/monitoringAndEarlyWarning/roadNetworkRunMonitor/jcss.png"),
                            },
                            component: () => import('@/views/specialSubjectAnalysis/busOperationSubjectAnalysis/BusRoutePunctuality.vue')
                        }, {
                            path: 'BusLineBottleneck', //线网分析 --- 公交线路瓶颈
                            name: 'BusLineBottleneck',
                            meta: {
                                title: "公交线路瓶颈",
                                icon: require("@/image/monitoringAndEarlyWarning/roadNetworkRunMonitor/jcss.png"),
                            },
                            component: () => import('@/views/specialSubjectAnalysis/busOperationSubjectAnalysis/BusLineBottleneck.vue')
                        }, {
                            path: 'RoadAndRoute', //线网分析 --- 道路与线路分析
                            name: 'RoadAndRoute',
                            meta: {
                                title: "道路与线路分析",
                                icon: require("@/image/monitoringAndEarlyWarning/roadNetworkRunMonitor/jcss.png"),
                            },
                            component: () => import('@/views/specialSubjectAnalysis/busOperationSubjectAnalysis/RoadAndRoute.vue')
                        }, {
                            path: 'InfrastructureIndicators', //线网分析 --- 基础设施指标分析
                            name: 'InfrastructureIndicators',
                            meta: {
                                title: "基础设施指标分析",
                                icon: require("@/image/monitoringAndEarlyWarning/roadNetworkRunMonitor/jcss.png"),
                            },
                            component: () => import('@/views/specialSubjectAnalysis/busOperationSubjectAnalysis/InfrastructureIndicators.vue')
                        }
                    ]
            },
            // 安全分析
            {
                path: 'SafetyAnalysis', //地面公共交通运行监测 ---  安全分析
                name: 'SafetyAnalysis',
                meta: {
                    icon: require("@/views/specialSubjectAnalysis/busOperationSubjectAnalysis/img/nav_aqfx.png"),
                    title: "安全分析"
                },
                component: () => import('@/views/layOut/root/SecondLayout.vue'),
                redirect: "/specialSubjectAnalysis/busOperationSubjectAnalysis/SafetyAnalysis/AdministrativePunishment",
                // 安全分析子路由
                children: [{
                        path: 'AdministrativePunishment', //安全分析 --- 行政处罚分析
                        name: 'AdministrativePunishment',
                        meta: {
                            title: "行政处罚分析",
                            icon: require("@/image/monitoringAndEarlyWarning/roadNetworkRunMonitor/jcss.png"),
                        },
                        component: () => import('@/views/specialSubjectAnalysis/busOperationSubjectAnalysis/AdministrativePunishment.vue')
                    },
                    {
                        path: 'TrafficIllegal', //安全分析 --- 交通违法分析
                        name: 'TrafficIllegal',
                        meta: {
                            title: "交通违法分析",
                            icon: require("@/image/monitoringAndEarlyWarning/roadNetworkRunMonitor/jcss.png"),
                        },
                        component: () => import('@/views/specialSubjectAnalysis/busOperationSubjectAnalysis/TrafficIllegal.vue')
                    }, {
                        path: 'TrafficAccident', //安全分析 --- 交通事故分析
                        name: 'TrafficAccident',
                        meta: {
                            title: "交通事故分析",
                            icon: require("@/image/monitoringAndEarlyWarning/roadNetworkRunMonitor/jcss.png"),
                        },
                        component: () => import('@/views/specialSubjectAnalysis/busOperationSubjectAnalysis/TrafficAccident.vue')
                    }, {
                        path: 'OperationTroubles', //安全分析 --- 运行故障分析
                        name: 'OperationTroubles',
                        meta: {
                            title: "运行故障分析",
                            icon: require("@/image/monitoringAndEarlyWarning/roadNetworkRunMonitor/jcss.png"),
                        },
                        component: () => import('@/views/specialSubjectAnalysis/busOperationSubjectAnalysis/OperationTroubles.vue')
                    }
                ]
            }
        ]
    }
]

// 预警监测---公路运输运行监测    路由
// roadTransportOperationMonitore
export default [{
    path: 'roadTransportOperationMonitore', //公路运输运行监测 --- 二级菜单
    name: 'roadTransportOperationMonitore',
    redirect: "/monitoringAndEarlyWarn/roadTransportOperationMonitore/index",
    meta: {
        title: "道路运输(班线)",
        icon: require("@/assets/index/menu/glys.png"),
    },
    component: () => import('@/views/layOut/root/FirstLayout.vue'),
    children: [{
            path: 'index', //公路运输运行监测 ---  首页
            name: 'lineRoadroadTransportOperationMonitore_index',
            meta: {
                title: " 班线运输",
                icon: require("@/image/common/leftmenu/zhjc.png"),
            },
            component: () => import('@/views/monitoringAndEarlyWarning/roadTransportOperation/index.vue')
        }, {
            path: 'comprehensiveMonitor', //公路运输运行监测 ---  行业概览
            name: 'lineRoadroadTransportOperationMonitore_comprehensiveMonitor',
            meta: {
                title: " 行业概览",
                icon: require("@/image/common/leftmenu/zhjc.png"),
            },
            component: () => import('@/views/monitoringAndEarlyWarning/roadTransportOperation/ComprehensiveMonitor.vue')
        }, {
            path: 'realTimeMonitor', //公路运输运行监测 --- 运行监测
            name: 'lineRoadrealTimeMonitor',
            meta: {
                icon: require("@/image/common/leftmenu/nav_xwfx.png"),
                title: "运行监测"
            },
            component: () => import('@/views/monitoringAndEarlyWarning/roadTransportOperation/RealTimeMonitor.vue')
        },
        // 客运分析
        {
            path: 'PassengerTransport', //客运分析 ---  客运分析
            name: 'lineRoadPassengerTransport',
            meta: {
                icon: require("@/image/common/leftmenu/tjfx.png"),
                title: "客运分析"
            },
            component: () => import('@/views/layOut/root/SecondLayout.vue'),
            redirect: "/monitoringAndEarlyWarn/roadTransportOperationMonitore/PassengerTransport/PassengerFlowTrend",
            children: [{
                    path: 'PassengerFlowTrend', //客运分析 --- 客流分析
                    name: 'lineRoadPassengerFlowTrend',
                    meta: {
                        title: "客流分析",
                        icon: 'default',
                    },
                    component: () => import('@/views/monitoringAndEarlyWarning/roadTransportOperation/PassengerFlowTrend.vue')
                },
                {
                    path: 'OperationAnalysis', //客运分析 --- 营运分析
                    name: 'lineRoadOperationAnalysis',
                    meta: {
                        title: "营运分析",
                        icon: 'default',
                    },
                    component: () => import('@/views/monitoringAndEarlyWarning/roadTransportOperation/OperationAnalysis.vue')
                }, {
                    path: 'Capacity', //客运分析 --- 运力分析
                    name: 'lineRoadCapacity',
                    meta: {
                        title: "运力分析",
                        icon: 'default',
                    },
                    component: () => import('@/views/monitoringAndEarlyWarning/roadTransportOperation/Capacity.vue')
                }, {
                    path: 'Complaints', //客运分析 --- 投诉分析
                    name: 'lineRoadComplaints',
                    meta: {
                        title: "投诉分析",
                        icon: 'default',
                    },
                    component: () => import('@/views/monitoringAndEarlyWarning/roadTransportOperation/Complaints.vue')
                },
                {
                    path: 'IllegalForPassengerFlow', //客运分析 --- 交通违法
                    name: 'lineRoadIllegalForPassengerFlow',
                    meta: {
                        title: "交通违法",
                        icon: 'default',
                    },
                    component: () => import('@/views/monitoringAndEarlyWarning/roadTransportOperation/IllegalForPassengerFlow.vue')
                }, {
                    path: 'AccidentForPassengerFlow', //客运分析 --- 交通事故
                    name: 'lineRoadAccidentForPassengerFlow',
                    meta: {
                        title: "交通事故",
                        icon: 'default',
                    },
                    component: () => import('@/views/monitoringAndEarlyWarning/roadTransportOperation/AccidentForPassengerFlow.vue')
                },
                {
                    path: 'PunisForPassengerFlow', //客运分析 --- 行政处罚
                    name: 'lineRoadPunisForPassengerFlow',
                    meta: {
                        title: "行政处罚",
                        icon: 'default',
                    },
                    component: () => import('@/views/monitoringAndEarlyWarning/roadTransportOperation/PunisForPassengerFlow.vue')
                }
            ]
        },
        // 基础数据
        {
            path: 'baseData', //
            name: 'lineRoadbaseData',
            meta: {
                icon: require("@/image/common/leftmenu/jcsj.png"),
                title: "基础数据"
            },
            component: () => import('@/views/layOut/root/SecondLayout.vue'),
            redirect: "/specialSubjectAnalysis/busOperationSubjectAnalysis/ServiceGuarantee/ShiftExecutionRate",
            // 基础数据子路由
            children: [{
                    path: 'ComprehensiveQuery', //基础数据 --- 综合查询
                    name: 'lineRoadComprehensiveQuery',
                    meta: {
                        title: "综合查询",
                        icon: 'default',
                    },
                    component: () => import('@/views/monitoringAndEarlyWarning/roadTransportOperation/ComprehensiveQuery.vue')
                },
                {
                    path: 'BusinessOwner', //基础数据 --- 经营业户
                    name: 'lineRoadBusinessOwner',
                    meta: {
                        title: "经营业户",
                        icon: 'default',
                    },
                    component: () => import('@/views/monitoringAndEarlyWarning/roadTransportOperation/BusinessOwner.vue')
                }, {
                    path: 'practitioners', //基础数据 --- 从业人员
                    name: 'lineRoadpractitioners',
                    meta: {
                        title: "从业人员",
                        icon: 'default',
                    },
                    component: () => import('@/views/monitoringAndEarlyWarning/roadTransportOperation/practitioners.vue')
                }, {
                    path: 'OperationVehicle', //基础数据 --- 营运车辆
                    name: 'lineRoadOperationVehicle',
                    meta: {
                        title: "营运车辆",
                        icon: 'default',
                    },
                    component: () => import('@/views/monitoringAndEarlyWarning/roadTransportOperation/OperationVehicle.vue')
                }, {
                    path: 'PhysicalLine', //基础数据 --- 物理线路
                    name: 'lineRoadPhysicalLine',
                    meta: {
                        title: "物理线路",
                        icon: 'default',
                    },
                    component: () => import('@/views/monitoringAndEarlyWarning/roadTransportOperation/PhysicalLine.vue')
                }, {
                    path: 'LineBrand', //基础数据 --- 线路牌
                    name: 'lineRoadLineBrand',
                    meta: {
                        title: "线路牌",
                        icon: 'default',
                    },
                    component: () => import('@/views/monitoringAndEarlyWarning/roadTransportOperation/LineBrand.vue')
                }, {
                    path: 'BusStation', //基础数据 --- 客运站
                    name: 'lineRoadBusStation',
                    meta: {
                        title: "客运站",
                        icon: 'default',
                    },
                    component: () => import('@/views/monitoringAndEarlyWarning/roadTransportOperation/BusStation.vue')
                }
            ]
        },

        // 监测数据
        {
            path: 'MonitoringData', //
            name: 'lineRoadMonitoringData',
            meta: {
                icon: require("@/image/common/leftmenu/nav_jcsj.png"),
                title: "监测数据"
            },
            component: () => import('@/views/layOut/root/SecondLayout.vue'),
            redirect: "/monitoringAndEarlyWarning/roadTransportOperation/MonitoringData/MonitorEvents",
            // 监测数据子路由
            children: [{
                    path: 'MonitorEvents', //监测数据 --- 监测事件
                    name: 'lineRoadMonitorEvents',
                    meta: {
                        title: "监测事件",
                        icon: 'default',
                    },
                    component: () => import('@/views/monitoringAndEarlyWarning/roadTransportOperation/MonitorEvents.vue')
                },
                {
                    path: 'AdministrativePunishment', //监测数据 --- 行政处罚
                    name: 'lineRoadAdministrativePunishment',
                    meta: {
                        title: "行政处罚",
                        icon: 'default',
                    },
                    component: () => import('@/views/monitoringAndEarlyWarning/roadTransportOperation/AdministrativePunishment.vue')
                },
                {
                    path: 'TrafficIllegal', //监测数据 --- 交通违法
                    name: 'lineRoadTrafficIllegal',
                    meta: {
                        title: "交通违法",
                        icon: 'default',
                    },
                    component: () => import('@/views/monitoringAndEarlyWarning/roadTransportOperation/TrafficIllegal.vue')
                }, {
                    path: 'TrafficAccident', //监测数据 --- 交通事故
                    name: 'lineRoadTrafficAccident',
                    meta: {
                        title: "交通事故",
                        icon: 'default',
                    },
                    component: () => import('@/views/monitoringAndEarlyWarning/roadTransportOperation/TrafficAccident.vue')
                }, {
                    path: 'OperationComplaint', //监测数据 --- 营运投诉
                    name: 'lineRoadOperationComplaint',
                    meta: {
                        title: "营运投诉",
                        icon: 'default',
                    },
                    component: () => import('@/views/monitoringAndEarlyWarning/roadTransportOperation/OperationComplaint.vue')
                }
            ]
        }
    ]
}]
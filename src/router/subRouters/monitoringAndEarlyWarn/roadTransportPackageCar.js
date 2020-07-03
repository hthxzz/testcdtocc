// 预警监测---公路运输运行监测    路由
// roadTransportOperationMonitore
export default [{
    path: 'roadTransportPackageCar', //公路运输运行监测 --- 二级菜单
    name: 'roadTransportPackageCar',
    redirect: "/monitoringAndEarlyWarn/roadTransportPackageCar/comprehensiveMonitor",
    meta: {
        title: "道路运输(包车)",
        icon: require("@/assets/index/menu/glys.png"),
    },
    component: () => import('@/views/layOut/root/FirstLayout.vue'),
    children: [{
            path: 'comprehensiveMonitor', //公路运输运行监测 ---  行业概览
            name: 'comprehensiveMonitor',
            meta: {
                title: " 行业概览",
                icon: require("@/image/common/leftmenu/zhjc.png"),
            },
            component: () => import('@/views/monitoringAndEarlyWarning/roadTransportPackageCar/ComprehensiveMonitor.vue')
        }, {
            path: 'realTimeMonitor', //公路运输运行监测 --- 运行监测
            name: 'realTimeMonitor',
            meta: {
                icon: require("@/image/common/leftmenu/nav_xwfx.png"),
                title: "运行监测"
            },
            component: () => import('@/views/monitoringAndEarlyWarning/roadTransportPackageCar/RealTimeMonitor.vue')
        },
        // 运行统计
        {
            path: 'runStatistical', //运行统计 ---  运行统计
            name: 'runStatistical',
            meta: {
                icon: require("@/image/common/leftmenu/tjfx.png"),
                title: "运行统计"
            },
            component: () => import('@/views/layOut/root/SecondLayout.vue'),
            redirect: "/monitoringAndEarlyWarn/roadTransportPackageCar/runStatistical/carAttendance",
            children: [{
                    path: 'carAttendance', //运行统计 --- 包车出勤率
                    name: 'carAttendance',
                    meta: {
                        title: "包车出勤率",
                        icon: 'default',
                    },
                    component: () => import('@/views/monitoringAndEarlyWarning/roadTransportPackageCar/carAttendance.vue')
                },
                {
                    path: 'carMileage', //运行统计 --- 包车行程数
                    name: 'carMileage',
                    meta: {
                        title: "包车行程数",
                        icon: 'default',
                    },
                    component: () => import('@/views/monitoringAndEarlyWarning/roadTransportPackageCar/carMileage.vue')
                }, {
                    path: 'operationVehicle', //运行统计 --- 经营车辆
                    name: 'operationVehicle',
                    meta: {
                        title: "经营车辆",
                        icon: 'default',
                    },
                    component: () => import('@/views/monitoringAndEarlyWarning/roadTransportPackageCar/operationVehicle.vue')
                }, {
                    path: 'passengers', //运行统计 --- 发送旅客
                    name: 'passengers',
                    meta: {
                        title: "发送旅客",
                        icon: 'default',
                    },
                    component: () => import('@/views/monitoringAndEarlyWarning/roadTransportPackageCar/passengers.vue')
                }
            ]
        },
        // 基础数据
        {
            path: 'baseData', //
            name: 'baseData',
            meta: {
                icon: require("@/image/common/leftmenu/jcsj.png"),
                title: "基础数据"
            },
            component: () => import('@/views/layOut/root/SecondLayout.vue'),
            redirect: "/specialSubjectAnalysis/busOperationSubjectAnalysis/ServiceGuarantee/ShiftExecutionRate",
            // 基础数据子路由
            children: [{
                    path: 'practitioners', //基础数据 --- 经营业户
                    name: 'practitioners',
                    meta: {
                        title: "经营业户",
                        icon: 'default',
                    },
                    component: () => import('@/views/monitoringAndEarlyWarning/roadTransportPackageCar/practitioners.vue')
                },
                {
                    path: 'BusinessOwner', //基础数据 --- 从业人员
                    name: 'BusinessOwner',
                    meta: {
                        title: "从业人员",
                        icon: 'default',
                    },
                    component: () => import('@/views/monitoringAndEarlyWarning/roadTransportPackageCar/BusinessOwner.vue')
                }, {
                    path: 'runCar', //基础数据 --- 营运车辆
                    name: 'runCar',
                    meta: {
                        title: "营运车辆",
                        icon: 'default',
                    },
                    component: () => import('@/views/monitoringAndEarlyWarning/roadTransportPackageCar/runCar.vue')
                },
            ]
        },

        // 监测数据
        {
            path: 'MonitoringData', //
            name: 'MonitoringData',
            meta: {
                icon: require("@/image/common/leftmenu/nav_jcsj.png"),
                title: "监测数据"
            },
            component: () => import('@/views/layOut/root/SecondLayout.vue'),
            redirect: "/monitoringAndEarlyWarning/roadTransportOperation/MonitoringData/MonitorEvents",
            // 监测数据子路由
            children: [{
                    path: 'MonitorEvents', //监测数据 --- 监测事件
                    name: 'MonitorEvents',
                    meta: {
                        title: "监测事件",
                        icon: 'default',
                    },
                    component: () => import('@/views/monitoringAndEarlyWarning/roadTransportPackageCar/MonitorEvents.vue')
                },
                {
                    path: 'AdministrativePunishment', //监测数据 --- 行政处罚
                    name: 'AdministrativePunishment',
                    meta: {
                        title: "行政处罚",
                        icon: 'default',
                    },
                    component: () => import('@/views/monitoringAndEarlyWarning/roadTransportPackageCar/AdministrativePunishment.vue')
                },
                {
                    path: 'TrafficIllegal', //监测数据 --- 交通违法
                    name: 'TrafficIllegal',
                    meta: {
                        title: "交通违法",
                        icon: 'default',
                    },
                    component: () => import('@/views/monitoringAndEarlyWarning/roadTransportPackageCar/TrafficIllegal.vue')
                }, {
                    path: 'TrafficAccident', //监测数据 --- 交通事故
                    name: 'TrafficAccident',
                    meta: {
                        title: "交通事故",
                        icon: 'default',
                    },
                    component: () => import('@/views/monitoringAndEarlyWarning/roadTransportPackageCar/TrafficAccident.vue')
                }, {
                    path: 'OperationComplaint', //监测数据 --- 营运投诉
                    name: 'OperationComplaint',
                    meta: {
                        title: "营运投诉",
                        icon: 'default',
                    },
                    component: () => import('@/views/monitoringAndEarlyWarning/roadTransportPackageCar/OperationComplaint.vue')
                }
            ]
        }
    ]
}]
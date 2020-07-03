// 共享单车    路由
// shareBike  
export default [
    // 共享单车--二级菜单
    {
        path: 'shareBike', //共享单车 --- 二级菜单
        name: 'shareBike',
        redirect: "/monitoringAndEarlyWarn/shareBike/basicInfo",
        meta: {
            title: "共享单车",
            icon: require("@/assets/index/menu/mxjt.png"),
        },
        component: () => import('@/views/layOut/root/FirstLayout.vue'),
        children: [{
                path: 'basicInfo', //共享单车 --- 基本情况
                name: 'shareBikeshareBikeBasicInfo',
                meta: {
                    icon: require("@/image/common/leftmenu/jcsj.png"),
                    title: "基本情况"
                },
                component: () => import('../../../views/monitoringAndEarlyWarning/shareBike/basicInfo/basicInfo.vue')
            },
            {
                path: 'comprehensiveMonitor', //共享单车 ---  综合 监测
                name: 'shareBikecomprehensiveMonitor',
                meta: {
                    title: " 行业概览",
                    icon: require("@/image/common/leftmenu/zhjc.png"),
                },
                component: () => import('../../../views/monitoringAndEarlyWarning/shareBike/ComprehensiveMonitor/ComprehensiveMonitor.vue')
            },

            {
                path: 'operation', //共享单车 --- 运营情况
                name: 'shareBikeshareBikeOperation',
                meta: {
                    icon: require("@/image/common/leftmenu/nav_xwfx.png"),
                    title: "运营情况"
                },
                component: () => import('../../../views/monitoringAndEarlyWarning/shareBike/operation/operation.vue')
            },
            {
                path: 'realTimeMonitor', //共享单车 --- 实时 监测
                name: 'shareBikerealTimeMonitor',
                meta: {
                    icon: require("@/image/common/leftmenu/nav_jcsj.png"),
                    title: "运行监测"
                },
                component: () => import('../../../views/monitoringAndEarlyWarning/shareBike/realTimeMonitor/realTimeMonitor.vue')
            },
            {
                path: 'keyArea', //共享单车 --- 重点区域设置
                name: 'shareBikekeyArea',
                meta: {
                    icon: require("@/image/common/leftmenu/nav_aqfx.png"),
                    title: "设置重点区域"
                },
                component: () => import('../../../views/monitoringAndEarlyWarning/shareBike/keyArea/keyArea.vue')
            },
            {
                path: 'operationAnalysis', //共享单车 ---  基础 数据
                name: 'shareBikeoperationAnalysis',
                meta: {
                    icon: require("@/image/common/leftmenu/nav_sjcx.png"),
                    title: " 营运查询"
                },
                component: () => import('@/views/layOut/root/SecondLayout.vue'),
                redirect: "/monitoringAndEarlyWarn/shareBike/operationAnalysis/OperationVehicle",
                // 航运分析子路由
                children: [{
                        path: 'OperationVehicle', //营运分析 --- 营运车辆
                        name: 'shareBikeOperationVehicle',
                        meta: {
                            title: "营运车辆",
                            icon: 'default',
                        },
                        component: () => import('../../../views/monitoringAndEarlyWarning/shareBike/operationAnalysis/OperationVehicle.vue')
                    },
                    {
                        path: 'VehicleOrders', //营运分析 --- 车辆订单
                        name: 'shareBikeVehicleOrders',
                        meta: {
                            title: "车辆订单",
                            icon: 'default',
                        },
                        component: () => import('../../../views/monitoringAndEarlyWarning/shareBike/operationAnalysis/VehicleOrders.vue')
                    },
                    // {
                    //     path: 'vehiclesSpare', //营运分析 --- 车辆违停
                    //     name: 'shareBikevehiclesSpare',
                    //     meta: {
                    //         title: "车辆违停",
                    //         icon: 'default',
                    //     },
                    //     component: () => import('../../../views/monitoringAndEarlyWarning/shareBike/operationAnalysis/vehiclesSpare.vue')
                    // },
                    {
                        path: 'userNumber', //营运分析 --- 用户数量
                        name: 'shareBikeuserNumber',
                        meta: {
                            title: "用户数量",
                            icon: 'default',
                        },
                        component: () => import('../../../views/monitoringAndEarlyWarning/shareBike/operationAnalysis/userNumber.vue')
                    },
                    {
                        path: 'StopDetail', //营运分析 --- 违停明细
                        name: 'shareBikeStopDetail',
                        meta: {
                            title: "违停明细",
                            icon: 'default',
                        },
                        component: () => import('../../../views/monitoringAndEarlyWarning/shareBike/operationAnalysis/StopDetail.vue')
                    },

                ]

            },


            {
                path: 'serviceAnalysis', //共享单车 ---  服务分析
                name: 'shareBikeserviceAnalysis',
                meta: {
                    icon: require("@/image/common/leftmenu/tjfx.png"),
                    title: " 服务分析"
                },
                component: () => import('@/views/layOut/root/SecondLayout.vue'),
                redirect: "/monitoringAndEarlyWarn/shareBike/serviceAnalysis/CyclingTime",
                // 服务分析
                children: [{
                        path: 'CyclingTime', //服务分析 --- 骑行时段
                        name: 'shareBikeCyclingTime',
                        meta: {
                            title: "骑行时段",
                            icon: 'default',
                        },
                        component: () => import('../../../views/monitoringAndEarlyWarning/shareBike/serviceAnalysis/CyclingTime.vue')
                    },
                    {
                        path: 'RidingPoint', //服务分析 --- 骑行始终点
                        name: 'shareBikeRidingPoint',
                        meta: {
                            title: "骑行始终点",
                            icon: 'default',
                        },
                        component: () => import('../../../views/monitoringAndEarlyWarning/shareBike/serviceAnalysis/RidingPoint.vue')
                    },
                    {
                        path: 'CyclingRoad', //服务分析 --- 骑行路段
                        name: 'shareBikeCyclingRoad',
                        meta: {
                            title: "骑行路段",
                            icon: 'default',
                        },
                        component: () => import('../../../views/monitoringAndEarlyWarning/shareBike/serviceAnalysis/CyclingRoad.vue')
                    },
                    {
                        path: 'CyclingFrequency', //服务分析 --- 骑行频次
                        name: 'shareBikeCyclingFrequency',
                        meta: {
                            title: "骑行频次",
                            icon: 'default',
                        },
                        component: () => import('../../../views/monitoringAndEarlyWarning/shareBike/serviceAnalysis/CyclingFrequency.vue')
                    },
                    {
                        path: 'RidingDistance', //服务分析 --- 骑行距离
                        name: 'shareBikeRidingDistance',
                        meta: {
                            title: "骑行距离",
                            icon: 'default',
                        },
                        component: () => import('../../../views/monitoringAndEarlyWarning/shareBike/serviceAnalysis/RidingDistance.vue')
                    },
                    {
                        path: 'RidingMileage', //服务分析 --- 骑行里程
                        name: 'shareBikeRidingMileage',
                        meta: {
                            title: "骑行里程",
                            icon: 'default',
                        },
                        component: () => import('../../../views/monitoringAndEarlyWarning/shareBike/serviceAnalysis/RidingMileage.vue')
                    },

                ]
            }
        ]
    }
]
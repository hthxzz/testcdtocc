// 重点运输车辆    路由
// keyTransportVehicles  
export default [
    // 重点车辆--二级菜单
    {
        path: 'keyTransportVehicles', //重点车辆 --- 二级菜单
        name: 'keyTransportVehicles',
        redirect: "/monitoringAndEarlyWarn/keyTransportVehicles/operaterMonitor",
        meta: {
            title: "重点运输车辆",
            icon: require("@/assets/index/menu/zdyscl.png"),
        },
        component: () => import('@/views/layOut/root/FirstLayout.vue'),
        children: [{
                path: 'operaterMonitor', //重点车辆 ---  运行 监测
                name: 'operaterMonitor',
                meta: {
                    title: " 运行监测",
                    icon: require("@/image/common/leftmenu/zhjc.png"),
                },
                component: () => import('../../../views/monitoringAndEarlyWarning/keyTransportVehicles/operaterMonitor/vehiclesOperaterMonitor.vue')
            },
            {
                path: 'dataSearch', //重点车辆 ---  数据查询
                name: 'dataSearch',
                meta: {
                    icon: require("@/image/common/leftmenu/nav_sjcx.png"),
                    title: "数据查询"
                },
                component: () => import('@/views/layOut/root/SecondLayout.vue'),
                redirect: "/monitoringAndEarlyWarn/keyTransportVehicles/dataSearch/vehicleIn",
                // 数据查询子路由
                children: [{
                        path: 'vehicleIn', //数据查询 --- 车辆接入
                        name: 'vehicleIn',
                        meta: {
                            title: "车辆接入",
                            icon: 'default',
                        },
                        component: () => import('../../../views/monitoringAndEarlyWarning/keyTransportVehicles/dataSearch/vehicleIn.vue')
                    },
                    {
                        path: 'VehicleIntegrated', //数据查询 --- 车辆综合
                        name: 'VehicleIntegrated',
                        meta: {
                            title: "车辆综合",
                            icon: 'default',
                        },
                        component: () => import('../../../views/monitoringAndEarlyWarning/keyTransportVehicles/dataSearch/VehicleIntegrated.vue')
                    }, {
                        path: 'NotCityVehicle', //数据查询 --- 非市内车辆
                        name: 'NotCityVehicle',
                        meta: {
                            title: "非市内车辆",
                            icon: 'default',
                        },
                        component: () => import('../../../views/monitoringAndEarlyWarning/keyTransportVehicles/dataSearch/NotCityVehicle.vue')
                    }, {
                        path: 'OnlineVehicle', //数据查询 --- 在线车辆
                        name: 'OnlineVehicle',
                        meta: {
                            title: "在线车辆",
                            icon: 'default',
                        },
                        component: () => import('../../../views/monitoringAndEarlyWarning/keyTransportVehicles/dataSearch/OnlineVehicle.vue')
                    },


                    {
                        path: 'HistoricallyOnLineVehicle', //数据查询 --- 历史上线车辆
                        name: 'HistoricallyOnLineVehicle',
                        meta: {
                            title: "历史上线车辆",
                            icon: 'default',
                        },
                        component: () => import('../../../views/monitoringAndEarlyWarning/keyTransportVehicles/dataSearch/HistoricallyOnLineVehicle.vue')
                    },
                    {
                        path: 'CarAlarm', //数据查询 --- 车辆报警
                        name: 'CarAlarm',
                        meta: {
                            title: "车辆报警",
                            icon: 'default',
                        },
                        component: () => import('../../../views/monitoringAndEarlyWarning/keyTransportVehicles/dataSearch/CarAlarm.vue')
                    },
                    {
                        path: 'VehicleErrorData', //数据查询 --- 车辆错误数据
                        name: 'VehicleErrorData',
                        meta: {
                            title: "车辆错误数据",
                            icon: 'default',
                        },
                        component: () => import('../../../views/monitoringAndEarlyWarning/keyTransportVehicles/dataSearch/VehicleErrorData.vue')
                    },
                    {
                        path: 'OffLineVehicle', //数据查询 --- 未上线车辆
                        name: 'OffLineVehicle',
                        meta: {
                            title: "未上线车辆",
                            icon: 'default',
                        },
                        component: () => import('../../../views/monitoringAndEarlyWarning/keyTransportVehicles/dataSearch/OffLineVehicle.vue')
                    },
                ]

            },
            {
                path: 'statisticalAnalysis', //重点车辆 ---  统计分析
                name: 'statisticalAnalysis',
                meta: {
                    icon: require("@/image/common/leftmenu/tjfx.png"),
                    title: "统计分析"
                },
                component: () => import('@/views/layOut/root/SecondLayout.vue'),
                redirect: "/monitoringAndEarlyWarn/keyTransportVehicles/StatisticalAnalysis/carAlarm",
                // 数据查询子路由
                children: [{
                        path: 'carAlarm', //统计分析 --- 车辆报警
                        name: 'carAlarm',
                        meta: {
                            title: "车辆报警",
                            icon: 'default',
                        },
                        component: () => import('../../../views/monitoringAndEarlyWarning/keyTransportVehicles/StatisticalAnalysis/CarAlarm.vue')
                    },
                    {
                        path: 'VehicleTrajectoryAnomaly', //统计分析 --- 车辆轨迹异常
                        name: 'VehicleTrajectoryAnomaly',
                        meta: {
                            title: "车辆轨迹异常",
                            icon: 'default',
                        },
                        component: () => import('../../../views/monitoringAndEarlyWarning/keyTransportVehicles/StatisticalAnalysis/VehicleTrajectoryAnomaly.vue')
                    }
                ]
            },
            {
                path: 'SetKeyArea', //重点车辆 --- 报警设置
                name: 'SetKeyArea',
                meta: {
                    // icon: require("@/image/common/leftmenu/bjsz.png"),
                    icon: require("@/image/common/leftmenu/nav_aqfx.png"),
                    title: "设置重点区域"
                },
                component: () => import('../../../views/monitoringAndEarlyWarning/keyTransportVehicles/keyArea/keyArea.vue')
            },
            {
                path: 'AlarmSet', //重点车辆 --- 报警设置
                name: 'AlarmSet',
                meta: {
                    icon: require("@/image/common/leftmenu/bjsz.png"),
                    title: "报警设置"
                },
                component: () => import('../../../views/monitoringAndEarlyWarning/keyTransportVehicles/AlarmSet/AlarmSet.vue')
            }

        ]
    }
]
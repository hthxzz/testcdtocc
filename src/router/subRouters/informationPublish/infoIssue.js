// 信息发布    路由
// infoIssue  
export default [
    // 重点车辆--二级菜单
    {
        path: 'infoIssue', //重点车辆 --- 二级菜单
        name: 'infoIssue',
        redirect: "/informationPublish/infoIssue/homePage",
        meta: {
            title: "信息发布",
            icon: require("@/assets/index/menu/zdyscl.png"),
        },
        component: () => import('@/views/layOut/root/FirstLayout.vue'),
        children: [{
                path: 'homePage', //信息发布 ---首页
                name: 'homePage',
                meta: {
                    title: " 首页",
                    icon: require("@/image/common/leftmenu/zhjc.png"),
                },
                component: () => import('../../../views/informationIssue/homePage/HomePage.vue')
            },
            {
                path: 'issueInfo', //信息发布 ---
                name: 'issueInfo',
                meta: {
                    title: " 发布信息",
                    icon: require("@/image/common/leftmenu/zhjc.png"),
                },
                component: () => import('../../../views/informationIssue/issueInfo/IssueInformation.vue')
            },
            {
                path: 'issueSetting', 
                name: 'issueSetting',
                meta: {
                    icon: require("@/image/common/leftmenu/tjfx.png"),
                    title: "发布设置"
                },
                component: () => import('@/views/layOut/root/SecondLayout.vue'),
                redirect: "/informationPublish/infoIssue/issueSetting/templateManage",
                // 数据查询子路由
                children: [{
                            path: 'templateManage', //统计分析 --- 车辆报警
                            name: 'templateManage',
                            meta: {
                                title: "模块管理",
                                icon: 'default',
                            },
                            component: () => import('../../../views/informationIssue/issueSetting/templateManage/templateManageList.vue')
                        },
                        {
                            path: 'timerManage', //统计分析 --- 车辆轨迹异常
                            name: 'timerManage',
                            meta: {
                                title: "定时器管理",
                                icon: 'default',
                            },
                            component: () => import('../../../views/informationIssue/issueSetting/timerManage/timerManageList.vue')
                        },{
                            path: 'issueChannelManage', //统计分析 --- 车辆报警
                            name: 'issueChannelManage',
                            meta: {
                                title: "发布渠道管理",
                                icon: 'default',
                            },
                            component: () => import('../../../views/informationIssue/issueSetting/issueChannelManage/issueChannelManageList.vue')      
                        },{
                            path: 'indexManage', //统计分析 --- 车辆轨迹异常
                            name: 'indexManage',
                            meta: {
                                title: "指标管理",
                                icon: 'default',
                            },
                            component: () => import('../../../views/informationIssue/issueSetting/indexManage/indexManageList.vue')
                        }]
            },
            
            {
                path: 'issueStatistics', //信息发布 ---
                name: 'issueStatistics',
                meta: {
                    title: " 发布统计",
                    icon: require("@/image/common/leftmenu/tjfx.png"),
                },
                component: () => import('../../../views/informationIssue/IssueStatistics.vue')
            },
            {
                path: 'logManagement', //信息发布 ---
                name: 'logManagement',
                meta: {
                    title: " 日志管理",
                    icon: require("@/image/common/leftmenu/zhjc.png"),
                },
                component: () => import('../../../views/informationIssue/LogManagement.vue')
            }
        ]
    }
]
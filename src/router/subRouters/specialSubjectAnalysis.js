




// 专题分析监测根路由 

// 导入专题分析监测路由所有的二级路由
import {
    busOperationSubjectAnalysis,

} from "./specialSubjectAnalysis/index";

export default {
    //  专题分析监测
    path: '/specialSubjectAnalysis',
    name: 'specialSubjectAnalysis',
    component: () => import('@/views/layOut/GlobleBaseLayOut.vue'),
        // children: [
        //     // 公交 运行监测--二级菜单
        //     // ...busOperationSubjectAnalysis,
        //     // 路网 运行监测--二级菜单

        // ]
    children: [
        
        ...busOperationSubjectAnalysis,
        { //重大活动
        path: 'majorActivitiesIndex',
        name: 'majorActivitiesIndex',
        component: () => import('../../views/specialSubjectAnalysis/majorActivities/majorActivitiesIndex.vue'),
            meta: {
                title: "重大活动"
            },
    },
    //  {
    //     path: 'groundBusOperationIndex', //地面公交运行专题分析
    //     name: 'groundBusOperationIndex',
    //       meta: {
    //           title: "地面公交运行专题分析"
    //       },
    //     component: () => import('../../views/specialSubjectAnalysis/groundBusOperation/groundBusOperationIndex.vue')
    // }, 
    {
        path: 'shareBikeServiceIndex', //共享单车服务分析
        name: 'shareBikeServiceIndex',
          meta: {
              title: "共享单车服务分析"
          },
        component: () => import('../../views/specialSubjectAnalysis/shareBikeService/shareBikeServiceIndex.vue')
    }, {
        path: 'badWeather', //恶劣天气交通运行专题监测
        name: 'badWeather',
          meta: {
              title: "恶劣天气交通运行专题监测"
          },
        component: () => import('../../views/specialSubjectAnalysis/badWeather/badWeather.vue')
    },
     {
        path: 'hightSpeedTollFreeSpecialMonitor', //高速免通专题监测
        name: 'hightSpeedTollFreeSpecialMonitor',
           meta: {
               title: "高速免通专题监测"
           },
        component: () => import('../../views/specialSubjectAnalysis/hightSpeedTollFreeSpecialMonitor/HightSpeedTollFreeSpecialMonitor.vue')
    }
],

}
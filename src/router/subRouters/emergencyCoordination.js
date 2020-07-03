




export default {
    //  应急协同
    path: '/emergencyCoordination',
    name: 'emergencyCoordination',
    component: () => import('../../views/emergencyCoordination/emergencyCoordinationContainer.vue'),
    children: [{ //重大活动
        path: 'shuangliuAirportIndex',
        name: 'shuangliuAirportIndex',
        component: () => import('../../views/emergencyCoordination/shuangliuAirport/shuangliuAirportIndex.vue')

    }, {
        path: 'shareBikeServiceIndex', //共享单车服务分析
        name: 'shareBikeServiceIndex',
        component: () => import('../../views/specialSubjectAnalysis/shareBikeService/shareBikeServiceIndex.vue')
    }],

}
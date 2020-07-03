import temMenu from "../temMenu";
import Cookies from 'js-cookie';
import api from "../../request/axios";

const state = {
    hasSmallApp: true,
    headShow: true,
    authTree: [], // 权限树
    menushow: false, //显示隐藏二级菜单
    fullscreenLoading: false,
    preActiveMenuEle: '',
    hoverMenuEle: 'index',
    currentActiveMenuEle: '',
    menuList: temMenu,
    currentActiveMenuTitle: Cookies.get('menuTitle') || '系统首页',
    menuWrapperSize: {
        width: 0
    },
    leftMenu: [],
    sidebar: {
        opened: true,
        // opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
        withoutAnimation: false
    },
    pophtmlId: [],
    device: 'desktop',
    size: Cookies.get('size') || 'medium',
    isFullscreen: false // 在有地图的页面是否全屏
};
const mutations = {

    // 获得权限树
    get_Auth_Function_Tree_All: (state, view) => {
        state.authTree = view;
    },
    switchMenuShow(state, status) {
        state.menushow = status;
    },
    addPophtmlId(state, PophtmlId) {
        state.pophtmlId.push(PophtmlId);
    },
    removePophtmlId(state) {
        for (const item of this.state.pophtmlId) {
            tmap.omap.removeOverlay(item);
        }
        state.pophtmlId = [];
    },
    // 切换全屏状态
    switchFullscreen(state, status) {
        state.isFullscreen = status;
    },
    setFullscreenLoading(state, status) {
        state.fullscreenLoading = status;
    },
    setCurrentActiveMenuTitle(state, title) {
        state.currentActiveMenuTitle = title;
    },
    setMenuWrapperSize(state, size) {
        state.menuWrapperSize = size;
    },
    TOGGLE_SIDEBAR: state => {
        state.sidebar.opened = !state.sidebar.opened
        state.sidebar.withoutAnimation = false
        if (state.sidebar.opened) {
            Cookies.set('sidebarStatus', 1)
        } else {
            Cookies.set('sidebarStatus', 0)
        }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
        Cookies.set('sidebarStatus', 0)
        state.sidebar.opened = false
        state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
        state.device = device
    },
    SET_SIZE: (state, size) => {
        state.size = size
        Cookies.set('size', size)
    }
};
const actions = {
    toggleSideBar({
        commit
    }) {
        commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({
        commit
    }, {
        withoutAnimation
    }) {
        commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({
        commit
    }, device) {
        commit('TOGGLE_DEVICE', device)
    },
    setSize({
        commit
    }, size) {
        commit('SET_SIZE', size)
    },
    getAuthFunctionTreeAll({
        commit,
        state
    }) {
        return new Promise(resolve => {
            api.$get2('/authHandler/getAuthFunctionTreeAll').then((data) => {
                commit('get_Auth_Function_Tree_All', data);
            })
            resolve();
        })
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import qs from 'qs';
import store from '../store/index'
import {
    Message
} from 'element-ui';
import {
    setItem,
    getItem
} from "../untils/storage";
const tip = msg => {
    Message({
        showClose: true,
        message: msg,
        type: 'error',
        offset: 200
    });
}
export const login = (userId, password) => {
    axios({
            method: 'get',
            baseURL: '/api/auth',
            url: '/loginHandler/login',
            headers: {
                'content-Type': 'application/json;charset=utf-8'
            },
            params: {
                password: password || 'cdjt&2019',
                userId: userId || 'cdjt',
            }
        })
        .then(function (response) {
            if (response.status == 200) {
                setItem("loginToken", response.data.text);
                setItem("userId", userId || 'admin');


            }
        });
}
// 创建axios实例
var AxiosInstanceforAuth = axios.create({
    baseURL: '/api/auth',
    timeout: 1000 * 29,
    'content-Type': 'appliction/x-www-form-urlencoded'
});
// axios.defaults.headers.post['content-Type'] = 'appliction/x-www-form-urlencoded';
// API请求接口实例
var AxiosInstanceforTOCC = axios.create({
    baseURL: '/api/tocc',
    timeout: 1000 * 29,


    // headers:{
    //     'content-Type': 'appliction/x-www-form-urlencoded'
    // }


});
var AxiosInstanceforSSO = axios.create({
    baseURL: '/api/sso',
    timeout: 1000 * 29,


    // headers:{
    //     'content-Type': 'appliction/x-www-form-urlencoded'
    // }


});
// 请求成功拦截器
window._axiosPromiseArr = [];
const interceptorsRequestSuccess = config => {
    config.cancelToken = new axios.CancelToken(function (cancel) {
        window._axiosPromiseArr.push({
            cancel
        })

    });
    let loginToken = getItem("loginToken");
    config.headers.loginToken = loginToken;
    return config;
};
// 请求错误拦截器
const interceptorsRequestError = error => Promise.error(error);
// 响应成功拦截器
const interceptorsResponseSuccess = res => res.status === 200 && res.data.code === 1 ? Promise.resolve(res.data.data) : Promise.reject(res);
const interceptorsResponseSuccessForSSO = res => res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res);
// 响应错误拦截器
const interceptorsResponseError = error => {
    const {
        response
    } = error;
    if (response) {
        // 请求已发出，但是不在2xx的范围
        errorHandle(response.status, response.statusText, response.data.message);
        return Promise.reject(response);
    }
}
/**
 * AxiosInstanceforTOCC实例请求拦截器
 * 每次请求前， 如果存在loginToken则在请求头中携带 loginToken
 */
AxiosInstanceforSSO.interceptors.request.use(
    // interceptorsResponseSuccessForSSO,
    interceptorsRequestSuccess,
    interceptorsRequestError
);
// AxiosInstanceforTOCC实例响应拦截器
AxiosInstanceforSSO.interceptors.response.use(
    // 请求成功
    interceptorsResponseSuccessForSSO,
    interceptorsResponseError
    // 请求失败
);
AxiosInstanceforTOCC.interceptors.request.use(
    interceptorsRequestSuccess,
    interceptorsRequestError
);
// AxiosInstanceforTOCC实例响应拦截器
AxiosInstanceforTOCC.interceptors.response.use(
    // 请求成功
    interceptorsResponseSuccess,
    interceptorsResponseError
    // 请求失败
);
/**
 * AxiosInstanceforTOCC实例请求拦截器
 * 每次请求前， 如果存在loginToken则在请求头中携带 loginToken
 */
AxiosInstanceforAuth.interceptors.request.use(
    interceptorsResponseSuccess,
    interceptorsRequestError
);
// AxiosInstanceforTOCC实例响应拦截器
AxiosInstanceforAuth.interceptors.response.use(
    // 请求成功
    interceptorsResponseSuccess,
    interceptorsResponseError
    // 请求失败
);



// 设置post请求头
// axios.defaults.headers.post['content-Type'] = 'appliction/x-www-form-urlencoded';
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// instance2.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
    router.replace({
        path: '/login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    });
}
/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, mes, successMes) => {
    // 状态码判断
    switch (status) {
        case 200:
            tip(successMes);
            break;
        case 401:
            toLogin();
            break;
        case 403:
            tip('登录过期，请重新登录');
            break;
        case 404:
            tip('请求的资源不存在,路径可能不对');
            break;
        case 500:
            // tip(mes);
            break;
        default:
            // console.log(other);
    }
}

//  axios({
//      method: 'post',
//      url: 'kyjc_basicinfoHandler/getGgEnterpriseinfoList',
//      baseURL: 'http://192.168.40.3:8088/p/kyjc/irest/base/',
//      // headers: {
//      //     'content-Type': 'appliction/x-www-form-urlencoded'
//      // },
//      data: qs.stringify({
//          firstName: JSON.stringify([{
//              "a": "b",
//              "c": "d"
//          }]),
//          lastName: 'Flintstone'
//      })
//  }).then(function (response) {
//      if (response.status == 200) {
//          setItem("loginToken", response.data.text);
//      }
//  });

// if (process.env.NODE_ENV == 'development') {
//     // axios.defaults.baseURL = "http://192.168.40.3:8088/p/kyjc/irest/base/"
// }else if (process.env.NODE_ENV == 'production') {
//     axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5d08d65d78c2cb2a1bddf16a/rest/jtyj/';
// }

function $get(url, params) {
    return AxiosInstanceforTOCC.get(url, {
        params: params
    })
}

function $get2(url, params) {
    return AxiosInstanceforAuth.get(url, {
        params: params
    })
}
async function $getsso(url, params) {
    return await AxiosInstanceforSSO.get(url, {
        params: params
    });
}

function $post(url, params) {
    return AxiosInstanceforTOCC.post(url, qs.stringify(params));
}

function $post2(url, params) {
    return AxiosInstanceforAuth.post(url, params);
}
export default {
    $get: $get,
    $get2: $get2,
    $getsso: $getsso,
    $post: $post,
    $post2: $post2,
};
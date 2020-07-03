import Vue from 'vue'

// https://webpack.js.org/guides/dependency-management/#requirecontext

const modulesFiles = require.context('../components/common', true, /\.vue$/)

// 导入公共组件，不需要再单独导入
modulesFiles.keys().reduce((modules, modulePath) => {
    
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    if (value.default.name) {
        Vue.component(value.default.name, value.default)
    }else{
        Vue.component(moduleName, value.default)
    }
    return modules
}, {});


const businessComponent = require.context('../components/businessComponent', true, /\.vue$/)

// 导入公共组件，不需要再单独导入
businessComponent.keys().reduce((modules, modulePath) => {

    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = businessComponent(modulePath)
    modules[moduleName] = value.default
    if (value.default.name) {
        Vue.component(value.default.name, value.default)
    } else {
        Vue.component(moduleName, value.default)
    }
    return modules
}, {})






// https://webpack.js.org/guides/dependency-management/#requirecontext
// const modulesFiles = require.context('../../components/common', true, /\.vue$/);
// //自动导入模块
// const test = [];
// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//     // set './app.js' => 'app'
//     const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
//     const value = modulesFiles(modulePath);
//     if (moduleName.search("test") != -1) {
//          let start = value.default.__file.lastIndexOf("/");
//          let end = value.default.__file.lastIndexOf(".");
//          let str = value.default.__file.substring(start, end);
//          let componenttest = value.default.__file.replace("src", '..');
//          test.push({
//               path: str,
//             //   name: str,
//               component: () => import("../../components/common/media/testvideo.vue")
//           })
//     }
    
//     modules[moduleName] = value.default;
//     return modules
// }, {})
// debugger;






export default {
         path: '/testvideo',
         name: 'testvideo',
         component: () => import( /* webpackChunkName: "about" */ '../../components/common/media/testvideo.vue')
}
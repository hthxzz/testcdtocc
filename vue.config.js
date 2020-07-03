module.exports = {
    // 修改的配置
    // 将baseUrl: '/api',改为baseUrl: '/',
    // baseUrl: '/api',
    css: {
        sourceMap: true
    },
    lintOnSave: false,
    productionSourceMap: false,
    devServer: {
        // overlay: {
        //     warnings: false,
        //     errors: false
        // },
        // lintOnSave: false,
        proxy: {
            '/api/gov': {
                target: 'http://a9f966a4c9104545bd4d682a1a9efef5.apigateway.cdtocc.gov/',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/api/gov': ''
                }
            },
            // 代理和权限有关的地址
            '/api/auth': {
                target: 'http://192.167.252.246:8088/irest/base/',
                // target: 'http://192.168.104.20:8080/ecs/irest/base/',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/api/auth': ''
                }
            },
            // 代理和权限有关的地址
            '/api/sso': {
                target: 'http://192.167.252.252:8080/TSSOService/rest/base/',
                // target: 'http://192.168.104.20:8080/ecs/irest/base/',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/api/sso': ''
                }
            },
            // 代理后端请求接口
            '/api/tocc': {
                target: 'http://192.167.252.252:8088/p/tocc/irest/base/',
                // target: 'http://192.168.104.20:8080/ecs/irest/base/',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/api/tocc': ''
                }
            },
            // 代理 地图数据查询
            '/api/omap': {
                target: 'http://192.167.252.252:8088/',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/api/omap': ''
                }
            },
            // 地图
            '/api/TOCCMAP20191212': {
                target: 'http://192.167.252.246/api/TOCCMAP20191212',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/api/TOCCMAP20191212': ''
                }
            },
            // 地图
            '/api/jiaotongju': {
                target: 'http://192.167.252.246/api/jiaotongju',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/api/jiaotongju': ''
                }
            },
            // 地图 图层
            '/api/layer': {
                target: 'http://192.167.252.246:8088/',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/api/layer': ''
                }
            },
            // 地图
            '/api/LukServer': {
                target: 'http://192.167.252.246/LukServer',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/api/LukServer': ''
                }
            },
            // '/api': {
            //     target: 'http://192.167.252.246:8088/irest/base/authHandler/',
            //     changeOrigin: true,
            //     // secure: false,
            //     pathRewrite: {
            //         '^/api': ''
            //     }
            // },
            // '/saves': {
            //     target: 'https://www.easy-mock.com/mock/5d08d65d78c2cb2a1bddf16a/rest/jtyj',
            //     changeOrigin: true,
            //     // secure: false,
            //     // pathRewrite: {
            //     //     '/saves': '/saves'
            //     // }
            // }
        }
    },

    transpileDependencies: [
        'vue-echarts',
        'resize-detector'
    ],
    chainWebpack: config => {
        const oneOfsMap = config.module.rule('scss').oneOfs.store
        oneOfsMap.forEach(item => {
            item
                .use('sass-resources-loader')
                .loader('sass-resources-loader')
                .options({
                    // Provide path to the file with resources
                    resources: 'src/style/common.scss',

                    // Or array of paths
                    // resources: ['./path/to/vars.scss', './path/to/mixins.scss']
                })
                .end()
        });
        config
            .when(process.env.NODE_ENV === 'development',
                config => config.devtool('source-map')
            )
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                return {
                    ...options,
                    //修复静态资源引用的问题 vue cli 2 => vue cli 3 升级之后配置项由 transformToRequire 改为 transformAssetUrls
                    transformAssetUrls: {
                        video: ['src', 'poster'],
                        source: 'src',
                        img: 'src',
                        image: 'xlink:href',
                        // 在这里添加需要使用静态资源的自定义元素
                        'a-avatar': 'src',
                    },
                }
            })
    },
    //   chainWebpack: config => {
    //       config.module
    //           .rule('vue')
    //           .use('vue-loader')
    //           .loader('vue-loader')
    //           .tap(options => {
    //               return {
    //                   ...options,
    //                   //修复静态资源引用的问题 vue cli 2 => vue cli 3 升级之后配置项由 transformToRequire 改为 transformAssetUrls
    //                   transformAssetUrls: {
    //                       video: ['src', 'poster'],
    //                       source: 'src',
    //                       img: 'src',
    //                       image: 'xlink:href',
    //                       // 在这里添加需要使用静态资源的自定义元素
    //                       'a-avatar': 'src',
    //                   },
    //               }
    //           })
    //   },

}


// module.exports = {
//   css: {
//     loaderOptions: {
//       postcss: {
//         plugins: [
//           require('postcss-px-to-viewport')({ // 把px单位换算成rem单位
//                 viewportWidth: 1920,
//                 viewportHeight: 1080,
//                 unitPrecision: 3,
//                 viewportUnit: 'vw',
//                 selectorBlackList: ['.ignore', '.hairlines'],
//                 minPixelValue: 1,
//                  exclude: [/node_modules/],
//                 mediaQuery: false
//           })
//         ]
//       }
//     }
//   },
//   configureWebpack: config => {
//     if (process.env.NODE_ENV === 'production') {
//       // 为生产环境修改配置...
//     } else {
//       // 为开发环境修改配置...
//     }
//   }
// }
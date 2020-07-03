



export  const option = {
    // backgroundColor: '#1b1b1b',
    tooltip: {
        formatter: "{a} <br/>{c} {b}"
    },
    title: {
        text: '一环',
        left: '39%',
        bottom: '1%',
        textStyle: {
            color: '#FFFFFF',
            fontSize: '14'
        }
    },
    series: [{
            name: '速度',
            type: 'gauge',
            min: 0,
            max: 140,
            splitNumber: 7,
            radius: '100%',
            axisLine: { // 坐标轴线
                lineStyle: { // 属性lineStyle控制线条样式
                    color: [
                        [0.142857142857, 'rgba(255, 0, 0, 1)'],
                        [0.5, 'rgba(255, 192, 0, 1)'],
                        [0.78571428571, 'rgba(146, 208, 80, 1)'],
                        [1, 'rgba(40, 183, 77, 1)']
                    ],
                    width: 3,
                    // shadowColor : '#fff', //默认透明
                    // shadowBlur: 10
                }
            },
            // pointer:{
            //     // show:false,
            //     width:6
            // },
            axisLabel: { // 坐标轴小标记
                // textStyle: {       // 属性lineStyle控制线条样式
                //     fontWeight: 'bolder',
                //     color: '#fff',
                //     shadowColor : '#fff', //默认透明
                //     shadowBlur: 10
                // }
            },
            axisTick: { // 坐标轴小标记
                length: 8, // 属性length控制线长
                lineStyle: { // 属性lineStyle控制线条样式
                    color: 'auto',
                    // shadowColor : '#fff', //默认透明
                    // shadowBlur: 10
                }
            },
            splitLine: { // 分隔线
                length: 11, // 属性length控制线长
                lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                    width: 3,
                    color: '#fff',
                    // shadowColor : '#fff', //默认透明
                    // shadowBlur: 10
                }
            },
            title: {
                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    fontSize: 10,
                    fontStyle: 'italic',
                    color: '#fff',
                    // shadowColor : '#fff', //默认透明
                    // shadowBlur: 10
                }
            },
            detail: {
                // backgroundColor: 'rgba(30,144,255,0.8)',
                // borderWidth: 1,
                fontSize: 16,
                // borderColor: '#fff',
                // shadowColor : '#fff', //默认透明
                // shadowBlur: 5,
                offsetCenter: [0, '50%'], // x, y，单位px
                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    color: '#fff'
                }
            },
            data: [{
                value: 40,
                name: 'km/h'
            }]
        }

    ]
};
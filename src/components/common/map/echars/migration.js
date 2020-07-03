export const migration = {
    methods: {
        activeEcharToolTip(el, option = {}) {
            let baseOption = Object.assign({
                seriesIndex: 0,
                seriesLength: 1,
                activeNO: 1,
                time: 6000

            }, option)
            if (!el) {
                return;
            }
            var i = 0;
            const activedDataIndex = [];
            setInterval(() => {
                for (let index = 0; index < baseOption.activeNO; index++) {
                    el.dispatchAction({
                        type: 'showTip',
                        seriesIndex: baseOption.seriesIndex, // 显示第几个series
                        dataIndex: index // 显示第几个数据
                    });
                }

                i++;

            }, baseOption.time);
        }
    }
}
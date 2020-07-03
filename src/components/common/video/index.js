import axios from 'axios';

export default {
    mounted() {
        this.getdata();
        // setInterval(() => {
        //     this.getdata();
        // }, 16 * 1000);
    },
    data() {
        return {
            videoList: [],
            order: 5,
            arrOraginList: [],
            firstLoadData: true,
        }
    },
    methods: {
        async getdata() {
            if (this.firstLoadData) {
                // 获取所有数据
                // this.videoListAll = await this.getOtherVideoList();
                this.firstLoadData = false;
            }
            // let data = this.videoListAll.splice(this.order,5);
            let data = [
                // {
                //     "device_code": "51010000001310442467",
                //     "name": "入口门厅3"
                // },
                // {
                //     "device_code": "51010000001310967950",
                //     "name": "车场1"
                // },
                // {
                //     "device_code": "51660200041310019021",
                //     "name": "成都站入口外侧广场"
                // },
                {
                    "device_code": "51019902001310000212",
                    "name": "第一绕城收费站"
                },
                // {
                //     "device_code": "51667900041310005066",
                //     "name": "机场高速"
                // }
            ];
            for (let index = 0; index < data.length; index++) {
                let urlData = await this.getOtherVideoListConfig(data[index]["device_code"]);
                if (urlData.code == "0") {
                    data[index]["url"] = urlData.data.url.replace("rtsp", "http").replace("172.18.0.142:554", "10.1.170.107:8003") + "/live.m3u8";
                } else {
                    data[index]["url"] = "";
                }

            }

            this.videoList = data;
            this.order = this.order + 5;
        },
        getOtherVideoList() {
            return new Promise((resolve) => {
                this.$http.$get('video_videoSourceHandler/getOtherVideoList')
                    .then((response) => {
                        if (response.status == 200) {
                            resolve(response.data);
                        }
                    });
            });

        },

        getOtherVideoListConfig(cameraIndexCode) {
            return new Promise((resolve) => {
                axios({
                        baseURL: '/api/tocc',
                        method: 'get',
                        url: 'videoHandler/getPreviewUrls',
                        // responseType: 'stream'
                        params: {
                            cameraIndexCode: cameraIndexCode
                        }
                    })
                    .then((response) => {
                        if (response.status == 200) {
                            resolve(response.data);
                        }
                    });
            })
        },
    }
}
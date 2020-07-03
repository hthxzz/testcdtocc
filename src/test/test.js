

console.log(11111111111);

const axios = require('axios');
        axios({
                method: 'post',
            url: 'http://iotcloud.jhtwl.com:81/IoTWeb/Api/DataItem/ReadTree',
                headers:{
                    'Content-Type': 'application/json',
                    'application': '83300002',
                    'moduleid': '10010201',
                    'modulekey': 'c3c36ef0e0af4dc2b3f68de64c249689',
                    'timestamp': '1558926047422',
                    'debug': 'ignored',
                    'userId': '10',
                    'signature': 'jhtsign'
                },
                data: {
                    Parentcode: '10010201',
                }
            }).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                // console.log(error);
            });

        console.log(1111);
        
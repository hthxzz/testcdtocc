let col = 12;
// 表单详情配置
export const detailFormConfig = {
    // 表单详情请求地址
    url: '/kyjc_basicinfoHandler/getGgEnterpriseinfoById',
    show: false,
    title:'企业信息详情',
    // 是否显示x按钮
    showCancel:true,
    id:'',
    data: [
        [{
            label: '业户名称',
            key: 'enterpriseName',
            col: col,
            formate:function(val){
                return val;
            }
        }, {
            label: '法人代表',
            key: 'legalName',
            col: col
        }],
        [{
            label: '企业电话号码',
            key: 'enterpriseTel',
            col: col,
            formate: function (val) {
                if (val == 1) {
                    return '男';
                }
                else if (val == 0) {
                    return '女';
                }
                else{
                    return val;
                }
                
                
            }
        }, {
            label: '经营许可证',
            key: 'licenseAbbr',
            col: col
        }],
        [{
            label: '经营范围',
            key: 'bussinessScopeCode',
            col: col
        }, {
            label: '经营状态',
            key: 'operaStatus',
            col: col
        }], 
        [{
            label: '业户类型',
            key: 'enterpriseTypeCode',
            col: col
        }],
        [
            {
                label: '内容',
                key: 'content',
                col: 24
            }
        ]
    ]
}
<template>
    <div class="issue-container" v-if="showIssue" >
      <el-dialog title="待发布信息" :visible.sync="showIssue" width="50%" :modal-append-to-body=false >
        <!-- <el-form :model="form">
          <el-form-item label="选择模板" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="选择模板" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form> -->
      <section>
        <div class="content">
          <div class="content-top">
            <div class="issue">
              <div class="select-template-title">
                <span>选择模板</span>
              </div>
              <div class="select-template">
                <lable class="select-template-lable">选择模板</lable>
                <el-select class="select-template-select" v-model="selected">
                  <el-option
                    :value="option.value"
                    :key="option.value"
                    v-for="option in optionList"
                  ></el-option>
                </el-select>
                <el-button class="select-template-button" @click="addTemplate">添加</el-button>
              </div> 
            </div>
          </div>
          <div class="content-center">
            <div class="issuecontent">
              <div class="title">
                <span>编辑信息</span>
              </div>
              <div class="edit">
                <div class="edit-left">
                  <el-card class="box-card">
                      <div slot="header" class="clearfix">
                        <span>编辑器</span> 
                        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
                      </div>
                      <div>
                        <div v-for="o in 4" :key="o" class="textitem">
                          {{'列表内容 ' + o }}
                        </div>
                      </div>
                  </el-card>
                </div>
                <div class="edit-right">
                  <el-card class="box-card">
                      <div slot="header" class="clearfix">
                        <span>预览</span>
                      </div>
                      <div class="chart"><!--折线图-->
                        <v-chart :options="report"/>
                      </div>
                  </el-card>
                </div>
              </div> 
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div slot="footer" class="dialog-footer">
          <el-button class="submit" type="primary" @click="submitData">提交</el-button>
        </div>
      </footer>
    </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'issue',
        props:{
          showIssue:{
            type:Boolean,
            default:false
          }
        },
        data() {
            return {
              selected:'',
                report:{
                    title: {
                        text: '城市路网交通分析报告',
                        textStyle:{
                            color:'#FFF',
                            fontSize :14
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月', '9月', '10月', '11月', '12月'],
                        axisline:{
                            lineStyle: {
                                    //   type: 'solid',
                                      color:'#fff',
                                    //   width:'2'
                                  }
                        },
                        axisLabel: {
                                    textStyle: {
                                        color: '#fff',//坐标值得具体的颜色
                
                                    }
                                }
                    },
                    yAxis: {
                        name: '城市路网各月交通指数',
                        type: 'value',
                        nameTextStyle:{
                            color:'#FFF'
                        },
                        axisLine: {
                                  lineStyle: {
                                    //   type: 'solid',
                                    color:'#fff',
                                    //   width:'2'
                                  }
                              },
                        axisLabel: {
                            textStyle: {
                                color: '#fff',//坐标值得具体的颜色
                
                            }
                        }
                    },
                    series: [{
                        data: [0, 3, 2, 4, 3, 5, 6, 7, 8, 3, 4, 3],
                        type: 'line',
                        symbol: 'none',//不显示折点
                        itemStyle : {
                          normal : {
                            lineStyle:{
                              color:'#FFFF00'
                            }
                          }
                        },
                    }]
                },
                optionList:[{
                  value:1,
                  value: '模板1'
                },{
                  value:2,
                  value: '模板2'  
                },{
                  value:3,
                  value: '模板3'  
                }]
            }
        },
        methods: {
          hide(){
            this.$emit("hideIssue");
          },
          submitData(){
            hide();
          }
        }

    }
</script>

<style lang="scss" scoped>
    .issue-container{
       padding: 20px;
       background-color: #050c26;
      header{
        width: 100%;
        height: 35px;
        position: relative;
        h2{
          float: left;
          font-size:18px;
          font-weight:bold;
          color:rgba(255,255,255,1);
        }
        span{
          float: right;
          cursor: pointer;
          font-size: 26px;
          line-height: 7px;
        }
        .linestart{
          width:140px;
          height:1px;
          background:rgba(32,86,221,1);
          opacity:0.8;
          position: absolute;
          left: 1px;
          bottom: 1px;
        }
      }
      .content{
        width: 800px;
        height: 450px;
        margin-left: 10px;
        .content-top{
          .issue{
            .select-template-title{
              margin: 10px 0px 10px 5px;
              span{
                font-size: 20px;
                font-weight: bold;
              }
            }
            .select-template{
              background-color: rgb(10, 24, 57);
              height: 60px;
              .select-template-lable{
                margin:10px 5px 5px 10px;
              }
              .select-template-select{
                margin:10px 5px 5px 10px;
              }
              .select-template-button{
                margin:10px 5px 5px 10px;
              }

            }
          }
        }
        .content-center{
          .issuecontent{
            .title{
              // font-weight: bold;
              width: 800px;
              margin: 10px 0px 10px 5px;
              span{
                font-size: 20px;
                font-weight: bold;
              }
            }
            .edit{
              float: left;
              .edit-left{
                float: left;
                width:350px;
                height: 400px;
                .box-card{
                  // color: #ffffff;
                  .el-card__header{
                    .clearfix {
                      font-size: 20px;
                      font-weight: bold;
                      width: 100%;
                      height: 100%;
                      // background-color: rgb(30, 70, 166);
                    }
                  }
                }   
              }
              .edit-right{
                float: left;
                margin-left: 20px;
                width: 400px;
                height: 400px;
                .box-card{
                  // color: #ffffff;
                  .el-card__header{
                    .clearfix {
                      font-size: 20px;
                      font-weight: bold;
                      width: 100%;
                      height: 100%;
                      // background-color: rgb(30, 70, 166);
                    }
                  }
                }   
              }
            }
          }

          .chart{
            margin-top: 10px;
            width:300px;
            height:150px;
            background-color:rgb(18, 41, 98);
          }
        }
        // .audit{
        //   width: 600px;
        //   .issuecontent{
        //     margin-top: 10px;
        //     .result{
        //       width: 100%;
        //     }
        //     div{
        //       margin-top: 5px;  
        //     }
        //   }
        // }
      }
      footer{
        height: 60px;
        .dialog-footer{
          .submit{
            margin: 10px 10px 10px 10px;
            float: right;
            width: 97%;
          }
        }
      }
    }
    
</style>
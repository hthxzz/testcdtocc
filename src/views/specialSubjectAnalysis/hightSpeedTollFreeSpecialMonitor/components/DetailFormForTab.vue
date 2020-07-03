<template>
    <div class="detailFormForTab-container" v-if="show" >
      <header>
        <h2>巡查G19</h2>
        <span class="aaaaa" @click="hide" >x</span>
        <span class="linestart"></span>
        <span class="lineend"></span>
      </header>
        <el-tabs type="border-card">
          <el-tab-pane>
            <span slot="label">
              <div class="imgWrap">
              </div>
              <div for="基础信息">基础信息</div>
            </span>
            <div class="road-network-event-content">
              基础信息
            </div>
          </el-tab-pane>
          
          <el-tab-pane label="视频1">
            <!-- tab  name -->
            <span slot="label">
              <div for="视频">视频({{ videoNo  }})</div>
            </span>
            <!-- 视频列表 -->
            <div class="video-list">
              <ul>
                <li v-for="item in itemList" :key="item.uid">
                  <section>
                    <div>
                      <player></player>
                    </div>
                    <h2>{{ item.title }}</h2>
                  </section>
                </li>
              </ul>

            </div>
          </el-tab-pane>
   
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: 'DetailFormForTab',
        props:{
          show:{
            type:Boolean,
            default:false
          }
        },
        data() {
            return {
                videoNo : 6,
                itemList:[{
                  title : 'G4201 k200+1',
                  url:'',
                },{
                  title : 'G4201 k200+1',
                  url:''
                },{
                  title : 'G4201 k200+1',
                  url:''
                },{
                  title : 'G4201 k200+1',
                  url:''
                }]
            }
        },
        methods: {
          hide(){
            // this.show = false;
            this.$emit("hideDetailForm");
          }
        }

    }
</script>

<style lang="scss" scoped>
    .detailFormForTab-container{
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
    }
    .video-list{
      ul{
        padding: 0;
        li{
          width: 200px;
          height: 200px;
          float: left;
          section{
            width: 100%;
            height: 100%;
            div{
                height: 170px;
              }
            h2{
              font-size: 18px;
              height: 30px;
            }
          }
        }
        
      }
    }
.el-tabs--border-card .el-tabs__header{
  flex-basis: 20px;
}
li:not(:first-child){
  margin-left: 20px;
}
</style>
<template>
  <div class="lineDetail-wrap lightSpeedIn" v-if="hide" :class="{hide:isHide}">
    <!-- 线路详情 -->
    <!-- <span class="close" @click="close">x</span> -->
    <popContainer ref="popContainer">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <div class="lineDetail-inner">
            <table>
              <tr>
                <th class="t_label">站点名称:</th>
                <td class="t_content">{{baseInfo.stationName}}</td>
                <th class="t_label">站点等级:</th>
                <td class="t_content">{{baseInfo.levalCode | capitalize}}</td>
              </tr>
              <tr>
                <th class="t_label">占地面积(㎡):</th>
                <td class="t_content">{{baseInfo.siteArea}}</td>
                <th class="t_label">班次:</th>
                <td class="t_content">{{baseInfo.shuttleCount}}</td>
              </tr>
              <tr>
                <th class="t_label">客运量:</th>
                <td class="t_content">{{baseInfo.capacityNum}}</td>
                <th class="t_label">线路条数:</th>
                <td class="t_content">{{baseInfo.lineNum}}</td>
              </tr>
              <tr>
                <th class="t_label">订票电话:</th>
                <td class="t_content">{{baseInfo.tel}}</td>
                <th class="t_label">客运站编号:</th>
                <td class="t_content">{{baseInfo.stationId}}</td>
              </tr>
              <tr>
                <th class="t_label">客运站地址:</th>
                <td class="t_content" colspan="3">{{baseInfo.stationAddress}}</td>
              </tr>
              <tr>
                <th class="t_label">客运站描述:</th>
                <td class="t_content" colspan="3">{{baseInfo.remark}}</td>
              </tr>
            </table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="车站视频" name="second">
          <div class="station-video-wrap">
            <!-- <div class="list">
              <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
                <li v-for="i in count" class="infinite-list-item">{{ i }}</li>
              </ul>
            </div>-->
            <div class="content">
              <ul class="graphy_box video">
                <li v-for="item in videoList">
                  <div class="graphy_title">{{item.name}}</div>
                  <div class="graphy_detail">
                    <videoPlayerTocc :url="item.url"></videoPlayerTocc>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </popContainer>
  </div>
</template>

<script>
import videoConfig from "@/components/common/video/index.js";
import videoPlayerTocc from "@/components/common/video/index.vue";
export default {
  name: "",
  components: {
    videoPlayerTocc
  },
  mixins: [videoConfig],
  props: ["baseInfo"],
  mounted() {},
  filters: {
    capitalize: function(value) {
      return value && parseInt(value);
    }
  },
  methods: {
    close() {
      this.hide = !this.hide;
    },
    load() {
      this.count += 2;
    },
    handleClick(tab, event) {}
  },
  data() {
    return {
      activeName: "first",
      count: 0,
      hide: true,
      isHide: false
    };
  }
};
</script>

<style lang="scss" scoped>
.lineDetail-wrap {
  position: relative;
  width: 560px;
  background-color: rgba(7, 18, 49, 0.8);
  border-radius: 2px;
  transition: all 1.6s;
  // border: 2px solid rgba(35, 94, 243, 0.4);
  animation-duration: 0.6s;
  z-index: 666;
  .close {
    position: absolute;
    right: 10px;
    top: 11px;
    font-size: 22px;
    color: rgba(255, 255, 255, 0.9);
    display: inline-block;
    cursor: pointer;
  }
  .lineDetail-inner {
    height: 100%;
    width: 100%;
    padding: 20px;
  }
  table {
    padding-top: 20px;
    width: 100%;
    tr {
      line-height: 36px;
      td {
        text-align: left;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.6);
      }
      th {
        text-align: left;
        color: rgba(255, 255, 255, 1);
        font-size: 14px;
        font-weight: normal;
      }
    }
  }
}
.hide {
  opacity: 0;
}
ul {
  // height: 160px;
  // width: 36px;
}
.graphy_box {
  height: 260px;
  li {
    height: 100%;
  }
}
.graphy_detail,
.content {
  width: 100%;
  height: calc(100% - 26px);
}
</style>
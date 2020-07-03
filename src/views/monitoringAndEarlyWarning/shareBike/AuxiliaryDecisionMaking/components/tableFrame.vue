<template>
  <div class="tableFrame">
    <div class="box">
      <panelTitle title="骑行始终点分析" :displaySwitch="false"></panelTitle>
      <div class="bdrioc"></div>
      <div class="searchTime">
        <section class="search-wrapper">
          <SearchPanel :searchConfig="searchConfig"></SearchPanel>
        </section>
      </div>
      <div class="feature">
        <div style="height: 30px;line-height: 25px;">时间特征</div>
        <div style="width:82%">
          <span class="aaaa">全部</span>
          <span class="bbb">工作日</span>
          <span class="bbb">非工作日</span>
          <!-- <span class="bbb">adhkad</span> -->
        </div>
      </div>
      <div>
        
      </div>
    </div>
    <!-- <div>全部</div>
          <div>工作日</div>
    <div>非工作日</div>-->
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      searchConfig: {
        isKeyV: true,
        searchCondition: [
          {
            order: 14,
            type: "monthrange",
            formate: "yyyy-MM",
            label: "月份",
            placeholderStart: "开始时间",
            placeholderEnd: "截止时间",
            VModelvalue: {
              name: "statisticsDate",
              defaultValue: ""
            }
          }
        ]
      }
    };
  }
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #030919, rgba(8, 25, 64, 0.8));
  border: 1px solid #153a86;
  border-radius: 4px;
  padding: 20px;
}
.bdrioc {
  width: 100%;
  height: 1px;
  background: #214ab0;
}
.searchTime {
  margin-top: 15px;
  margin-left: 30px;
}
.feature {
  margin-top: 15px;
  width: 100%;
  height: 100%;
  /* line-height: 30px; */
  display: flex;
}
.bbb {
  display: inline-block;
  width: 70px;
  height: 30px;
  border: 1px #01398F solid;
  margin-left: 10px;
  border-radius: 4px;
  line-height: 30px;
  text-align: center;
  background: #01398F;
}
.aaaa {
  display: inline-block;
  width: 70px;
  height: 30px;
  border: 1px #01398F solid;
  margin-left: 5px;
  border-radius: 4px;
  line-height: 30px;
  text-align: center;
  background: #2056DD;
}
</style>
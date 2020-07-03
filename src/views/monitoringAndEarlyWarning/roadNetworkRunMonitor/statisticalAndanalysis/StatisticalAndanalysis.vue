<template>
  <div class="statistical-analysis-wrap">
    <panel>
      <div class="statistical-analysis-container">
        <div class="itemList">
          <section>
            <panelTitle title="交通运行指数" :displaySwitch="false"></panelTitle>
            <div class="search">
              <SearchPanel
                v-if="showSearchPanel"
                :searchConfigList="searchConfigList"
                @getSearchValue="getSearchValue"
              />
            </div>
            <div class="indexContent">
              <div class="left">
                <v-chart :options="option" />
              </div>
              <div class="right">
                <div class="label">
                  <label for>
                    在
                    <span>{{ timeStart }}</span>
                    到 {{ timeEnd }} 之间，按
                    <span>{{timeType}}</span> 的维度统计下，交通指数
                    最高 出现在
                    <span>{{zd}}</span>时,4.5,最低交通指数出现在
                    <span>{{zg}}</span>时,2.0
                  </label>
                </div>
                <div class="content">
                  <StaticTableScrollContainer>
                    <el-table :data="tableData" style="width: 100%" stripe fit="true">
                      <el-table-column label="路段" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                          <span style="margin-left: 10px">{{ scope.row.name }}</span>
                          <span style="margin-left: 10px">{{ scope.row.content }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="断面交通流量" prop="flow"></el-table-column>
                      <el-table-column label="变化情况">
                        <template slot-scope="scope">
                          <span
                            style="color:rgba(255, 0, 0, 1)"
                            v-if="scope.row.changeRate > 2"
                          >{{ scope.row.changeRate }}</span>
                          <span
                            style="color:rgba(255, 192, 0, 1)"
                            v-if="scope.row.changeRate <2"
                          >{{ scope.row.changeRate }}</span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </StaticTableScrollContainer>
                </div>
              </div>
            </div>
          </section>
          <section>
            <panelTitle title="拥堵延时指数" :displaySwitch="false"></panelTitle>
            <div class="search">
              <SearchPanel
                v-if="showSearchPanel"
                :searchConfigList="searchConfigList"
                @getSearchValue="getSearchValue"
              />
            </div>
            <div class="indexContent">
              <div class="left">
                <v-chart :options="option" />
              </div>
              <div class="right">
                <div class="label">
                  <label for>
                    在 2019-08-26 00：00：00 到 2019-08-26 24：59：59 之间，按 小时 的维度统计下，交通指数
                    最高 出现在 1时,4.5,最低交通指数出现在3时,2.0
                  </label>
                </div>
                <div class="content">
                  <StaticTableScrollContainer>
                    <el-table :data="tableData" style="width: 100%" stripe fit="true">
                      <el-table-column label="路段" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                          <span style="margin-left: 10px">{{ scope.row.name }}</span>
                          <span style="margin-left: 10px">{{ scope.row.content }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="断面交通流量" prop="flow"></el-table-column>
                      <el-table-column label="变化情况">
                        <template slot-scope="scope">
                          <span
                            style="color:rgba(255, 0, 0, 1)"
                            v-if="scope.row.changeRate > 2"
                          >{{ scope.row.changeRate }}</span>
                          <span
                            style="color:rgba(255, 192, 0, 1)"
                            v-if="scope.row.changeRate <2"
                          >{{ scope.row.changeRate }}</span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </StaticTableScrollContainer>
                </div>
              </div>
            </div>
          </section>
          <section>
            <panelTitle title="拥堵延时指数" :displaySwitch="false"></panelTitle>
            <div class="search">
              <SearchPanel
                v-if="showSearchPanel"
                :searchConfigList="searchConfigList"
                @getSearchValue="getSearchValue"
              />
            </div>
            <div class="indexContent">
              <div class="left">
                <v-chart :options="option" />
              </div>
              <div class="right">
                <div class="label">
                  <label for>
                    在 2019-08-26 00：00：00 到 2019-08-26 24：59：59 之间，按 小时 的维度统计下，交通指数
                    最高 出现在 1时,4.5,最低交通指数出现在3时,2.0
                  </label>
                </div>
                <div class="content">
                  <StaticTableScrollContainer>
                    <el-table :data="tableData" style="width: 100%" stripe fit="true">
                      <el-table-column label="路段" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                          <span style="margin-left: 10px">{{ scope.row.name }}</span>
                          <span style="margin-left: 10px">{{ scope.row.content }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="断面交通流量" prop="flow"></el-table-column>
                      <el-table-column label="变化情况">
                        <template slot-scope="scope">
                          <span
                            style="color:rgba(255, 0, 0, 1)"
                            v-if="scope.row.changeRate > 2"
                          >{{ scope.row.changeRate }}</span>
                          <span
                            style="color:rgba(255, 192, 0, 1)"
                            v-if="scope.row.changeRate <2"
                          >{{ scope.row.changeRate }}</span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </StaticTableScrollContainer>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- <img class="bgimg" src="./img/search_bg.png" alt="" > -->
      </div>
    </panel>
  </div>
</template>

<script>
import data from "./data";
export default {
  name: "",
  data() {
    return {
      ...data,
      tableData: [
        ...new Array(3).fill({
          content: "从香岛大道到旌江干道-由剑南大道中段辅路由南向北",
          name: "成青路",
          changeRate: "1.2",
          flow: 123
        }),
        ...new Array(3).fill({
          content: "从香岛大道到旌江干道-由剑南大道中段辅路由南向北",
          name: "成青路",
          changeRate: "1.6",
          flow: 234
        }),
        ...new Array(3).fill({
          content: "从香岛大道到旌江干道-由剑南大道中段辅路由南向北",
          name: "成青路",
          changeRate: "2.2",
          flow: 345
        }),
        ...new Array(3).fill({
          content: "从香岛大道到旌江干道-由剑南大道中段辅路由南向北",
          name: "成青路",
          changeRate: "2.6",
          flow: 456
        })
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
$backgroundColor: rgba(5, 12, 38, 1);
.statistical-analysis-wrap {
  // width:100%;
  height: 100%;
  // overflow-y: auto;
  padding-bottom: 10px;
  background: rgba(5, 12, 38, 1);
  // border: 1px solid rgba(32, 86, 221, 0.6);
  // background-image: url("./img/search_bg.png");
  background-size: 124px 120px;
  background-repeat: no-repeat;
  background-position: right top;
  .statistical-analysis-container {
    margin: 0 21px;
  }
}
.bgimg {
  position: absolute;
  top: 45px;
  right: 19px;
  width: 124px;
  height: 120px;
}
.search {
  margin-top: 22px;
}
.indexContent {
  height: 277px;
  background: rgba(32, 86, 221, 0.2);
  margin-top: 20px;
  // opacity:0.2;
  display: flex;
  > div {
    flex: 1;
  }
}
.left {
  height: 100%;
}
.echarts {
  width: 100%;
  height: 100%;
}
.right > .label > label {
  color: #fff;
  text-align: left;
  font-size: 14px;
  display: inline-block;
}
.right > .content {
  height: 218px;
  margin-top: 18px;
}
</style>
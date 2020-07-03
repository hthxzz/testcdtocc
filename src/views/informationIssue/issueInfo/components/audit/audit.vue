<template>
  <div class="audit-container" v-if="auditShow">
    <el-dialog title="待审核信息" :visible.sync="auditShow" width="50%" :modal-append-to-body="false">
      <section>
        <div class="content">
          <div class="chart">
            <!--折线图-->
            <v-chart :options="report" />
            <v-chart :options="report" />
          </div>
          <div class="audit">
            <div class="auditcontent">
              <lable>是否通过审核：</lable>
              <el-radio>是</el-radio>
              <el-radio>否</el-radio>
            </div>
            <div class="audit">
              <div class="auditcontent">
                <lable>是否通过审核：</lable>
                <el-radio>是</el-radio>
                <el-radio>否</el-radio>
              </div>
              <div class="auditcontent">
                <div>
                  <lable>审核描述：</lable>
                </div>
                <div>
                  <el-input
                    class="result"
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="textarea"
                  ></el-input>
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
  name: "audit",
  props: {
    auditShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selected: "",
      report: {
        title: {
          text: "城市路网交通分析报告",
          textStyle: {
            color: "#FFF",
            fontSize: 14
          }
        },
        xAxis: {
          type: "category",
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ],
          axisline: {
            lineStyle: {
              //   type: 'solid',
              color: "#fff"
              //   width:'2'
            }
          },
          axisLabel: {
            textStyle: {
              color: "#fff" //坐标值得具体的颜色
            }
          }
        },
        yAxis: {
          name: "城市路网各月交通指数",
          type: "value",
          nameTextStyle: {
            color: "#FFF"
          },
          axisLine: {
            lineStyle: {
              //   type: 'solid',
              color: "#fff"
              //   width:'2'
            }
          },
          axisLabel: {
            textStyle: {
              color: "#fff" //坐标值得具体的颜色
            }
          }
        },
        series: [
          {
            data: [0, 3, 2, 4, 3, 5, 6, 7, 8, 3, 4, 3],
            type: "line",
            symbol: "none", //不显示折点
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#FFFF00"
                }
              }
            }
          }
        ]
      },
      optionList: [
        {
          value: 1,
          value: "模板1"
        },
        {
          value: 2,
          value: "模板2"
        },
        {
          value: 3,
          value: "模板3"
        }
      ]
    };
  },
  methods: {
    // 关闭添加表单
    close() {
      // 清空输入值
      // this.formData = {};
      // this.formData = this.getFormData();
      this.$props.AuditConfig.dialogFormVisible = false;
    },
    getFormData() {},
    hide() {
      // this.show = false;
      this.$emit("hideAudit");
    },
    submitData() {
      this.hide();
    }
  }
};
</script>

<style lang="scss" scoped>
.audit-container {
  padding: 20px;
  background-color: #050c26;
  header {
    width: 100%;
    height: 35px;
    position: relative;
    h2 {
      float: left;
      font-size: 18px;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }
    span {
      float: right;
      cursor: pointer;
      font-size: 26px;
      line-height: 7px;
    }
    .linestart {
      width: 140px;
      height: 1px;
      background: rgba(32, 86, 221, 1);
      opacity: 0.8;
      position: absolute;
      left: 1px;
      bottom: 1px;
    }
  }
  .content {
    height: 450px;
    margin-left: 10px;
    .chart {
      margin-top: 10px;
      width: 600px;
      height: 250px;
      background-color: rgb(18, 41, 98);
    }
    .audit {
      width: 600px;
      .auditcontent {
        margin-top: 10px;
        .result {
          width: 100%;
        }
        div {
          margin-top: 5px;
        }
      }
    }
  }
  footer {
    height: 60px;
    .dialog-footer {
      .submit {
        margin: 10px 10px 10px 10px;
        width: 97%;
      }
    }
  }
}
</style>
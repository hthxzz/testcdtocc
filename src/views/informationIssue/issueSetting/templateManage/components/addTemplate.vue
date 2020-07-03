<template>
  <div class="audit-container" v-if="templateShow">
    <el-dialog title="添加模板" :visible.sync="templateShow" width="50%" :modal-append-to-body="false">
      <section>
        <div class="content">
          <div class="">
            <h5>编辑模板</h5>
          </div>
          <div class="">
            <div class="left">
              <div>编辑器</div>
              <div>编辑区域</div>
            </div>
            <div class="right">
              <div>指标库</div>
              <div class="">
                <ul>道路交通
                    <li>指标1</li>
                    <li>指标2</li>
                    <li>指标3</li>
                    <li>指标4</li>
                </ul>
                <ul>轨道交通
                    <li>指标1</li>
                    <li>指标2</li>
                    <li>指标3</li>
                    <li>指标4</li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <el-button class="" type="primary" @click="preview">预览</el-button>
          </div>
          <div class="">
            <h5>模板入档</h5>
          </div>
          <div class="">
            <lable>模板类别</lable>
            <el-select v-model="value">
              <el-option
                    :label="option.label"
                    :value="option.value"
                    :key="option.value"
                    v-for="option in optionList"
                  ></el-option>
            </el-select>
            <lable>类别项</lable>
            <el-select v-model="value">
              <el-option
                    :label="option.label"
                    :value="option.value"
                    :key="option.value"
                    v-for="option in categoryItem"
                  ></el-option>
            </el-select>
            <!-- <el-select v-model="formData[item.name]"
                  placeholder="请选择活动区域"
                  v-if="item.type == 'select' "
                >
                  <el-option
                    :label="option.label"
                    :value="option.value"
                    :key="option.value"
                    v-for="option in item.optionList"
                  ></el-option><el-select> -->
          </div>
        </div>
      </section>
      <footer>
        <div slot="footer" class="dialog-footer">
          <el-button class="submit" type="primary" @click="submitData">保存</el-button>
        </div>
      </footer>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "addTemplate",
  props: {
    templateShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      url:"irest/base/xxfb_releaseSetUp/addTemplate",
      selected: "",
      optionList: [{
          value: '1',
          label: '按行业'
        }, {
          value: '2',
          label: '按时间频次'
        }, {
          value: '3',
          label: '按节假日'
        }, {
          value: '4',
          label: '…'
        }, {
          value: '5',
          label: '自定义'
        }],
        value: '',
      categoryItem:[{
          value: '1',
          label: '日'
        }, {
          value: '2',
          label: '月'
        }, {
          value: '3',
          label: '年'
        }, {
          value: '4',
          label: '…'
        }],
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
      // this.$props.AuditConfig.dialogFormVisible = false;
    },
    getFormData() {},
    hide() {
      // this.show = false;
      this.$emit("hideTemplate");
    },
    submitData() {
      // this.hide();
      console.log(formName);
      this.$message.success("成功");
      this.$http.$post2(this.url, { name: "aaaaaa", age: 123 }).then(val => {
        console.log(val);
      });
      this.$refs[formName].validate(valid => {
        if (valid) {
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
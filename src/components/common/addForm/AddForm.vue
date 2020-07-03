<template>
  <div class="add-form-container" v-if="AddFormConfig.dialogFormVisible">
    <transition name="slide-fade">
      <el-dialog
        @close="close"
        :title="AddFormConfig.title"
        custom-class="add-dialog"
        :visible="AddFormConfig.dialogFormVisible"
        :close-on-click-modal="false"
      >
        <el-form
          :model="formData"
          :rules="rules"
          ref="formData"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-row v-for="items in AddFormConfig.itemList">
            <el-col :span="item.colNumber || 12" v-for="item in items" :key="item.name">
              <el-form-item :label="item.label" :prop="item.name">
                <el-input v-model="formData[item.name]" v-if="item.type == 'input' "></el-input>
                <el-select
                  v-model="formData[item.name]"
                  placeholder="请选择活动区域"
                  v-if="item.type == 'select' "
                >
                  <el-option
                    :label="option.label"
                    :value="option.value"
                    :key="option.value"
                    v-for="option in item.optionList"
                  ></el-option>
                </el-select>
                <el-checkbox-group v-model="formData[item.name]" v-if="item.type == 'checkbox' ">
                  <el-checkbox
                    :label="option.label"
                    :key="option.label"
                    v-for="option in item.checkboxList"
                  ></el-checkbox>
                </el-checkbox-group>
                <el-input
                  type="textarea"
                  v-model="formData[item.name]"
                  v-if="item.type == 'textarea' "
                  :rows="item.rows"
                ></el-input>
                <el-switch v-model="formData[item.name]" v-if="item.type == 'switch' "></el-switch>
                <el-radio-group v-model="formData[item.name]" v-if="item.type == 'radio' ">
                  <el-radio
                    :label="option.label"
                    :key="option.label"
                    v-for="option in item.radiOptionList"
                  ></el-radio>
                </el-radio-group>
                <el-upload
                  v-if="item.type == 'file' "
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-change="handleChange"
                  :file-list="fileList"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                <el-date-picker
                  v-if="item.type == 'date' "
                  v-model="formData[item.name]"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions"
                ></el-date-picker>

                <el-date-picker
                  format="yyyy 年 MM 月 dd 日"
                  v-if="item.type == 'daterange' "
                  v-model="formData[item.name]"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerRangOptions"
                ></el-date-picker>
                <el-cascader
                  :options="item.options"
                  v-model="formData[item.name]"
                  v-if="item.type == 'cascader' "
                  clearable
                ></el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('formData')">立即创建</el-button>
          <el-button type="primary" class="table-detail-btn" @click="resetForm('formData')">重置</el-button>
        </div>
      </el-dialog>
    </transition>
  </div>
</template>

<script>
import { pickerOptions, pickerRangOptions } from "./AddForm.js";
export default {
  name: "AddForm",
  data() {
    return {
      pickerOptions: pickerOptions,
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      pickerRangOptions: pickerRangOptions,
      formData: this.getFormData()
    };
  },
  created() {
    console.log(this.AddFormConfig);
    console.log("addform-------created");

    console.log(_.cloneDeep(this.AddFormConfig));
  },
  updated() {
    console.log("addform-----updated");
    console.log(_.cloneDeep(this.AddFormConfig));
    // this.formData = this.getFormData();
  },
  props: {
    AddFormConfig: {
      type: Object
    },
    dialogFormVisible: {}
  },
  methods: {
    handleChange(file, fileList) {
      console.log(file);
      console.log(fileList);
    },
    // 关闭添加表单
    close() {
      // 清空输入值
      this.formData = {};
      this.formData = this.getFormData();
      this.$props.AddFormConfig.dialogFormVisible = false;
    },
    getFormData() {
      //  _.cloneDeep(objects);
      console.log("getFormData");

      const itemList = this.AddFormConfig.itemList,
        itemListf = _.cloneDeep(itemList),
        formData = {};
      itemList &&
        itemList.forEach(val => {
          val.forEach(val2 => {
            if (val2.type == "checkbox") {
              formData[val2.name] = [];
            } else {
              formData[val2.name] = val2.value;
            }
          });
        });
      formData.test = "test";
      return formData;
    },

    submitForm(formName) {
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
    },
    resetForm(formName) {
      this.formData = this.getFormData();
      const data = this.formData;
      // for (const key in data) {
      //   if (data.hasOwnProperty(key)) {
      //     const element = data[key];
      //     if (Array.isArray(element)) {
      //       element = []
      //     }else{
      //       element = '';
      //     }

      //   }
      //   console.log(data);

      // }
      this.$refs[formName].resetFields();
    }
  },
  computed: {
    rules() {
      const itemList = this.AddFormConfig.itemList,
        rules = {};

      itemList.forEach(val => {
        val.forEach(val2 => {
          rules[val2.name] = val2.rules;
        });
      });
      console.log(rules);
      return rules;
    },
    url() {
      return this.AddFormConfig.url;
    },
    isNullFormConfig() {
      return this.AddFormConfig.url == undefined ? false : true;
    }
  }
};
</script>

<style lang="scss" scoped>
.add-form-container {
  width: 100%;
  height: 100%;
  max-height: 450px;
  text-align: left;
}
.el-select {
  width: 100%;
}
.el-date-editor.el-input {
  width: 100%;
}
.el-cascader {
  width: 100%;
}
</style>
<style>
@keyframes move {
  form {
    top: 0;
  }
  to {
    top: -108px;
  }
}
.test {
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  animation-name: move;
  animation-duration: 2s;
  animation-delay: 1s;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
}
</style>

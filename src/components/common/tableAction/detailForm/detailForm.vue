<template>
  <div class="detail-form-container" v-if="show">
    <el-dialog :title="title" :visible.sync="show" width="50%" :modal-append-to-body="false">
      <el-row v-for="items in itemList" :key="items.title">
        <el-col v-for="item in items" :span="item.col || 12" :key="item.name">
          <label class="label detail-form-label" style>{{ item.label }} :</label>
          <span class="detail-form-content">{{ item.value }}</span>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="detailFormConfig.show = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
export default {
  name: "DetailForm",
  props: {
    detailFormConfig: {
      type: Object
    }
  },
  created() {
    // generateHTMLStructure()
  },
  methods: {
    generateHTMLStructure() {
      const data = this.detailFormConfig.data;
    }
  },
  computed: {
    title() {
      return this.detailFormConfig.title;
    },
    itemList() {
      return this.detailFormConfig.data;
    },
    show() {
      return this.detailFormConfig.show;
    }
  },
  data() {
    return {
      // show:this.detailFormConfig.show

      loading: true
    };
  }
};
</script>

<style lang="scss" scoped>
.detail-form-container {
  text-align: left;
  color: #fff;
}
.label {
  color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  display: inline-block;
  height: 30px;
  font-size: 14px;
}
</style>
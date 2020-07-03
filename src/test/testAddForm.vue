<template>
  <div class="formtest">
    <AddForm :AddFormConfig="AddFormConfig"></AddForm>
  </div>
</template>
<script>
import { cascader } from "../components/common/addForm/cascader.js";
import { AddFormConfig } from "../components/common/addForm/AddFormConfig.js";
export default {
  name: "",
  mounted () {
    console.log(this.itemList.flatMap(1));
    
  },
  data() {
    return {
      AddFormConfig:AddFormConfig
    };
  }
};
</script>

<style lang="" scoped>
</style>
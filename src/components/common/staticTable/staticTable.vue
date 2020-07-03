<template>
  <div class="staticTable-container" :class="[dynamiContainer]" >
    <div class="staticTable-wrap" :class="[dynamicWrap]" >
      <el-table :data="tableData"  :row-class-name="tableRowClassName" >
        <el-table-column v-for="item in tableHeadList" :key="item.prop" v-bind="item"></el-table-column>
        <el-table-column
        label="视频" 
        v-if="action"
        >
        <template slot-scope="scope" >
          <el-button @click="handleClick(scope.row)" align='center' type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
      </el-table>
    </div>
    <div class="testtran"></div>
  </div>
</template>

<script>
export default {
  name: "StaticTable",
  props: {
      "tableData":Array,
      "tableHeadList":Array,
      "tableConfig" : Object,
      "stepLength":{
          type:Number,
          default:60
      },
      "action":{
          type:Boolean,
          default:false
      },
      "time":{
          type:Number,
          default:5200
      }
  },
  beforeCreate () {
    _.uniqueId("staticTable-");
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2 === 0) {
          return 'strip-odd';
        } 
      },
    handleClick(row){
      this.$emit("videoPlay",row);
    }
  },
  mounted() {
    let stepLengthinner = this.stepLength,
        timeinner = this.time,
        containerHeight = document.querySelector(`.${this.dynamiContainer}`).getBoundingClientRect().height,
        wrapHeight = document.querySelector(`.${this.dynamicWrap}`).getBoundingClientRect().height,
        minTop = undefined,
        distance = 0;
    this.$nextTick(()=>{
        wrapHeight = document.querySelector(`.${this.dynamicWrap}`).getBoundingClientRect().height;
        minTop = wrapHeight - containerHeight + 20;
        console.log(wrapHeight);
        
    });
    this.StaticTableTime = setInterval(
      () => {
          if (distance > -minTop) {
              document.querySelector(`.${this.dynamicWrap}`).style.top = distance + "px";
          }else{
              distance = 0;
              document.querySelector(`.${this.dynamicWrap}`).style.top = distance + "px";
          }
        
        distance = distance - stepLengthinner;
      },
      timeinner,
      stepLengthinner,
      distance
    );
  },
  beforeDestroy () {
    clearInterval(this.StaticTableTime);
  },
  data() {
    return {
      dynamiContainer : _.uniqueId("staticTable-"),
      dynamicWrap : _.uniqueId("staticTable-"),
      StaticTableTime : 0
    };
  }
};
</script>

<style lang="scss" scoped>
.staticTable-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
  .staticTable-wrap {
    overflow: hidden;
    position: absolute;
    width: 100%;
    transition: all 3s;
    transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    position: absolute;
    top: 0;
  }
}
.testtran {
  height: 200px;
  width: 350px;
  border: 1px solid red;
  position: absolute;
  transition: all 3s;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  position: absolute;
  top: 600px;
}

</style>
<template>
  <div class="mapLegend-container" :style="{top:top,left:left,right:right,bottom:bottom}">
    <div class="mapLegend-wrap">
      <table>
        <tr v-for="item in mapLegend.list" :key="item.name">
          <th>
            <span :style="{backgroundColor:item.color}"></span>
          </th>
          <td>{{item.name}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "MapLegend",
  props: ["mapLegend", "top", "left", "right", "bottom"],
  data() {
    return {
      //   mapLegend: {
      //     list: [
      //       {
      //         color: "rgba(209, 146, 63, 0.938)", // 圖例顔色
      //         name: "1号线" // 圖例名字
      //       },
      //       {
      //         color: "rgba(66, 51, 207, 0.938)",
      //         name: "2号线"
      //       },
      //       {
      //         color: "rgba(50, 50, 73, 0.938)",
      //         name: "2号线"
      //       },
      //       {
      //         color: "rgba(37, 73, 46, 0.938)",
      //         name: "2号线"
      //       },
      //       {
      //         color: "rgba(117, 67, 86, 0.938)",
      //         name: "2号线"
      //       },
      //       {
      //         color: "rgba(45, 182, 125, 0.938)",
      //         name: "2号线"
      //       }
      //     ]
      //   }
    };
  }
};
</script>

<style lang="scss" scoped>
.mapLegend-container {
  position: absolute;
  z-index: 6;
  right: 410px;
  bottom: 45px;
  transition: all 0.6s;
  .mapLegend-wrap {
    position: relative;
    background-color: rgba(35, 94, 243, 0.06);
    border-radius: 2px;
    transition: all 1.6s;
    border: 0.02rem solid rgba(35, 94, 243, 0.09);
    background-repeat: no-repeat;
    padding: 10px 15px;
    table {
      tr {
        line-height: 31px;
        //   color: rgba(66, 51, 207, 0.938);
        th {
          line-height: 31px;
          span {
            height: 10px;
            width: 10px;
            border-radius: 50%;
            margin-right: 16px;
            display: inline-block;
          }
        }
        td {
          font-size: 14px;
          max-width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
}
</style>
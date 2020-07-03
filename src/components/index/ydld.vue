<template>
  <div class="container">
    <div class="wrap">
      <table>
        <thead>
          <tr>
            <td style="width:11%">排名</td>
            <td style="width:45%">路段名称</td>
            <td style="width:22%">拥堵指数</td>
            <td style="width:22%">平均车速</td>
          </tr>
        </thead>
      </table>
      <div class="list" :key="item.name" v-for="(item,index) in items">
        <table>
          <tbody>
            <tr>
              <td style="width:10%">
                <span class="order" :style="{backgroundColor:item.color}">{{ index + 1 }}</span>
              </td>
              <td style="width:50%">{{item.name }}</td>
              <td style="width:20%">{{item.zs }}</td>
              <td style="width:20%">{{item.speed }}</td>
            </tr>
          </tbody>
        </table>
        <span>
          <span class="content">{{item.content }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      items: [
        {
          color: "rgba(255, 0, 0, 1)",
          name: "江家互通",
          zs: "8.92",
          speed: "22.37",
          content: "从成都绕城高速到江家立交，东向西；拥堵时长35分钟。"
        },
        {
          color: "rgba(255, 0, 0, 1)",
          name: "西三环路一段",
          zs: "7.91",
          speed: "27.17",
          content: "从成都绕城高速到江家立交，东向西；拥堵时长35分钟。"
        },
        {
          color: "rgba(255, 0, 0, 1)",
          name: "剑南大道中段",
          zs: "7.71",
          speed: " 29.22",
          content: "从成都绕城高速到江家立交，东向西；拥堵时长35分钟。"
        },
        {
          color: "rgba(255, 0, 0, .4)",
          name: "西三环路六段",
          zs: "8.92",
          speed: " 32.91",
          content: "从成都绕城高速到江家立交，东向西；拥堵时长35分钟。"
        },
        {
          color: "rgba(255, 0, 0, .4)",
          name: "西三环路三段",
          zs: "7.12",
          speed: "45.91",
          content: "从成都绕城高速到江家立交，东向西；拥堵时长35分钟。"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.container {
  // width:371px;
  // height:12px;
  font-size: 14px;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  height: 100%;
  // line-height: 30px;
  .wrap {
    width: 100%;
    // margin: 0 21px;
    height: 100%;
    display: flex;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: center;
    align-items: center;
    table {
      width: 100%;
      font-size: 14px;
      flex: 1;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }
    .list {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      transition: all 1.6s;
      animation-name: change;
      animation-duration: 1s;
      animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);

    }
  }
}
.order {
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 50%;
  font-size: 14px;
}
.content {
  display: block;
  max-height: 0;
  overflow: hidden;
}
@keyframes change{
  25% { transform: rotateY(90deg) }
  50% { transform: rotateY(180deg) }
  75% { transform: rotateY(270deg) }
  100% { transform: rotateY(360deg) }
}
</style>
<style scoped>
     
      .list:nth-child(2){
        animation-delay: 0s;
      }
      .list:nth-child(3){
        animation-delay: 1s;
      }
      .list:nth-child(4){
        animation-delay: 2s;
      }
      .list:nth-child(5){
        animation-delay: 3s;
      }
      .list:nth-child(6){
        animation-delay: 4s;
      }
</style>


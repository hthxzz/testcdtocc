<template>
  <div class="left-menu-container" ref="leftMenuContainer">
    <!-- <div class="left-menu-wrap">
      <div class="item" :key="item.id" v-for="item in menu" @click="goto" >
        <router-link :to="{path:item.path}"  active-class='leftMenuActive' >
                <img :src="(item.icon)" alt="">
                <h2>{{item.title}}</h2>
        </router-link>
        <div class="tip" ref="tip" :style="{left:left + 'px'}" >{{ item.title }}</div>
      </div>
    </div> -->
    <Sidebar></Sidebar>
  </div>
</template>

<script>
import Sidebar from "../../views/layOut/Sidebar/index";
export default {
  name: "",
  components: {
    Sidebar
  },
  props : {
    menu : {
      type : Array
    }
  },
  data() {
    return {
      left:0
    };
  },
  mounted () {
    // this.left = document.querySelector(".left-menu-wrap").getBoundingClientRect().width;
    let leftMenuContainerHeight = this.$refs.leftMenuContainer.getBoundingClientRect().height;
    let style = document.querySelector(".left-menu-container").querySelector("ul").style;
    style.height = leftMenuContainerHeight + 'px';
    // style.style.backgroundColor = 'rgb(5, 14, 38)';

  },
  methods: {
    goto(){
      console.log(this);
      
    }
  }
};
</script>

<style lang="scss" scoped>
.left-menu-container {
  width: 100%;
  height: 100%;
  transition: all .6s;
  .left-menu-wrap {
    display: flex;
    flex-direction: column; 
    .item{
        // margin-bottom: 21px;
        // padding: 10px 10px 10px 10px;
        position: relative;
        cursor: pointer;
        a{
            height: 100%;
            display: inline-block;
            padding: 0.1rem 0.1rem 0.1rem 0.1rem;
          img{
            width: 40px;
            height: 40px;
          }
        }
        &:hover{
          background:rgba(32,86,221,.4);
        }
        &:hover > .tip{
          visibility: visible;
        }
    }
    .tip{
        position: absolute;
        color: #FFFFFF;
        // left: 60px;
        // width: 81px;
        top: 20px;
        visibility: hidden;
        text-align: center;
        width:80px;
        height:24px;
        background:rgba(32,86,221,1);
        border-radius:2px;
        font-size: 14px;
        line-height: 24px;
    }
  }
}
.leftMenuActive{
   background:rgba(32,86,221,.4);
}
.item:not(:first-child){
    margin-top: 10px;
}
</style>
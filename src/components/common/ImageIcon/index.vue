<template>
    <div class="imageicon-wrap" @click="imageclick">
        <img :src="src" v-if="hasImageUrl" alt=""  :height="height" :style="{backgroundcolor:backgroundcolor}" >
        <!-- <img :src="orgSrc" v-if="!hasImageUrl"  :height="height" :style="{backgroundcolor:backgroundcolor}" > -->
        <span class="origle" v-if="!hasImageUrl"></span>
    </div>
</template>

<script>
    export default {
        name: 'ImageIcon',
        props: {
            src:{
                
            },
            width: {
                default: '40px',

            },
            height: {
                default: '40px',
                
            },
            backgroundcolor: {
                default: 40,
            }
        },

        computed: {
          hasImageUrl(){
              if (this.$props.src == "default") {
                  return false;
                  
              }else{
                  return true;
              }
            //    console.log(this.$props.src);
            //   return this.$props.src ;
          }  
        },
        methods: {
          imageclick(){
             this.$emit("imageclick"); 
          }  
        },
        data() {
            return {
                orgSrc:require("./yuandian.png")
            }
        }
    }
</script>













<style lang="scss" scoped>
    .imageicon-wrap{
        // float: left;
        position: relative;
        width: 30px;
        height: 100%;
        display: inline-block;
        img{
            width: 30px;
            height: 30px;
        }
        .origle{
            width:6px;
            height:6px;
            display: block;
            background: #fff;
            position: absolute;
            right: -6px;
            top: 46%;
            border-radius:50%;
        }
    }
</style>
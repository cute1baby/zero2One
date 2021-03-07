<template>
  <div class="hello">
    <!-- 实现以下功能： -->
    <!-- 1、v-resize指令：监听浏览器窗口大小改变的时候，通过监听函数onResize相应 -->
    <!-- <div v-resize="onResize">{{length}}</div> -->
    <!-- 2、可通过direction，控制监听页面高度或者宽度的变化 -->
    <div v-resize:[direction].quiet="onResize">{{length}}</div>
    <!-- 3、可通过修饰符.quiet来控制是否在指令初始化的时候，响应onResize函数 -->
    <!-- <div v-resize.quiet="onResize">{{length}}</div> -->
    <!-- <div v-resize="onResize">{{length}}</div> -->

    <p @click="updateMsgData">{{msg}}</p>
  </div>
</template>

<script>
import baseMixin from '../mixins/baseMixin'
export default {
  name: "HelloWorld",
  props: ['msg'],
  mixins: [baseMixin],
  data() {
    return {
        direction: 'height',    // 控制计算高度还是宽度
        length: 0
    }
  },
  created(){
      this.sayHello()
  },
  methods: {
    // sayHello(){
    //     console.log('我是组件的模块，跟你打招呼')
    // },
    updateMsgData(){
        this.$emit('update:msg', '修改后的值')
    },
    onResize(length){
        this.length = length;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

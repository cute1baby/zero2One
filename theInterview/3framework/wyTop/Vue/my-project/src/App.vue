<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld :msg.sync="msg"/>
    <slot-nav >
        <!-- 相当于用template重写了一遍 -->
        <template v-slot:header>这是用户的名字：{{user.email}}</template>
    </slot-nav>
    <CustomInput :value="value" @input="handleInput" @blur="onBlur" /> 
  </div>
</template>

<script>
import SlotNav from './components/SlotNav.vue'
import HelloWorld from './components/HelloWorld.vue'
import CustomInput from './components/CustomInput.vue'

export default {
  name: 'App',
  data(){
      return {
          msg: '测试一下sync的语法',
          user: {
              email: '1138724604@qq.com'
          },
          value: '1234'
      }
  },
  methods: {
      onBlur(){
          console.log('失去焦点')
      },
      handleInput(){
          console.log('输入数据')
      }
  },
  components: {
      SlotNav,
    HelloWorld,
    CustomInput
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

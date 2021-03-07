import Vue from 'vue'
// import { delete } from 'vue/types/umd';
import App from './App.vue'

Vue.config.productionTip = false

// 自定义指令
Vue.directive('resize', {
    inserted(el, binding){
        console.log(binding)
        const callback = binding.value;
        const direction = binding.arg;
        const modifiers = binding.modifiers;

        // 判断计算高度还是宽度
        const test = () => {
            return direction==='height' ? window.innerHeight : window.innerWidth;
        }
        window.addEventListener('resize', () => callback(test()));
        
        // 设置quiet，初始化不计算
        if(!modifiers || !modifiers.quiet){
            callback(test());
        }
        el._onResize = callback;
    },
    unbind(el){
        if(!el.onresize) return;
        window.removeEventListener('resize', el._onResize);
        delete el._onResize
    }
})

new Vue({
  render: h => h(App),
}).$mount('#app')

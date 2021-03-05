# zeroToOne
从0到1综合的把前端知识点过一遍

mac系统查看全局安装的npm包：npm list -g --depth 0


## 前端粗略知识点
4天的知识点css、js、框架和算法。
- 对应文件夹    【theInterview】
- 对应的课程文件：17、一线大厂前端面试题汇总：4天训练营    ✅

📈 题目很经典，需要反复看


## webpack
- 对应文件夹    【webpack】
- 对应的课程文件：18 webpack4.0     

### 对webpack优化有几个疑惑
- 1、通过import的方式引入了lodash、echart等包之后，打包之后的vendor.js有多大？有什么方式能对这种情况做优化？
- 2、按需引入了`elementui`之后，通过`import { Pagination, Table, TableColumn, Image } from 'element-ui'; Vue.use(Pagination)...`，这样做是否会增大vendor.js的体积，会对首屏加载时长产生影响。
- 3、如果使用了cdn的方式引入`echart.min.js`（241k）的时候，是否有类似于`import(/* webpackPrefetch: true */ './selfModules/click.js')`异步引入的方式，在打开这个需要使用这个插件的页面才加载这个插件。

- pwa的功能没有实现（note4.md，后面多方尝试实现了）
- 在项目中使用eslint的过程多需要重新操练一番（借鉴note4.md）
    - 测试eslint创建项目eslint1（成功）



- cjm_vue: 即陈建明的vue项目，主要看eslint的配置问题

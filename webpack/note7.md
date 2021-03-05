## bundler模块分析
`比较重要，多看几遍`
文件目录如下：
```
|- src
    |- index.js
    |- message.js
    |- word.js
|- bundler.js
```
src是模块化的内容，bundler是对src进行模块化的解析，所以执行`node bundler`。

为了对输出代码进行高亮显示，全局安装一个插件cli-highlight，然后执行`node bundler | highlight`，我安装了之后貌似不生效。

安装模块`@babel/parser`，即`npm i @babel/parser -S`。查看babel的网站(https://www.babeljs.cn/docs/)，然后进入【工具】，点击parser，可以查看这个内容。






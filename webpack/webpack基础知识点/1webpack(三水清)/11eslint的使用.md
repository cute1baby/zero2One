例子可参照：eslint1

## 初始工作

- 先安装eslint插件，并进行初始化
```
npm install -D eslint
npx eslint --init
```
上述初始化之后，会创建.eslintrc.json文件。创建配置文件之前，需要回答几个问题，确定自己的代码风格，.eslintrc.json示例如下：
```
{
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "airbnb-base",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {}
}
```
如果要安装类似的airbnb、google和standard的规则，可以下载对应的插件。
```
# airbnb
npm install --save-dev eslint-config-airbnb
# google
npm install --save-dev eslint-config-google
#standard
npm install --save-dev eslint-config-standard
```

默认配置rules时，用下面几个
```
{
    'rules': {
        // 禁止 console，要用写 eslint disbale
        'no-console': 2,
        // 禁止 debugger，防止上线
        'no-debugger': 2,
        // 禁止 alert，要用写 eslint disable
        'no-alert': 2,
        // 不用的 var，要删除，手动 tree shaking，要洁癖
        'no-unused-vars': 2,
        // 没定义就用的就别用，全局的要用 写 eslint global
        'no-undef': 2
    }
}
```


## webpack中使用eslint

- 先安装eslint-loader
```
yarn add eslint-loader -D
```

- webpack.config.js中增加配置
```
{
    test: /\.js$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [path.resolve(__dirname, 'src')], // 指定检查的目录
    options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
        formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
    }
}
```

这里为了让eslint报错好看一点，安装一个eslint-formatter-friendly插件：
```
yarn i eslint-formatter-friendly -D
```


## StyleLint
检测 CSS 语法使用StyleLint，提供了css的书写规则。
官方推荐代码风格以下2个：
```
stylelint-config-recommended
stylelint-config-standard
```

使用StyleLint需要先安装下面这个插件：
```
yarn add stylelint -D
```

除此之外，还可以安装stylelint-order插件，强制我们在写CSS时按照某个顺序来编写。如先写定位，再写盒模型，再写内容区样式，最后写 CSS3 相关属性。
StyleLint 的配置文件是.stylelintrc.json，其中的写法跟 ESLint 的配置类似。例子如下：
```
{
    "extends": ["stylelint-config-standard", "stylelint-config-recess-order"],
    "rules": {
        "at-rule-no-unknown": [true, {"ignoreAtRules": ["mixin", "extend", "content"]}]
    }
}
```
配置 at-rule-no-unknown 是为了让 StyleLint 支持 SCSS 语法中的 mixin、extend、content 语法。


## Webpack 中使用 StyleLint
Webpack 中使用 StyleLint 是通过插件的方式来使用，插件名字是：stylelint-webpack-plugin。`npm install -D stylelint-webpack-plugin`，安装该插件之后，需要在webpack.config.js中进行配置
```
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
    // ...
    plugins: [new StyleLintPlugin(options)]
    // ...
};
```

在 stylelint-webpack-plugin 插件中有两个跟 Webpack 编译相关的配置项：
- emitErrors：默认是true，将遇见的错误信息发送给 webpack 的编辑器处理；
- failOnError：默认是false，如果是 true遇见 StyleLint 报错则终止 Webpack 编译。
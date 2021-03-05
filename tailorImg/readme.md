## 生成图片如下：
貌似只要用了resize，那么就不能使用`subClass({imageMagick: true})`。

- app1.js   重置宽高，设置浮雕效果
- app2.js   在一个图片上画一个圆（目前还不能给图片倒圆角）
- app3.js   写一句话（目前写中文会乱码）
- app4.js   写一句话（目前写中文会乱码）


## tips 
- 使用`gm`之前要下载`graphicsmagick`和`imagemagick`这两个模块。
- 使用`images`会报错：`Can't load the addon`，这是node版本的支持问题。





# View
原生 JavaScript 实现了仿 Vue  的简单指令如 `v-model`与插值.

## 代码摘要

HTML 主要部分如下所示：

``` html
<div id="app">
	<h1>{{title}}</h1>
	<input v-model="name">
	<h3>{{name}}</h3>
	<button v-on:click="clickMe">Say Hello</button>
</div>
```

实例也是仿照简单的 Vue 实例：

```javascript
let view = new View({
  el: '#app',
  data: {
    title: 'View',
    name: 'Hedgehog'
  },
  methods: {
    clickMe() {
      alert('Hello!');
    }
  }
});
```

## 演示
演示也是也是非常简洁，用 `h1` 和 `h3` 标签演示插值 , 一个输入框展示 `v-model` 指令，一个按钮展示 `v-on` 指令。

 [点这里](https://zhongyangxun.github.io/View/dist) 进入演示界面。

## 本地运行

把项目 clone 到本地后，在项目根目录运行下面这两个命令即可。

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm start

```

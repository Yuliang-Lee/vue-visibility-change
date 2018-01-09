# v-visibility-change

Page Visibility API wrapper for vuejs.

## Usage

### 安装

```shell
$ npm i vue-visibility-change -S
```

### 

```js
import Vue from 'vue';
import visibility from 'vue-visibility-change';

// registry directive
Vue.use(visibility);

// global mode
visibility.change((evt, hidden) => {
  // do something
});
```

## Demo

visit [Demo](https://codesandbox.io/s/llok18zjy7) page, open `console pane` in the lower right corner, switch broswer tab to see output.

![demo.gif](https://i.loli.net/2018/01/09/5a53c65c73db9.gif
)
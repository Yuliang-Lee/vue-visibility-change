# v-visibility-change

Page Visibility API wrapper for vuejs.

## feature

- no denpendencies
- support vue directive && global callback
- detect page visibility state

## Usage

### 安装

#### npm

```shell
$ npm i vue-visibility-change -S
```

#### script

可以直接使用`script`标签引入
```html
<script src="./lib/vue-visibility.js"></script>
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

## License

[MIT](./LICENSE)

Copyright (c) 2017-present, xlaoyu
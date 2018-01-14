# v-visibility-change

Page Visibility API wrapper for vuejs.

## Features

- no denpendencies
- support vue directive && global callback
- detect page visibility state
- full tests in chrome, theoretically compatible with IE > 10,	Firefox > 10, Safari > 6.1

## Usage

### install

#### npm

```shell
$ npm i vue-visibility-change -S
```

#### script

可以直接使用`script`标签引入
```html
<script src="./lib/vue-visibility.js"></script>
```

### global

```js
import Vue from 'vue';
import visibility from 'vue-visibility-change';

// registry directive
Vue.use(visibility);

// global mode
const handler = visibility.change((evt, hidden) => {
  // do something
});

visibility.hidden(); // Return true if page now isn’t visible to user.

visibility.unbind(handler); // Remove `change` listener by it's handler.

visibility.isSupported(); // Return true if browser support Page Visibility API.
```

### vue-directive

```html
<template>
  <div v-visibility-change="visibilityChange">
  </div>
</template>
<script>
export default {
  methods: {
    visibilityChange(hidden) {
      // do something
      console.log(hidden);
    }
  }
};
</script>
```

## Demo

visit [Demo](https://codesandbox.io/s/llok18zjy7) page, open `console pane` in the lower right corner, switch broswer tab to see output.

![demo.gif](https://i.loli.net/2018/01/09/5a53c65c73db9.gif
)

## License

[MIT](./LICENSE)

Copyright (c) 2017-present, xlaoyu
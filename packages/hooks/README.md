# Smart-Taro-hooks

## 简介

为`Taro`而设计的`Hooks Library`.

## 文档

[gh-page](https://sixstones.cn/smart-taro/)

## 特性

- 全面匹配`Taro API`.
- 结合`ahooks`扩展常用`hook`.
- 完整的类型定义文件
- 按需加载
- 更易用的方式

## 安装

```bash
$ yarn add smart-taro-hooks
```

## 使用

```jsx
import { useUpdate } from 'taro-hooks';
```

注: `smart-taro-hooks`的`js`代码默认支持基于`ES modules`的`tree shaking`. 但你依然可以显式的使用[`babel-plugin-import`](https://github.com/ant-design/babel-plugin-import)去设置按需加载, 设置方式如下:

```js
// babel.config.js
module.exports = {
  plugins: [
    [
      'import',
      {
        libraryName: 'smart-taro-hooks',
        camel2DashComponentName: false,
      },
      'smart-taro-hooks',
    ],
  ],
};
```

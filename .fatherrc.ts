export default {
  esm: {
    type: 'babel',
    file: 'smart-taro-hooks',
    mjs: true,
    minify: true,
  },
  cjs: {
    type: 'babel',
    file: 'smart-taro-hooks',
    lazy: true,
    minify: true,
  },
  umd: {
    globals: {
      react: 'React',
      '@tarojs/taro': 'Taro',
      querystring: 'querystring',
    },
    name: 'smart-taro-hooks',
    file: 'smart-taro-hooks',
    minFile: true,
    sourcemap: true,
  },
  pkgs: ['hooks', 'app'], // 解决依赖顺序
  injectCSS: false, // 不注入css
  extractCSS: false, // 单独提取css
  runtimeHelpers: true,
  disableTypeCheck: true,
};

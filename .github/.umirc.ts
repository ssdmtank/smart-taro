import { defineConfig } from 'dumi'

export default defineConfig({
  title: 'Monki UI',
  favicon: 'https://img.icons8.com/ultraviolet/2x/year-of-monkey.png',
  logo: 'https://img.icons8.com/ultraviolet/2x/year-of-monkey.png',
  base: '/smart-taro-seed',
  publicPath: '/smart-taro-seed/',
  outputPath: 'docs-dist',
  mode: 'site',
  exportStatic: {}, // 将所有路由输出为 HTML 目录结构，以免刷新页面时 404
  resolve: {
    includes: ['docs', 'components'],
  },
  navs: [
    null,
    {
      title: 'Github',
      path: 'https://github.com/ssdmtank/smart-taro-seed',
    },
  ],
  // more config: https://d.umijs.org/config
})
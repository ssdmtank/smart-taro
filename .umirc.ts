import { defineConfig } from 'dumi'

const repo = 'smart-taro-seed'

export default defineConfig({
  title: 'Smart-taro-seed',
  favicon: 'https://img.icons8.com/ultraviolet/2x/year-of-monkey.png',
  logo: 'https://img.icons8.com/ultraviolet/2x/year-of-monkey.png',
  // base: `/${repo}/`,
  // publicPath: `./${repo}/`,
  outputPath: 'docs-dist',
  mode: 'site',
  hash: true,
  exportStatic: {}, // 将所有路由输出为 HTML 目录结构，以免刷新页面时 404
  resolve: {
    includes: ['docs', 'packages'],
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
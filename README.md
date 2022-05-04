# smart-taro

参考 https://juejin.cn/post/7074111715507437598

```
yarn create @umijs/dumi-lib --site
lerna init

// lerna.json
{
  ...
  "npmClient": "yarn",
  "useWorkspaces": true, // 使用yarn workspaces
  "version": "independent" // 使用独立版本
}

// package.json
{
  ...
  "workspaces": ["packages/*"],
}

// 删除示例
rm -rf src

// 创建包
lerna create @smart-taro/hooks
lerna create @smart-taro/app

yarn

yarn start
```

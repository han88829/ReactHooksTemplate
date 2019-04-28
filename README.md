## 基于 easy-peasy 测试 react hooks demo

## 出现问题

* 无法加载scss，报错信息如下
` Node Sass does not yet support your current environment: OS X 64-bit with Unsupported runtime (72) `

` 删除node_modules重新安装，或者使用npm rebuild node-sass `
其他解决办法：
` npm config set sass-binary-site http://npm.taobao.org/mirrors/node-sass ` 或者
` yarn config set sass-binary-site http://npm.taobao.org/mirrors/node-sass `
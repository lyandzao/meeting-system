# 会务资源调度系统

## 启动项目

```shell
yarn
yarn start
```

## 部署项目

```shell
docker build -t ms .
docker run --name meeting-system -d -p 80:80 ms
```

## 项目环境
1. node版本无所谓（建议用nvm管理node版本）
2. 命令行工具yarn，无所谓版本（建议用yrm管理下载镜像）
3. docker无所谓版本（仅部署的时候用）

## 项目结构
- build: 构建好的文件，用于部署
- node_modules: 项目下载的依赖包，切勿上传
- public: 存放静态资源，比如logo，html，ico
- src: 主要开发目录  
  - assets: 静态资源，存放图片、字体等
  - components: 组件文件夹，存放公有组件
  - constant: 常量文件夹，存放常量
  - hooks: 自定义的hook，满足逻辑复用
  - layouts: 全局的布局组件
  - pages: 页面组件页，在这里做组件组合和请求
  - router: 全局路由管理
  - services: 封装的axios和全局api管理
  - store: 全局的状态存放
  - styles: 全局的样式
  - utils: 一些工具函数
  - (index.tsx): app入口文件
  - (react-app-env.d.ts): 全局的ts接口定义
  - (serviceWorker.ts): pwa的一些设置，不用管
  - (setupTestes.ts): 测试设置，不用管
- (.dockerignore): docker在构建时忽略的文件和文件夹
- (.env-cmdrc.json): 项目的环境变量管理
- (.gitignore): git提交时忽略的文件和文件夹
- (.yarnrc): 设置的yarn下载镜像，比如node-sass国内下载较慢
- (config-overrides.js): 用的三方库配置webpack，更加简单
- (default.conf): nginx配置文件，用于部署
- (Dockerfile): docker构建文件
- (package.json): 依赖包管理文件，通过这个下载node_modules
- (README.md): 项目相关的信息
- (tsconfig.json): ts配置文件
- (tsconfig-overrides.json): ts配置文件重写
- (yarn.lock): 锁定依赖包的版本

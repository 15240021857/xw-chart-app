# 即时通信 server

## 技术栈

- node.js(express) + mongodb + socket.io
- mongoose8:文档如下
  https://mongoosejs.com/docs/api/model.html#Model.createCollection()

  - find 条件操作符
    https://www.mongodb.com/zh-cn/docs/manual/reference/operator/query/and/

- nodemailer
- 加密 Bcrypt.js

## 后台结构：

Controller: 处理用户请求，控制 service 和 dao 干事,输入 req,输出 相应数据，res.send 出去就好了。
Service：处理具体业务
Dao：操作数据库相关
Model：抽象出数据库模型和数据构成
Util：小工具
https://zhuanlan.zhihu.com/p/686923277

## 接口整理

https://flowus.cn/c968e065-b49f-4925-95e0-f9db2ac8544b

## 接口文档

## 步骤

- 跨域解决
  post data 接收
  路由 拆分支持
- 启动 mongodb

* mongod --dbpath ...启动 或 sevice.msc 手动

- 连接数据库

* mongosh 去连接
* mongose 去连接

- 建表，建 model dao service

  - 用户表：id, userName, email, password, desc, phone, createTime
  - 好友表: id, userId, friendId, friendName, status(0 申请中 1 已接收 2 拒绝), createTime, 备注名 markName
  - 一对一聊天表: id, senderId, accepterId, content, type(0 文字 1 音频 2 视频...), createTime, status(0 发送中 1 成功 2 失败), isRead(0 未读 1 已读)
  - 群表: id, owerId, groupName, createTime, desc,
  - 群成员表: id, groupId, userId, userName, email, password, desc, phone, createTime
  - 群聊天记录表: id, senderId, groupId, content, type(0 文字 1 音频 2 视频...), createTime, status(0 发送中 1 成功 2 失败), isRead(0 未读 1 已读)

  schma 去定义和约束一个 document 的字段
  model 一个 document

  - model.create
  - model.remove

  ## 中间件使用

  - https://blog.csdn.net/m0_62442882/article/details/140110581
  - app 应用级别中间件
    - app.use(function(req, res, next))
  - 路由级别中间件
    - router.use(function(req, res, next))
  - 接口级别
    - 可单独加到接口上
  - 错误处理级别
    - err, req, res, next
    - 监听和处理路由或中间件抛出的错误
  - 内置中间件
    - express.json() 处理 json 格式的请求数据
    - express.static() 快速托管静态资源 例如 html，图片，css 等
    - express.urlencoded() 解析 URL-encoded 格式的请求数据
  - 第三方中间件
    - cors: 跨域资源共享
    - multer: 处理文件上传

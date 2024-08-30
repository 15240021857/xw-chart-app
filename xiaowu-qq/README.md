# 技术架构

前端：uniapp + uniapp.socket.io
后端：node.js + express + mangodb + socket.io
编辑器： vscode + hbuilder + 微信开发工具

UI 设计稿: http://www.huohuo90.com/yikes

- 作者 yikes, 本项目为模仿实现，感谢作者
- 介绍页 http://www.huohuo90.com/

# 步骤：

梳理 UI 设计稿和需求
确定页面，拆分组件，明确接口

创建项目：vue-cli
改变主题色：通过 UI 设计图去修改 --不用管

页面开发：
首页：

- +创建页面 index.vue +结构 > 样式 +头部：结构 + 样式，列表：结构+样式

登录
注册
搜索
用户主页
用户添加好友
用户主页-添加好友
用户详情
好有请求页面
聊天功能页
建群页
群详情页

## 踩坑记录：

- 自定义导航栏： position: fixed; height=UI 设计图高 88rpx
  padding-top: var(status-bar-height)系统状态栏高度。
  网上各种复杂计算，getSystemInfo.insetxxx, 暂时不需要
- scroll-view 的 height 可以是 100%；但 padding-top: 88rpx+var(status-bar-height) 即可
- 工具函数：formateDate 编写，先写思路，再写代码，勤思考，不要懒：
  比如如何显示时间？今天展示时分，昨天显示昨天十分，昨天以前显示年月日时分，
  怎么判断？日相等，年相等，月相等，判断今天， 日+1 = 今日 即前天 这样去思考。
  按以往就是，太麻烦 烦 直接找轮子。

## 响应码规范

成功 200
客户端错误 40x

- 401 无效令牌
- 403 令牌过期

服务端错误 50x

## http methods uni.request

- post data 后台用 req.body 接收
- get data 后台用 req.query 接收

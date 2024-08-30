const mongoose = require('mongoose');
const CounterModel = require('./CountIndex')
const Schema = mongoose.Schema

// 用户表
const userSchema = new Schema({
    userId: { type: String, unique: true, required: true },
    userName: String,
    email: String,
    password: String,
    desc: String,
    phone: String,
    sex: { type: String, default: 'man'}, // 后来添加，可能需要add
    birth: Date, // 后来添加，可能需要add
    imgUrl: String, // 后来添加，可能需要add
    createTime: {type: Date, default: Date.now},
})

//   创建用户校验数据时的钩子
  userSchema.pre("validate", async function (next) {
    const user = this;
    // 新增或传了uid则放行
    if (!user.isNew || user.userId) {
      return next();
    }
    try {
        // 没有uid则创建自增id
      if (!user.userId) {
        user.userId = await CounterModel.getNextSequenceValue("userId"); // id是你需要自增的属性
      }
    } catch (err) {
      next(err);
    }
  });

  const userModel = mongoose.model('User', userSchema)
//   同步表唯一索引:改变索引立即刷新
  userModel.syncIndexes()
  // 好友表  userId, friendId, friendName,markName备注名， tips：新消息个数, status(0 申请中 1 已接收 2 拒绝)
const FriendSchema = new Schema({
    userId: {type: String, ref: "User"},
    friendId: {type: String, ref: "User"},
    friendName: String,
    markName: String, //add
    status: Number,
    imgUrl: String,
    tips: {type: Number, default: 0},
    createTime: {type: Date, default: Date.now},
})
// 一对一消息表id, senderId, accepterId, content, type(0 文字 1 音频 2 视频...), createTime, status(0 发送中 1 成功 2 失败), isRead(0 未读 1 已读)
const OtoMsgSchema = new Schema({
    senderId: {type: String, ref: "User"},
    accepterId: {type: String, ref: "User"},
    content: String,
    type: Number,
    status: Number,
    isRead: Number,
    createTime: {type: Date, default: Date.now},
})
// 群表id, owerId, groupName, createTime, notice公告,imgUrl群图片
const GroupSchema = new Schema({
    owerId: {type: String, ref: "User"},
    groupName: String,
    imgUrl: String,
    notice: Number,
    createTime: {type: Date, default: Date.now},
})
// 群成员表id, groupId, userId, userName, nickName备注名, shield(0不屏蔽 1屏蔽),tips未读消息数
const GroupMemberSchema = new Schema({
    groupId: {type: Schema.Types.ObjectId, ref: "Group"},
    userId: {type: String, ref: "User"},
    userName: String,
    nickName: String,
    shield: {type: Number, default: 0},
    tips: {type: Number, default: 0},
    createTime: {type: Date, default: Date.now},
})
// 群消息表 id, senderId, groupId, content, type(0 文字 1 音频 2 视频...), createTime, status(0 发送中 1 成功 2 失败), isRead(0 未读 1 已读)
const GroupMsgSchema = new Schema({
    groupId: {type: Schema.Types.ObjectId, ref: "Group"},
    senderId: {type: String, ref: "User"},
    content: String,
    type: Number,
    status: Number,
    isRead: Number,
    createTime: {type: Date, default: Date.now},
})
module.exports = {
    userModel,
    FriendModel: mongoose.model('Friend', FriendSchema),
    OtoModel: mongoose.model('Oto', OtoMsgSchema),
    GroupModel: mongoose.model('Group', GroupSchema),
    GroupMemberModel: mongoose.model('GroupMember', GroupMemberSchema),
    GroupMsgModel: mongoose.model('GroupMsg', GroupMsgSchema)
}
<template>
  <scroll-view scroll-y="true" class="msg-list scroll-view">
    <view class="list-title">{{ listTitle }}</view>
    <view v-if="list.length > 0" class="msg-li" v-for="item in list" :key="item.userId">
      <view class="msg-li-avatar">
        <image v-if="item.imgUrl" class="msg-avatar" :src="item.imgUrl" mode="widthFix" />
        <image v-else class="msg-avatar" src="@/static/imgs/avatar.png" mode="widthFix" />
      </view>
      <view class="msg-li-content">
        <view class="msg-name" v-html="item.userName"></view>
        <view class="msg-content">{{ item.email }}</view>
      </view>
      <view class="msg-li-right">
        <button class="xw-list-btn" v-if="item?.isFriend" @click="sendMessage(item.userId)">发消息</button>
        <button class="xw-list-btn yellow-btn" v-else @click="addFriend(userStore?.userIdGet, item.userId)">加好友</button>
      </view>
    </view>
    <view v-else class="no-data">暂无数据</view>
  </scroll-view>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, onMounted, defineProps } from "vue";
import { addFriendApi } from "../../../api/friend";
// import { getUserListApi } from "../../../api/user";
import { useUserStore } from "@/stores/userStore";
const { proxy } = getCurrentInstance();
const { menuHeight } = proxy;
console.log("menuHeight", menuHeight);
const userStore = useUserStore();
defineProps({
  // 标题
  listTitle: {
    type: String,
    default: "标题",
  },
  // 列表数据
  list: {
    type: Array,
    default() {
      return [];
    },
  },
});
// const getFriendListFun = async () => {
//   const result = await getUserListApi();
//   if (result?.code == 200) {
//     msgList.value = result?.data || [];
//   }
// };
// onMounted(() => {
//   getFriendListFun();
// });
const addFriend = async (userId, friendId) => {
  const res = await addFriendApi({ userId, friendId });
  console.log(res);
  if (res.code == 200) {
    uni.showToast({
      title: res.msg || "添加成功",
    });
  }
};
const sendMessage = (fid) => {
  // 跳转至聊天界面
  uni.navigateTo({ url: `/pages/ChatRoom/ChatRoom?fid=${fid}` });
};
const lower = (e) => {
  console.log("lower", e);
};
const upper = (e) => {
  console.log("upper", e);
};
const scroll = (e) => {
  console.log("scroll", e);
};
</script>

<style lang="scss" scoped>
.msg-list {
  // margin: $xw-page-vertical-padding 0;
  box-sizing: border-box;
  // 上边距 = nav高+状态栏高
  padding-top: calc($xw-navbar-height + var(--status-bar-height) + 34rpx);
}
.msg-li {
  display: flex;
  margin-bottom: 40rpx;
  padding: 0 $xw-page-horizontal-padding;
  margin-bottom: 40rpx;
  &:first-of-type {
    padding-top: 36rpx;
  }
  &:last-of-type {
    margin-bottom: 0;
  }
}
.msg-li-avatar {
  margin-right: 32rpx;
  position: relative;
  .msg-avatar {
    width: 80rpx;
    height: 80rpx;
    background-color: #ccc;
    border-radius: $xw-img-radius;
  }
}
.msg-li-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  .msg-name {
    font-size: 36rpx;
    line-height: 50rpx;
    color: $xw-font-main-color;
    letter-spacing: -0.62px;
  }

  .msg-content {
    font-size: 28rpx;
    line-height: 40rpx;
    color: $xw-font-secondary-color;
  }
}
.list-title {
  font-size: 44rpx;
  color: $xw-font-main-color;
  letter-spacing: -0.75px;
  font-weight: 600;
  padding: 0 $xw-page-horizontal-padding 20rpx;
}
.msg-li-right {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.xw-list-btn {
  width: 120rpx;
  height: 48rpx;
  line-height: 48rpx;
  background: rgba(74, 170, 255, 0.1);
  border-radius: 24px;
  box-sizing: border-box;
  font-size: 24rpx;
  color: #4aaaff;
  white-space: nowrap;
  padding: 0;
  &.yellow-btn {
    background-color: $xw-yellow-btn-color;
    color: $xw-font-main-color;
  }
}
</style>

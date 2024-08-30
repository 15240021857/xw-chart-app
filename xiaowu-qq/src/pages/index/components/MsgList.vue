<template>
  <scroll-view scroll-y="true" class="msg-list scroll-view" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
    <view v-if="msgList.length > 0" class="msg-li" v-for="item in msgList" :key="item.id">
      <view class="msg-li-avatar">
        <image v-if="item.imgUrl" class="msg-avatar" :src="item.imgUrl" mode="widthFix" />
        <image v-else class="msg-avatar" src="@/static/imgs/avatar.png" mode="widthFix" />
        <view v-if="item.tips" class="new-msg">{{ item.tips }}</view>
      </view>
      <view class="msg-li-content">
        <view class="msg-name">{{ item.markName || item?.friendName }}</view>
        <view class="msg-content">{{ item.content }}</view>
      </view>
      <view class="msg-li-tip">
        <text class="msg-time">{{ formatDate(item.createTime) }}</text>
      </view>
    </view>
    <view v-else class="no-data">暂无好友</view>
  </scroll-view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { formatDate } from "@/utils/index.js";
import { getFriendListApi } from "../../../api/friend";
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();
const msgList = ref([]);
const getFriendListFun = async () => {
  try {
    const result = await getFriendListApi({ userId: userStore?.userIdGet });
    if (result?.code == 200) {
      msgList.value = result?.data || [];
    }
  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  getFriendListFun();
});

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
  padding-top: calc($xw-navbar-height + var(--status-bar-height));
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
    width: 96rpx;
    height: 96rpx;
    background-color: #ccc;
    border-radius: $xw-img-radius;
  }
  .new-msg {
    position: absolute;
    right: -10rpx;
    top: -10rpx;
    width: 36rpx;
    height: 36rpx;
    line-height: 36rpx;
    text-align: center;
    background-color: $xw-tips-red-color;
    color: #fff;
    border-radius: 50%;
    font-size: 24rpx;
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
  }
  .msg-content {
    font-size: 28rpx;
    line-height: 40rpx;
    color: $xw-font-secondary-color;
  }
}
.msg-time {
  font-size: 24rpx;
  line-height: 34rpx;
  color: $xw-font-thirdary-color;
}
</style>

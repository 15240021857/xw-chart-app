<template>
  <view class="nav-bar capsule-box">
    <view class="top-head-left">
      <image class="user-avatar" src="@/static/logo.png" mode="widthFix" />
    </view>
    <view class="top-head-center">
      <image class="app-logo" src="@/static/imgs/file@2x.png" mode="widthFix" />
    </view>
    <view class="top-head-right">
      <image class="search-icon icon" src="@/static/imgs/search@2x.png" mode="widthFix" @click="toSearch" />
      <image class="add-icon icon" src="@/static/imgs/add group@2x.png" mode="widthFix" />
    </view>
  </view>
</template>

<script setup>
import { getCurrentInstance, computed } from "vue";
const { proxy } = getCurrentInstance(); //3.0.11

// 胶囊按钮(标题栏)样式
const capsuleStyle = computed(() => {
  return { "padding-top": proxy?.safeAreaInsets?.top + "px" };
});

const toSearch = () => {
  uni.navigateTo({
    url: "/pages/Search/Search",
  });
};
</script>

<style lang="scss" scoped>
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  display: flex;
  flex-direction: row;
  height: $xw-navbar-height;
  line-height: $xw-navbar-height;
  align-items: center;
  justify-content: center;
  // 系统状态栏高度
  padding: var(--status-bar-height) 32rpx 0;
  background-color: rgba(255, 255, 255, 0.9);
  box-sizing: content-box;
}

.user-avatar {
  width: 68rpx;
  height: 68rpx;
}
.top-head-left {
  display: flex;
  align-items: center;
}
.top-head-center {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.top-head-right {
  display: flex;
  align-items: center;
}
.app-logo {
  width: 88rpx;
  height: 42rpx;
}
.top-head-right .icon {
  margin-right: 20rpx;
  &:last-of-type {
    margin-right: 0;
  }
}
/* #ifdef MP-WEIXIN */
//微信小程序 有胶囊按钮
.top-head-right {
  position: relative;
  bottom: -30px;
}
/* #endif */
.search-icon {
  width: 52rpx;
  height: 52rpx;
}
.add-icon {
  width: 48rpx;
  height: 48rpx;
}
</style>

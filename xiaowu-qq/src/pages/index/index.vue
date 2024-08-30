<template>
  <view class="content">
    <!-- 自定义导航栏 -->
    <NavBar></NavBar>
    <!-- 消息列表 -->
    <MsgList class="msg-wrap"></MsgList>
  </view>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import MsgList from "./components/MsgList.vue";
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>

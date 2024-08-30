<template>
  <view class="ChatRoom">ChatRoom:fid:{{ fid }}</view>
</template>

<script lang="ts" setup>
import { onLoad, onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
const fid = ref();
onLoad((option) => {
  console.log("options==", option);
  fid.value = option?.fid;
});
</script>

<style lang="scss" scoped></style>

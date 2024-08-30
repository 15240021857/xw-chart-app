<template>
  <uni-search-bar class="search-bar" @confirm="search" :focus="true" v-model="searchValue" @input="input" @cancel="cancel"> </uni-search-bar>
  <SearchList listTitle="用户" :list="userList"></SearchList>
  <SearchList listTitle="群组" :list="groupList"></SearchList>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getUserListApi } from "@/api/user";
import { getGroupListApi } from "@/api/group";
import SearchList from "./components/SearchList.vue";
import { arrIsFriendApi } from "@/api/friend";
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();

const searchValue = ref();
// 用户列表
const userList = ref([]);
// 群组列表
const groupList = ref([]);

const search = async (res) => {
  getListFun(res);
};
// 获取列表
const getListFun = async (keyword) => {
  if (keyword?.value == "" || keyword == "") {
    userList.value = [];
    groupList.value = [];
    return;
  }
  const result = await getUserListApi({ keyword });
  // userList.value = result?.data || [];
  const userRelationRes = await getRelationList(result?.data);
  const relationObj = userRelationRes?.data;
  userList.value = result?.data.map((item) => {
    item.isFriend = relationObj[item.userId];
    item.userName = item.userName.replaceAll(keyword, `<text class="blue-words">${keyword}</text>`);
    return item;
  });
  const groupResult = await getGroupListApi({ keyword });
  groupList.value = groupResult?.data || [];

  console.log("userList.value", userList.value);
};
// 获取关系 type: friend || group
const getRelationList = (list, type) => {
  let idProp = "userId";
  if (type == "group") {
    idProp = "groupId";
  }
  const param = {
    userId: userStore.userIdGet,
    friendIds: list?.map((item) => item[idProp]),
  };
  console.log(param);

  return arrIsFriendApi(param);
};
const input = (res) => {
  getListFun(res);
};
const cancel = () => {
  uni.navigateBack({ delta: 1 });
};
</script>

<style lang="scss" scoped>
.search-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 9;
  height: $xw-navbar-height;
  line-height: $xw-navbar-height;
  // 系统状态栏高度
  padding: var(--status-bar-height) 32rpx 0 32rpx;
  /* #ifdef MP-WEIXIN */
  padding: var(--status-bar-height) calc(150rpx + 32rpx) 0 32rpx;
  /* #endif */
  background-color: rgba(255, 255, 255, 0.9);
  box-sizing: content-box;
}
:deep .blue-words {
  color: $xw-blue-color;
}
</style>

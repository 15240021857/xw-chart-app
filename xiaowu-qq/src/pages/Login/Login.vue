<template>
  <view class="login">
    <view class="login-top">
      <view class="close-btn">×</view>
      <navigator class="jump-btn" url="/pages/Register/Register" open-type="navigate" hover-class="navigator-hover"> 注册 </navigator>
    </view>
    <view class="logo-wrap">
      <image class="logo-img" src="@/static/imgs/file@2x.png" mode="widthFix" />
    </view>
    <view class="title-wrap">
      <view class="login-title">登录</view>
      <text class="login-hello">您好，欢迎来到 yike！</text>
    </view>
    <view class="login-form-wrap">
      <uni-forms class="login-form" :modelValue="formData" ref="loginForm">
        <uni-forms-item label="" name="userName">
          <uni-easyinput
            class="underline-input"
            type="text"
            v-model="formData.userName"
            :inputBorder="false"
            placeholder="邮箱/手机号"
            :placeholderStyle="placeholderStyle"
          />
        </uni-forms-item>
        <uni-forms-item label="" name="password">
          <uni-easyinput
            class="underline-input"
            type="password"
            v-model="formData.password"
            :inputBorder="false"
            placeholder="请输入密码"
            :placeholderStyle="placeholderStyle"
          />
        </uni-forms-item>
      </uni-forms>

      <button class="login-btn" size="default" type="default" hover-class="is-hover" @click="submitForm">登录</button>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";
import { validEmail } from "../../utils/valid";
import { useUserStore } from "@/stores/userStore";
import { getInfoApi, loginApi } from "@/api/user";

const userStore = useUserStore();
const formData = reactive({
  userName: "xiaowu01",
  password: "123123",
});
const loginForm = ref();
const submitForm = () => {
  uni.showLoading();

  loginForm.value
    .validate()
    .then((res) => {
      uni.hideLoading();
      console.log("表单数据信息：", res);
      const isEmail = validEmail(formData.userName);
      const data = {
        password: formData.password,
      };
      if (isEmail) {
        data.email = formData.userName;
      } else {
        data.userName = formData.userName;
      }
      loginApi(data).then(async (res) => {
        console.log("res.data", res.data);
        if (res.code === 200) {
          const { access_token, userId, userName, imgUrl } = res?.data;

          userStore?.setToken(access_token);
          userStore?.setUserId(userId);
          console.log("access_token", access_token);
          console.log("userStore.access_token", userStore?.access_token);
          uni.showToast({
            title: "登录成功",
          });
          uni.navigateTo({
            url: "/pages/index/index",
          });
          const result = await getInfoApi({ userId });
          console.log("getInfoApi result", result);
        }
      });
    })
    .catch(() => {
      uni.hideLoading();
    });
};
const placeholderStyle = 'color: "#272832";"font-size";"24rpx";"font-weight": 500; "line-height": "50rpx"';
</script>

<style lang="scss" scoped>
.login {
  padding: calc(var(--status-bar-height) + 88rpx + 20rpx) $xw-login-horizontal-padding constant(safe-area-inset-bottom);
  padding: calc(var(--status-bar-height) + 88rpx + 20rpx) $xw-login-horizontal-padding env(safe-area-inset-bottom);
  /* #ifdef H5 */
  padding-top: calc(var(--status-bar-height) + 88rpx);
  /* #endif */
}
.login-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .close-btn {
    font-size: 54rpx;
    color: #000;
    font-weight: 500;
  }
}
.logo-wrap {
  margin: 98rpx auto 54rpx;
  text-align: center;
}
.logo-img {
  width: 192rpx;
}
.login-title {
  font-size: 56rpx;
  line-height: 80rpx;
  font-weight: 500;
  color: $xw-font-main-color;
  margin-bottom: 14rpx;
}
.login-hello {
  font-size: 40rpx;
  line-height: 56rpx;
  color: $xw-font-secondary-color;
}
.login-form {
  margin: 68rpx 0 118rpx;
}
.login-btn {
  width: 520rpx;
  height: 96rpx;
  background: #ffe431;
  box-shadow: 0px 50rpx 32rpx -36rpx rgba(255, 228, 49, 0.4);
  border-radius: 48px;
  font-size: 32rpx;
  font-weight: 500;
  color: $xw-font-main-color;
  line-height: 96rpx;
}
.underline-input {
  height: 76rpx;
  box-sizing: border-box;
  border-bottom: 4rpx solid $xw-input-border-color;
}
</style>

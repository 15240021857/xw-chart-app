<template>
  <view class="login">
    <view class="login-top">
      <navigator class="jump-btn" open-type="navigateBack" :delta="1">
        <uni-icons type="left" size="24"></uni-icons>
      </navigator>
    </view>
    <view class="logo-wrap">
      <image class="logo-img" src="@/static/imgs/file@2x.png" mode="widthFix" />
    </view>
    <view class="title-wrap">
      <view class="login-title">注册</view>
    </view>
    <view class="login-form-wrap">
      <uni-forms class="login-form" :modelValue="formData" ref="registerForm" :rules="formRules">
        <uni-forms-item label="" name="userName">
          <uni-easyinput
            class="underline-input"
            type="text"
            v-model="formData.userName"
            :inputBorder="false"
            placeholder="请取个名字"
            :placeholderStyle="placeholderStyle"
          />
        </uni-forms-item>
        <uni-forms-item label="" name="email">
          <uni-easyinput
            class="underline-input"
            v-model="formData.email"
            :inputBorder="false"
            placeholder="请输入邮箱"
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
      <button class="login-btn" :disabled="submitDisabled" size="default" type="default" hover-class="is-hover" @click="submitForm">登录</button>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, computed, nextTick, watch } from "vue";
import { isEmpty } from "@/utils/index.js";
import { validEmail, validEmailFun, validPasswordFun, validUsernameFun } from "../../utils/valid";
import { registerApi, userNameOrEmailExistsApi } from "../../api/user";
// 注册表单数据
const formData = reactive({
  userName: "xiaowu0",
  email: "657615322@qq.com",
  password: "123123",
});
// 注册表单校验
const formRules = {
  userName: {
    rules: [
      {
        required: true,
        errorMessage: "不能为空",
      },
      {
        validateFunction: validUsernameFun,
      },
      {
        errorMessage: "用户名已有",
        validateFunction: async (rule, value, data, callback) => {
          let param = {
            userName: value,
          };
          // 请求
          const result = await userNameOrEmailExistsApi(param);
          const isExists = result?.data;
          console.log("result", result);
          if (result?.code == 200 && isExists) {
            callback("此用户名已存在");
          } else if (result?.code !== 200) {
            callback(result?.msg);
          }
          // 不存在则成功
          return true;
        },
      },
    ],
  },
  email: {
    rules: [
      {
        required: true,
        errorMessage: "不能为空",
      },
      {
        validateFunction: validEmailFun,
      },
      {
        errorMessage: "邮箱已有",
        validateFunction: async (rule, value, data, callback) => {
          let param = {
            email: value,
          };
          // 请求
          const result = await userNameOrEmailExistsApi(param);
          const isExists = result?.data;
          if (result?.code == 200 && isExists) {
            callback("此邮箱已存在");
          } else if (result?.code !== 200) {
            callback(result?.msg);
          }
          // 不存在则成功
          return true;
        },
      },
    ],
  },
  password: {
    rules: [
      {
        required: true,
        errorMessage: "不能为空",
      },
      {
        validateFunction: validPasswordFun,
      },
    ],
  },
};
// 注册form实例
const registerForm = ref();
// 注册表单提交
const submitForm = () => {
  uni.showLoading();
  registerForm.value
    .validate()
    .then((res) => {
      uni.hideLoading();
      console.log("表单数据信息：", res);
      registerApi(formData).then((res) => {
        if (res.code === 200) {
          uni.showToast({
            title: "注册成功",
          });
          uni.navigateTo({
            url: "/pages/Login/Login",
          });
        }
      });
    })
    .catch((err) => {
      uni.hideLoading();
      console.log("表单错误信息：", err);
    });
};
const placeholderStyle = 'color: "#272832";"font-size";"24rpx";"font-weight": 500; "line-height": "50rpx"';
// 提交按钮 表单数据不为空才放开
const submitDisabled = ref(true);
watch(formData, (newVal, oldVal) => {
  const hasEmpty = Object.keys(newVal).some((item) => isEmpty(newVal[item]));
  submitDisabled.value = hasEmpty;
});
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

<script>
import { getCurrentInstance } from "vue";
export default {
  onLaunch: function () {
    console.log("App Launch");
    const { appContext } = getCurrentInstance(); //3.0.11
    const { globalProperties } = appContext.config;
    // 获取系统信息
    const systemInfo = uni.getSystemInfoSync();
    // // 胶囊按钮位置信息
    // const menuButtonInfo = uni?.getMenuButtonBoundingClientRect();

    // // 导航栏高度 = 状态栏+导航栏总高度（胶囊上坐标位置-状态栏高度） * 2 + 胶囊高度 + 状态栏高度
    // globalData.navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height + systemInfo.statusBarHeight;
    // // 胶囊按钮(标题栏)的高度
    // globalProperties.menuHeight = menuButtonInfo?.height;
    // // 胶囊按钮（标题栏）距顶部高度
    // globalData.menuTop = menuButtonInfo.top;
    globalProperties.safeAreaInsets = systemInfo.safeAreaInsets;
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
/*每个页面公共css */
@import "@/styles/common.scss";
</style>

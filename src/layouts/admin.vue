<template>
  <div class="h-full flex flex-col">
    <!-- 主内容区 -->
    <div class="flex-1 flex flex-col">
      <!-- 页面头部 -->
      <div :style="{ height: global.CARAMBOLA_HEADER_HEIGHT }">
        <f-header />
      </div>
      <div
        class="flex-1 flex"
        :style="{ height: `calc(100% - ${global.CARAMBOLA_HEADER_HEIGHT})` }"
      >
        <div class="h-full flex flex-col bg-gray-100 w-full">
          <div>
            <f-tag-list />
          </div>
          <div
            class="m-3"
            :style="{
              height: `calc(100% - ${global.CARAMBOLA_MENU_TABS_TAG_HEIGHT})`,
            }"
          >
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import FHeader from "./components/FHeader.vue";
import FTagList from "./components/FTagList.vue";
import { useUserStore } from "~/store"; // 导入 Pinia store
import { global } from "~/init/global";

const userStore = useUserStore(); // 使用 Pinia store
</script>

<style scoped>
.el-aside {
  transition: all 0.3s;
}

.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave-from {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-active {
  transition-delay: 0.3s;
}
</style>
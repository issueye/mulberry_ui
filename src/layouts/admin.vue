<template>
  <div class="h-full flex flex-col">
    <div :style="{ height: global.CARAMBOLA_HEADER_HEIGHT }">
      <f-header />
    </div>
    <div
      class="flex"
      :style="{ height: `calc(100% - ${global.CARAMBOLA_HEADER_HEIGHT})` }"
    >
      <el-aside :width="userStore.asideWidth" class="h-full flex flex-col shadow">
        <div style="height:calc(100% - 40px)">
          <f-menu></f-menu>
        </div>
        <div v-if="userStore.asideWidth === global.CARAMBOLA_MENU_WIDTH" 
          class="h-[38px] w-full text-sm text-gray-400 font-semibold subpixel-antialiased flex items-center">
          <span class="ml-4">版本：</span> <span>{{ global.APP_VERSION }}</span>
        </div>
      </el-aside>
      <div
        class="h-full flex flex-col bg-gray-100"
        :style="{ width: `calc(100% - ${userStore.asideWidth})` }"
      >
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
</template>

<script setup>
import FHeader from "./components/FHeader.vue";
import FMenu from "./components/FMenu.vue";
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
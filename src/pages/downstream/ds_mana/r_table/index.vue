<template>
  <div class="w-full">
    <el-tabs>
      <el-tab-pane label="静态页面">
        <Pages />
      </el-tab-pane>
      <el-tab-pane label="转发规则">
        <Rules />
      </el-tab-pane>
      <!-- <el-tab-pane label="GZIP过滤">
        <GzipFilter />
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";

import Pages from "../pages/index.vue";
import Rules from "../rules/index.vue";
import GzipFilter from "../gzip_filter/index.vue";
</script>
<template>
  <div class="w-full">
    <el-tabs>
      <el-tab-pane label="静态页面">
        <Pages />
      </el-tab-pane>
      <el-tab-pane label="转发规则">
        <Rules />
      </el-tab-pane>
      <el-tab-pane label="资源管理">
        <Resource />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import Pages from "../pages/index.vue";
import Rules from "../rules/index.vue";
import Resource from "../resource/index.vue";
</script>
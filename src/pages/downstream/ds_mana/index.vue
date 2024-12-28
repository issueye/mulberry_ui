<template>
  <base-page title="代理管理" desc="代理管理" padding="0px">
    <template #content>
      <div class="h-full flex">
        <div style="width: 550px; border-right: 1px solid #d9d9d9;">
          <div class="p-4">
            <LTable />
          </div>
        </div>
        <div style="width: calc(100% - 550px);">
          <div class="p-4">
            <RTable />
          </div>
        </div>
      </div>
    </template>
  </base-page>
</template>

<script setup>
import LTable from './l_table/index.vue';
import RTable from './r_table/index.vue';
</script>
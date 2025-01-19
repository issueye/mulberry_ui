<template>
  <div
    class="w-[300px] h-[200px] mr-3 flex flex-col border border-solid border-slate-300 rounded shadow hover:shadow-md"
  >
    <div
      class="p-2 flex justify-between"
      style="border-bottom: 1px solid #d9d9d9"
    >
      <div class="flex items-center">
        <span class="text-lg font-semibold subpixel-antialiased leading-5">
          {{ data.title }}
        </span>
        <el-tag
          size="small"
          :type="data.status ? 'success' : 'danger'"
          effect="plain"
          class="ml-2"
        >
          {{ data.status ? "启用" : "停用" }}
        </el-tag>
      </div>

      <el-button link type="primary" size="small">编辑</el-button>
    </div>
    <div class="grow p-2">
      <div>
        <span class="text-xs font-semibold text-slate-300">产品编码：</span>
        <span class="text-xs">{{ data.product_code }}</span>
      </div>
      <div>
        <span class="text-xs font-semibold text-slate-300">产品名称：</span>
        <span class="text-xs">{{ data.name }}</span>
      </div>
      <div>
        <span class="text-lg font-semibold text-slate-500">产品版本：</span>
      </div>
    </div>
    <div class="flex justify-end p-2">
      <el-button link type="danger" size="small">删除</el-button>
    </div>
  </div>
</template>
<script setup>
import { toRefs } from "vue";

const props = defineProps({
  data: {
    type: Object,
    default: () => {
      return {
        title: "",
      };
    },
  },
});

const { data } = toRefs(props);
</script>
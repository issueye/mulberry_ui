<template>
  <div>
    <el-row :gutter="20">
      <!-- 骨架屏，数据加载前的占位 -->
      <template v-if="panels.length === 0">
        <el-col :span="6" v-for="i in 4" :key="i">
          <el-skeleton style="width: 100%" animated loading>
            <template #template>
              <el-card shadow="hover" class="border-0">
                <template #header>
                  <div class="flex justify-between">
                    <el-skeleton-item variant="text" style="width: 50%" />
                    <el-skeleton-item variant="text" style="width: 10%" />
                  </div>
                </template>
                <el-skeleton-item variant="h3" style="width: 80%" />
                <el-divider />
                <div class="flex justify-between text-sm text-gray-500">
                  <el-skeleton-item variant="text" style="width: 50%" />
                  <el-skeleton-item variant="text" style="width: 10%" />
                </div>
              </el-card>
            </template>
          </el-skeleton>
        </el-col>
      </template>

      <!-- 数据展示部分 -->
      <el-col :span="6" v-for="(item, index) in panels" :key="index">
        <el-card shadow="hover">
          <div class="flex">
            <div class="bg-gray-100 p-3 rounded-md">
              <el-icon :size="60" :class="item.color">
                <component :is="item.icon" />
              </el-icon>
            </div>
            <div class="flex flex-col grow h-full items-center">
              <span class="p-3 text-sm text-gray-400">{{ item.title }}</span>
              <span class="grow text-3xl font-bold text-gray-500">
                <CountTo :value="item.value" />
              </span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 其他组件 -->
    <IndexNavs />

    <!-- 图表区域 -->
    <el-row :gutter="20" class="mt-2">
      <el-col :span="24">
        <div
          ref="chartRef"
          class="h-[400px] p-4 mt-5 rounded shadow bg-white"
        ></div>
      </el-col>
    </el-row>
  </div>
</template>
  
  <script setup>
import { onMounted, reactive, ref, watchEffect } from "vue";
import * as echarts from "echarts";
import { useResizeObserver } from "@vueuse/core";
import CountTo from "~/components/CountTo.vue";
import IndexNavs from "~/components/IndexNavs.vue";
import { apiGetHomeCount } from "~/api";
import { apiGetPortTraffic } from "~/api/port";
const panels = ref([]);
const chartRef = ref(null);
let chartInstance = null;

// 获取端口流量数据
const getPortTraffic = async () => {
  return;
  const res = await apiGetPortTraffic();
  const ports = res.data.map((item) => item.port);
  const traffics = res.data.map((item) => item.traffic);

  if (chartInstance) {
    chartInstance.setOption({
      xAxis: { data: ports },
      series: [{ data: traffics }],
    });
  }
};

const getHomeCount = async () => {
  const res = await apiGetHomeCount();
  console.log("res", res);

  panels.value = [
    {
      title: "用户",
      color: "text-light-blue-500",
      icon: "user",
      value: res.userCount,
    },
    {
      title: "客户端",
      color: "text-light-blue-500",
      icon: "message-box",
      value: res.clientCount,
    },
    {
      title: "数据库",
      color: "text-violet-500",
      icon: "grid",
      value: res.dbCount,
    },
    {
      title: "任务",
      color: "text-fuchsia-500",
      icon: "histogram",
      value: res.taskCount,
    },
  ];
};

onMounted(() => {
  getHomeCount();
  getPortTraffic();

  // 初始化图表
  chartInstance = echarts.init(chartRef.value);
  chartInstance.setOption({
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    xAxis: {
      type: "category",
      name: "端口号",
      data: [],
    },
    yAxis: {
      type: "value",
      name: "流量(MB)",
    },
    series: [
      {
        type: "bar",
        itemStyle: {
          color: "#409EFF",
          borderRadius: [4, 4, 0, 0],
        },
        barWidth: "60%",
        data: [],
      },
    ],
  });

  // 响应式调整图表
  useResizeObserver(chartRef, () => {
    chartInstance?.resize();
  });
});
</script>
  
  <style scoped>
/* 添加必要的样式 */
:deep(.el-card__body) {
  padding: 10px;
}
</style>
  
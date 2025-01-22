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
              <div>
                <span class="grow text-3xl font-bold text-gray-500">
                  <CountTo :value="item.value" />
                </span>
                <span class="font-bold text-gray-400 ml-2">{{
                  item.unit
                }}</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 其他组件 -->
    <IndexNavs />

    <!-- 图表区域 -->
    <el-row :gutter="20" class="mt-5">
      <el-col :span="24">
        <el-card shadow="hover">
          <template #header>
            <span>端口流量统计</span>
          </template>
          <div ref="chartRef" class="h-[300px]" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
  
  <script setup>
import { onMounted, onUnmounted, ref } from "vue";
import * as echarts from "echarts";
import { useResizeObserver } from "@vueuse/core";
import CountTo from "~/components/CountTo.vue";
import IndexNavs from "~/components/IndexNavs.vue";
import { apiGetPortTraffic } from "~/api/port";
const panels = ref([]);
const chartRef = ref(null);
let chartInstance = null;

const timer = ref(null);

const getAllTraffic = (item) => {
  return Math.ceil((item.out_bytes + item.in_bytes) / 1024);
};

const getOutTraffic = (item) => {
  return Math.ceil(item.out_bytes / 1024);
};

const getInTraffic = (item) => {
  return Math.ceil(item.in_bytes / 1024);
};

// 获取端口流量数据
const getPortTraffic = async () => {
  const res = await apiGetPortTraffic();
  const ports = res.ports;
  const traffics = res.data.map((item) => getAllTraffic(item));
  const out_bytes = res.data.map((item) => getOutTraffic(item));
  const in_bytes = res.data.map((item) => getInTraffic(item));

  setData(res);

  if (chartInstance) {
    chartInstance.setOption({
      xAxis: { data: ports },
      series: [{ data: traffics }, { data: out_bytes }, { data: in_bytes }],
    });
  }
};

const setData = (data) => {
  panels.value = [
    {
      title: "请求总数",
      color: "text-light-blue-500",
      icon: "Switch",
      value: data.total_requests,
      unit: "个",
    },
    {
      title: "入栈总流量",
      color: "text-light-blue-500",
      icon: "Bottom",
      value: data.total_in_bytes / 1024,
      unit: "mb",
    },
    {
      title: "出栈总流量",
      color: "text-violet-500",
      icon: "Top",
      value: data.total_out_bytes / 1024,
      unit: "mb",
    },
    {
      title: "总流量",
      color: "text-fuchsia-500",
      icon: "histogram",
      value: (data.total_in_bytes + data.total_out_bytes) / 1024,
      unit: "mb",
    },
  ];
};

const initChart = () => {
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
        name: "总流量",
        type: "bar",
        itemStyle: {
          color: "#409EFF",
          borderRadius: [4, 4, 0, 0],
        },
        barWidth: "20px",
        data: [],
      },
      {
        name: "出栈流量",
        type: "bar",
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
        },
        barWidth: "20px",
        data: [],
      },
      {
        name: "入栈流量",
        type: "bar",
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
        },
        barWidth: "20px",
        data: [],
      },
    ],
  });

  // 响应式调整图表
  useResizeObserver(chartRef, () => {
    chartInstance?.resize();
  });
};

onMounted(() => {
  // 初始化图标
  initChart();

  getPortTraffic();

  timer.value = setInterval(() => {
    getPortTraffic();
  }, 5 * 1000);
});

onUnmounted(() => {
  clearInterval(timer.value);
});
</script>
  
  <style scoped>
/* 添加必要的样式 */
:deep(.el-card__body) {
  padding: 10px;
}
</style>
  
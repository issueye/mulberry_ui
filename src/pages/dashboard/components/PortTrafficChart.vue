<template>
    <el-card shadow="hover">
        <template #header>
            <span>流量统计</span>
        </template>
        <div ref="chartRef" class="h-[300px]" />
    </el-card>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useResizeObserver } from "@vueuse/core";
import * as echarts from "echarts";
import { apiGetPortHourlyTraffic } from '~/api/query';
import { calcKB } from "~/utils";

const trafficData = ref([]);
const chartRef = ref(null);
let chartInstance = null;
const timer = ref(null);

const getPortTraffic = async () => {
    let res = await apiGetPortHourlyTraffic();

    trafficData.value = res;
    const xAxisData = trafficData.value.map((item) => `${item.Hour}:${item.Minute}`);
    const inTrafficData = trafficData.value.map((item) => calcKB(item.TotalInBytes));
    const outTrafficData = trafficData.value.map((item) => calcKB(item.TotalOutBytes));
    chartInstance?.setOption({
        xAxis: { data: xAxisData },
        series: [
            { data: outTrafficData },
            { data: inTrafficData },
        ],
    });
};

const initChart = () => {
    chartInstance = echarts.init(chartRef.value);
    chartInstance.setOption({
        tooltip: {
            trigger: "axis",
            axisPointer: { type: "shadow" },
        },
        xAxis: {
            type: "category",
            name: "时间",
            data: [],
        },
        yAxis: {
            type: "value",
            name: "流量(KB)",
        },
        series: [
            {
                name: "出栈流量",
                type: "line",
                itemStyle: {
                    borderRadius: [4, 4, 0, 0],
                },
                barWidth: "20px",
                data: [],
            },
            {
                name: "入栈流量",
                type: "line",
                itemStyle: {
                    borderRadius: [4, 4, 0, 0],
                },
                barWidth: "20px",
                data: [],
            },
        ],
    });

    useResizeObserver(chartRef, () => {
        chartInstance?.resize();
    });
};

onMounted(() => {
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
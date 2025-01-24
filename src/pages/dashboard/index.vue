<template>
    <div>
        <el-row :gutter="20">
            <CountCard />
        </el-row>

        <!-- 其他组件 -->
        <IndexNavs />

        <!-- 图表区域 -->
        <el-row :gutter="20" class="mt-5">
            <el-col :span="24">
                <PortTrafficChart />
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import PortTrafficChart from "./components/PortTrafficChart.vue";
import CountCard from './components/count_card.vue';
import IndexNavs from "~/components/IndexNavs.vue";
import { calcSize } from "~/utils"
const panels = ref([]);

const setData = (data) => {

    let in_bytes = calcSize(data.total_in_bytes);
    let out_bytes = calcSize(data.total_out_bytes);
    let total_bytes = calcSize(data.total_in_bytes + data.total_out_bytes);

    // console.log('set - data ->', data);
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
            value: in_bytes.size,
            unit: in_bytes.unit,
        },
        {
            title: "出栈总流量",
            color: "text-violet-500",
            icon: "Top",
            value: out_bytes.size,
            unit: out_bytes.unit,
        },
        {
            title: "总流量",
            color: "text-fuchsia-500",
            icon: "histogram",
            value: total_bytes.size,
            unit: total_bytes.unit,
        },
    ];
};


onMounted(() => { });

onUnmounted(() => { });
</script>

<style scoped>
/* 添加必要的样式 */
:deep(.el-card__body) {
    padding: 10px;
}
</style>
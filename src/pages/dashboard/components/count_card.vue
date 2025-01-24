<template>
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
</template>
<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { apiGetTraffic } from '~/api/query';
import { calcSize } from "~/utils";

const panels = ref([]);
const timer = ref(null);

const getData = () => {
    apiGetTraffic().then((res) => {
        console.log(res);
        setData(res);
    });
}

const setData = (data) => {
    let in_bytes = calcSize(data.total_in_bytes);
    let out_bytes = calcSize(data.total_out_bytes);
    let total_bytes = calcSize(data.total_in_bytes + data.total_out_bytes);

    panels.value = [
        { title: "请求总数", color: "text-light-blue-500", icon: "Switch", value: data.total_requests, unit: "个" },
        { title: "入栈总流量", color: "text-light-blue-500", icon: "Bottom", value: in_bytes.size, unit: in_bytes.unit },
        { title: "出栈总流量", color: "text-violet-500", icon: "Top", value: out_bytes.size, unit: out_bytes.unit },
        { title: "总流量", color: "text-fuchsia-500", icon: "histogram", value: total_bytes.size, unit: total_bytes.unit },
    ];
}

onMounted(() => {
    getData();
    timer.value = setInterval(() => {
        getData();
    }, 5000);
});

onUnmounted(() => {
    clearInterval(timer.value);
});

</script>
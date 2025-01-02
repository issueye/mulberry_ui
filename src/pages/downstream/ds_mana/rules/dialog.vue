<template>
  <!--弹窗-->
  <el-dialog
    v-model="visible"
    :title="dialog.title"
    width="550px"
    @close="handleClose"
    @open="handleOpen"
    :close-on-click-modal="false"
  >
    <el-form
      ref="dataFormRef"
      :model="formData"
      :rules="computedRules"
      label-width="auto"
    >
      <el-form-item label="代理路由" prop="name">
        <el-input v-model="formData.name" placeholder="请输入代理路由" />
      </el-form-item>

      <el-form-item label="目标路由" prop="target_route">
        <el-input
          v-model="formData.target_route"
          placeholder="请输入目标路由"
        />
      </el-form-item>

      <el-form-item label="目标服务" prop="target_id">
        <el-select
          v-model.number="formData.target_id"
          placeholder="请选择目标服务"
        >
          <el-option
            v-for="(item, index) in targetDataList"
            :key="index"
            :label="item.title"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="WS" prop="is_ws">
        <el-switch
          v-model="formData.is_ws"
          :active-value="true"
          :inactive-value="false"
        />
      </el-form-item>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="请求方法" prop="method">
            <el-select
              v-model.number="formData.method"
              placeholder="请选择请求方法"
            >
              <el-option
                v-for="(item, index) in methods"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="端口号" prop="port">
            <el-input
              v-model.number="formData.port"
              :disabled="true"
              placeholder="请输入端口号"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="序号" prop="order">
            <el-input-number
              v-model.number="formData.order"
              controls-position="right"
              placeholder="请输入序号"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="备注">
        <el-input
          v-model="formData.remark"
          placeholder="请输入备注"
          type="textarea"
          :rows="4"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleSubmitClick">确 定</el-button>
        <el-button @click="handleClose">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { apiAddRule, apiUpdateRule } from "~/api/rule";
import { apiGetTargetList } from "~/api/target";
import { reactive, ref, toRefs, computed } from "vue";
import { useProxyStore } from "~/store/proxy";
import { storeToRefs } from "pinia";

const props = defineProps({
  // 操作类型 0:新增 1:编辑
  operationType: {
    type: Number,
    default: 0,
  },
  // 是否显示
  visible: {
    type: Boolean,
    default: false,
  },
  // 获取表单数据
  formData: {
    type: Object,
    default: () => {
      return {
        id: 0, // ID
        port: 0, // 端口号
        target_id: 0, // 目标服务
        target_route: "", // 目标路由
        status: true, // 状态
        name: "", // 名称
        method: "", // 请求方法
        order: 0, // 排序
        is_ws: false, // 是否是WEBSOCKET
        remark: "", // 备注
      };
    },
  },
});

const proxyStore = useProxyStore();
const { methods } = storeToRefs(proxyStore);

const { visible, operationType, formData } = toRefs(props);

const emits = defineEmits(["update:visible", "close"]);
const dataFormRef = ref(null);
const targetDataList = ref([]);

const dialog = reactive({
  title: "",
  loading: false,
});

/**
 * 表单验证规则
 */
const computedRules = computed(() => {
  const rules = {
    name: [{ required: true, message: "请输入名称", trigger: "blur" }],
    method: [{ required: true, message: "请选择请求方法", trigger: "blur" }],
    target_id: [{ required: true, message: "请选择目标服务", trigger: "blur" }],
    target_route: [
      { required: true, message: "请输入目标路由", trigger: "blur" },
    ],
    port: [{ required: true, message: "请输入端口号", trigger: "blur" }],
  };
  return rules;
});

/**
 * 关闭弹窗
 */
const handleClose = () => {
  emits("update:visible", false);
  emits("close");
};

const handleOpen = () => {
  switch (operationType.value) {
    case 0:
      dialog.title = "新增转发规则信息";
      dataFormRef.value.clearValidate();
      break;
    case 1:
      dialog.title = "编辑转发规则信息";
      break;
  }

  getTargetList();
};

/**
 * 提交表单按钮
 */
const handleSubmitClick = () => {
  dataFormRef.value.validate(async (isValid) => {
    if (isValid) {
      switch (operationType.value) {
        case 0:
          await addData();
          break;
        case 1:
          await editData();
          break;
      }
      emits("update:visible", false);
    }
  });
};

const getTargetList = async () => {
  let res = await apiGetTargetList();
  targetDataList.value = res.list;
};

/**
 * 新增数据
 */
const addData = async () => {
  try {
    dialog.loading = true;
    // 接口调用
    await apiAddRule(formData.value);
    dialog.loading = false;
    toast("新增转发规则信息成功");
  } catch (error) {}
};

/**
 * 修改数据
 */
const editData = async () => {
  try {
    dialog.loading = true;
    // 接口调用
    await apiUpdateRule(formData.value);
    dialog.loading = false;
    toast("修改转发规则信息成功");
  } catch (error) {}
};
</script>
<template>
  <div class="w-full h-full">
    <div class="search-bar">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="关键字" prop="keywords" label-position="left">
          <el-input
            v-model="queryParams.keywords"
            placeholder="名称/编码"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search" @click="handleQuery"
            >搜索</el-button
          >
          <el-button icon="refresh" @click="handleResetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="grow flex flex-col">
      <div class="mb-[10px]">
        <el-button
          type="success"
          :disabled="indexPort === 0"
          icon="plus"
          @click="handleAddClick"
          >新增</el-button
        >
      </div>

      <div class="grow w-full">
        <d-table
          :columns="columns"
          :table-data="pageList"
          :page-config="pageConfig"
          usePagination
          highlight-current-row
          stripe
          :loading="loading"
          empty-text="暂无数据"
        >
          <template #use_version_route="{ scope }">
            <el-tag
              :type="scope.row.use_version_route ? 'success' : 'danger'"
              size="small"
            >
              {{ scope.row.use_version_route ? "使用" : "未使用" }}
            </el-tag>
          </template>
          <template #status="{ scope }">
            <el-tag
              :type="scope.row.status ? 'success' : 'danger'"
              size="small"
            >
              {{ scope.row.status ? "启用" : "停用" }}
            </el-tag>
          </template>
          <template #operation="{ scope }">
            <el-button type="primary" link @click="handleEditClick(scope.row)"
              >编辑</el-button
            >
            <el-divider direction="vertical" />
            <el-button
              type="primary"
              link
              @click="handleModifyStatusClick(scope.row)"
              >{{ scope.row.status ? "停用" : "启用" }}</el-button
            >
            <el-divider direction="vertical" />
            <el-dropdown @command="handleCommand">
              <span class="flex items-center text-[--el-color-primary]">
                更多<el-icon class="el-icon--right"><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    :command="{ data: scope.row, type: 'upload' }"
                    >上传</el-dropdown-item
                  >
                  <el-dropdown-item :command="{ data: scope.row, type: 'copy' }"
                    >复制</el-dropdown-item
                  >
                  <el-dropdown-item
                    :command="{ data: scope.row, type: 'del' }"
                    class="text-[--el-color-danger]"
                    >删除</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </d-table>
      </div>
    </div>

    <Dialog
      v-model:visible="dialog.visible"
      v-model:form-data="formData"
      :operation-type="operationType"
      @close="handleDialogClose"
    />

    <UploadDialog
      v-model:visible="dialog.upload_visible"
      v-model:form-data="formData"
    />
  </div>
</template>

<script setup>
import { apiGetPageList, apiDeletePage, apiModifyStatusPage } from "~/api/page";
import { ref, reactive, onMounted } from "vue";
import Dialog from "./dialog.vue";
import UploadDialog from "./upload_dialog.vue";
import { toast } from "~/composables/util";
import { storeToRefs } from "pinia";
import { useProxyStore } from "~/store/proxy";
import { nanoid } from "nanoid";
import { copyText } from "vue3-clipboard";

const dialog = reactive({
  visible: false,
  upload_visible: false,
});

const proxyStore = useProxyStore();
const { selectPort, indexPort, pageList } = storeToRefs(proxyStore);

const queryFormRef = ref(null);
const queryParams = reactive({
  keywords: "",
  port: selectPort.value,
});

const loading = ref(false);
const operationType = ref(0); // 0:新增 1:编辑

/**
 * 表格信息
 */
const columns = [
  {
    prop: "title",
    label: "标题",
    attrs: { width: 200, showOverflowTooltip: true },
  },
  {
    prop: "name",
    label: "名称",
    attrs: { width: 200, showOverflowTooltip: true, fixed: "left" },
  },
  {
    prop: "version",
    label: "版本",
    attrs: { width: 150, showOverflowTooltip: true },
  },
  {
    prop: "product_code",
    label: "产品编码",
    attrs: { width: 250, showOverflowTooltip: true },
  },
  {
    prop: "remark",
    label: "备注",
    attrs: { minWidth: 150, showOverflowTooltip: true },
  },
  {
    prop: "status",
    label: "状态",
    slot: true,
    attrs: { width: 70, fixed: "right" },
  },
  {
    prop: "operation",
    label: "操作",
    slot: true,
    attrs: { width: 180, fixed: "right" },
  },
];

const formData = reactive({
  id: 0, // ID
  name: "", // 名称
  title: "", // 标题
  version: "", // 版本号
  port: 0, // 端口号
  product_code: "", // 产品编码
  use_version_route: false, // 是否使用版本路由
  status: false, // 状态
  remark: "", // 备注
});

/**
 * 分页查询
 */
const pageConfig = reactive({
  pageSize: 10,
  currentPage: 1,
  total: 0,
});

/**
 * 查询
 */
const handleQuery = () => {
  getData();
};

/**
 * 重置查询
 */
const handleResetQuery = () => {
  queryFormRef.value.resetFields();
  pageConfig.currentPage = 1;
  handleQuery();
};

/**
 * 新增
 */
const handleAddClick = () => {
  operationType.value = 0;
  if (selectPort.port <= 0) toast("请选择端口号", "error");
  resetValue();
  dialog.visible = true;
};

/**
 * 修改信息
 * @param value 信息
 */
const handleEditClick = (value) => {
  operationType.value = 1;
  setValue(value);
  dialog.visible = true;
};

const setValue = (value) => {
  formData.id = value.id;
  formData.name = value.name;
  formData.title = value.title;
  formData.version = value.version;
  formData.port = value.port;
  formData.product_code = value.product_code;
  formData.use_version_route = value.use_version_route;
  formData.status = value.status;
  formData.remark = value.remark;
};

const resetValue = () => {
  formData.id = 0;
  formData.name = "";
  formData.title = "";
  formData.version = "";
  formData.port = selectPort.value;
  formData.product_code = nanoid();
  formData.use_version_route = 0;
  formData.status = false;
  formData.remark = "";
};

/**
 * 修改状态
 * @param value 信息
 */
const handleModifyStatusClick = async (value) => {
  try {
    loading.value = true;
    await apiModifyStatusPage(value.id);
    toast("更新状态成功");
    getData();
  } catch (error) {
    toast("更新状态失败", "error");
  } finally {
    loading.value = false;
  }
};

const handleDeleteClick = async (value) => {
  try {
    loading.value = true;
    await apiDeletePage(value.id);
    loading.value = false;
    toast("删除成功");
    getData();
  } catch (error) {
    toast("更新状态失败", "error");
  } finally {
    loading.value = false;
  }
};

/**
 * 上传
 * @param value
 */
const handleUploadClick = (value) => {
  setValue(value);
  dialog.upload_visible = true;
};

/**
 * 复制
 * @param value
 */
const handleCopyClick = (data) => {
  console.log("value", data);
  let port = data.port;
  let name = data.name;
  let use_version_route = data.use_version_route;
  if (use_version_route) {
    name = `${data.version}/${name}`;
  }

  let str = "";
  if (port === 80) {
    str = `http://${location.hostname}/${name}/`;
  } else {
    str = `http://${location.hostname}:${port}/${name}/`;
  }

  copyText(str, undefined, () => {
    toast("复制成功");
  });
};

const handleCommand = ({ data, type }) => {
  switch (type) {
    case "del":
      handleDeleteClick(data);
      break;
    case "upload":
      handleUploadClick(data);
      break;
    case "copy":
      handleCopyClick(data);
  }
};

const handleDialogClose = () => {
  getData();
};

/**
 * 查询数据
 */
const getData = async () => {
  let params = {
    pageNum: pageConfig.currentPage,
    pageSize: pageConfig.pageSize,
    condition: queryParams,
  };

  loading.value = true;
  let res = await apiGetPageList(params);
  loading.value = false;

  pageList.value = res.list;
  pageConfig.total = res.total;
};

onMounted(() => {
  getData();
});
</script>
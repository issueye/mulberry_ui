import axios from '~/axios';

// apiGetGzipFilterList
// 获取GZIP过滤信息列表
export function apiGetGzipFilterList(data) {
    return axios.post('/api/v1/gzip_filter/list', data);
}

// apiAddGzipFilter
// 添加GZIP过滤信息
export function apiAddGzipFilter(data) {
    return axios.post('/api/v1/gzip_filter', data);
}

// apiUpdateGzipFilter
// 更新GZIP过滤信息
export function apiUpdateGzipFilter(data) {
    return axios.put('/api/v1/gzip_filter', data);
}

// apiDeleteGzipFilter
// 删除GZIP过滤信息
export function apiDeleteGzipFilter(id) {
    return axios.delete(`/api/v1/gzip_filter/${id}`);
}

export function apiModifyStatusGzipFilter(id) {
    return axios.put(`/api/v1/gzip_filter/status/${id}`)
}
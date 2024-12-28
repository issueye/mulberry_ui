import axios from '~/axios';

// apiGetPageList
// 获取页面信息列表
export function apiGetPageList(data) {
    return axios.post('/api/v1/page/list', data);
}

// apiAddPage
// 添加页面信息
export function apiAddPage(data) {
    return axios.post('/api/v1/page', data);
}

// apiUpdatePage
// 更新页面信息
export function apiUpdatePage(data) {
    return axios.put('/api/v1/page', data);
}

// apiDeletePage
// 删除页面信息
export function apiDeletePage(id) {
    return axios.delete(`/api/v1/page/${id}`);
}

export function apiSaveVersion(data) {
    return axios.post('/api/v1/page/save_version', data)
}

export function apiGetTrafficMessages(data) {
    return axios.post('/api/v1/proxy/traffic_messages', data)
}

export function apiModifyStatusPage(id) {
    return axios.put(`/api/v1/page/status/${id}`)
}

export function apiGetVersionList(id) {
    return axios.get(`/api/v1/page/version/${id}`)
}
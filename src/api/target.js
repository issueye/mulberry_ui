import axios from '~/axios';

// apiGetTargetList
// 获取目标服务信息列表
export function apiGetTargetList(data) {
    return axios.post('/api/v1/target/list', data);
}

// apiAddTarget
// 添加目标服务信息
export function apiAddTarget(data) {
    return axios.post('/api/v1/target', data);
}

// apiUpdateTarget
// 更新目标服务信息
export function apiUpdateTarget(data) {
    return axios.put('/api/v1/target', data);
}

// apiDeleteTarget
// 删除目标服务信息
export function apiDeleteTarget(id) {
    return axios.delete(`/api/v1/target/${id}`);
}

export function apiModifyStatusTarget(id) {
    return axios.put(`/api/v1/target/status/${id}`);
}
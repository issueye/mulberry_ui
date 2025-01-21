import axios from '~/axios';

// apiGetPortList
// 获取端口号信息列表
export function apiGetPortList(data) {
    return axios.post('/api/v1/port/list', data);
}

// apiAddPort
// 添加端口号信息
export function apiAddPort(data) {
    return axios.post('/api/v1/port', data);
}

// apiUpdatePort
// 更新端口号信息
export function apiUpdatePort(data) {
    return axios.put('/api/v1/port', data);
}

// apiDeletePort
// 删除端口号信息
export function apiDeletePort(id) {
    return axios.delete(`/api/v1/port/${id}`);
}

// apiStartPort
// 开启端口号监听
export function apiStartPort(port) {
    return axios.put(`/api/v1/port/start/${port}`);
}

// apiStopPort
// 停止端口号监听
export function apiStopPort(port) {
    return axios.put(`/api/v1/port/stop/${port}`);
}

// apiReloadPort
// 重启端口号监听
export function apiReloadPort(port) {
    return axios.put(`/api/v1/port/reload/${port}`);
}

export function apiModifyUseGZ(port) {
    return axios.put(`/api/v1/port/use_gz/${port}`);
}

// apiGetPortTraffic
// 获取端口流量统计
export function apiGetPortTraffic() {
    return axios.get('/api/v1/proxy/port_statistics');
}
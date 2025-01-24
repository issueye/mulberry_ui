import axios from '~/axios';

// apiGetPortTraffic
// 获取端口流量统计
export function apiGetTraffic() {
    return axios.get('/api/v1/proxy/statistics');
}

// hourly_traffic
// 获取端口小时流量统计
export function apiGetPortHourlyTraffic() {
    return axios.get(`/api/v1/proxy/hourly_traffic`);
}
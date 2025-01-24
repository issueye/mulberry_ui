export function flatten(arr) {
    while (arr.some((item) => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}

// MB 计算
export function calcMB(size) {
    return Math.ceil(size / (1024 * 1024));
}

// KB 计算
export function calcKB(size) {
    return Math.ceil(size / 1024);
}

// 如果小于 1MB 则显示 KB，否则显示 MB
export function calcSize(size) {
    if (size < (1024 * 1024)) {
        return {
            size: calcKB(size),
            unit: "KB",
        };
    }

    return {
        size: calcMB(size),
        unit: "MB",
    };
}
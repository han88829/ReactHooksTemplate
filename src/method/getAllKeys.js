/*
*  根据传入的key，在data中拿出所有key的夫级包括key，返回一个数组
*/

const getAllKeys = (data = [], key, name = "") => {
    let keys = [];
    data.forEach(item => {
        if (item.name === key) {
            keys = name ? [item[name]] : [item];

        } else if (item.childrens && item.name !== key) {
            const returnKey = getAllKeys(item.childrens || [], key, name);
            if (returnKey && returnKey.length > 0) {
                keys = [name ? [item[name]] : item, ...returnKey];
            }
        }
    });
    return keys;
};
/*
* data:[] 源数据
* name： string 字段名 以name对比数据
* value ： name对应的value，value相同则提取数据
* key   想要返回来的数据字段名，不指定则对象全部返回
*/
const getCustomData = (data = [], name = "", value = "", key = "") => {
    let keys = [];
    let path = value;

    // 如果路由存在参数，则去除数字进行匹配
    if (key === 'path' && value.replace(/[^\d]/g, '').toString()) {
        path = value.split('/').splice(value.split('/').length - 1, 1).join('/');
    }

    data.forEach(item => {
        if (item[name] === value || (item[name].includes(path) && key === 'path')) {
            keys = key ? [item[key]] : [item];
        } else if (item.childrens && item[name] !== value) {
            const returnKey = getCustomData(item.childrens || [], name, value, key);
            if (returnKey && returnKey.length > 0) {
                keys = [key ? [item[key]] : item, ...returnKey];
            }
        }
    });
    return keys;
}

export default getAllKeys;
export { getCustomData };
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
                keys = [name ? [item[name]] : [item], ...returnKey];
            }
        }
    });
    return keys;
};

export default getAllKeys;
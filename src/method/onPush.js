/*
*  路由跳转，修改面包屑
*/

import getAllKeys from "./getAllKeys";
import routerData from "../config/router.config";

const onPush = (props, key) => {
    const data = getAllKeys(routerData, key) || [];
    const item = data[data.length - 1];

    props.history.push(item.path);
};

export default onPush;
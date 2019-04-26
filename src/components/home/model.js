import { action } from 'easy-peasy';
import routeData from "../../config/router.config";

const getAllKeys = (data = [], key) => {
    let keys = [];
    data.forEach(item => {
        if (item.name === key) {
            keys = [item.name];

        } else if (item.childrens && item.name !== key) {
            const returnKey = getAllKeys(item.childrens || [], key);
            if (returnKey && returnKey.length > 0) {
                keys = [item.name, ...returnKey];
            }
        }
    });
    return keys;
}

const store = {
    collapsed: false,
    setCollapsed: action((state, value) => ({ ...state, collapsed: value })),

    selectedKeys: [],
    openKeys: [],
    onOpenKeys: action((state, openKeys) => {
        try {
            const latestOpenKey = openKeys[openKeys.length - 1];
            state.openKeys = getAllKeys([...routeData], latestOpenKey);
        } catch (error) {
            console.log(error);
        }

    }),
    onSelectedKeys: action((state, selectedKeys) => ({ ...state, selectedKeys })),
}

export default store;
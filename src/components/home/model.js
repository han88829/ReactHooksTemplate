import { action } from 'easy-peasy';
import routeData from "../../config/router.config";
import getAllKeys from "../../method/getAllKeys";

const store = {
    collapsed: false,
    setCollapsed: action((state, value) => ({ ...state, collapsed: value })),

    selectedKeys: [],
    openKeys: [],
    onOpenKeys: action((state, openKeys) => {
        try {
            const latestOpenKey = openKeys[openKeys.length - 1];
            state.openKeys = getAllKeys([...routeData], latestOpenKey, 'name');
        } catch (error) {
            console.log(error);
        }
    }),
    onSelectedKeys: action((state, selectedKeys) => {
        return ({ ...state, selectedKeys })
    }),
}

export default store;
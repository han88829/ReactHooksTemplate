import { action } from 'easy-peasy';
import routeData from "../../config/router.config";
import { getAllKeys, getCustomData } from "../../method";

const store = {
    collapsed: false,
    setCollapsed: action((state, value) => ({ ...state, collapsed: value })),
    breadcrumb: [],
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
    onPush: action((state, { props, key }) => {
        const data = getAllKeys(routeData, key) || [];
        const item = data[data.length - 1] || {};
        const breadcrumb = data.map(x => ({ name: x.name, path: x.path }));
        props.history.push(item.path);
        state.breadcrumb = breadcrumb;
    }),
    initBreadcrumb: action((state, { url, number }) => {
        const data = getCustomData(routeData, 'path', url);
        state.breadcrumb = data.map(item => ({ name: item.name, path: item.path }));
        state.selectedKeys = [(data[data.length - 1] || {}).name];
        state.openKeys = data.map(item => item.name);
    })
}

export default store;
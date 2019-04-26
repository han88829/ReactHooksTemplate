import React, { useEffect } from "react";
import { Layout, Menu, Icon, } from 'antd';
import { useStore, useActions } from 'easy-peasy';
import routeData from "../../config/router.config";
import './menu.scss';

const { Sider, } = Layout;
const SubMenu = Menu.SubMenu;

export default () => {

    useEffect(() => {
        // console.log(routeData);
    });

    const state = useStore(state => state.home);
    const actions = useActions(actions => actions.home);
    const { collapsed, selectedKeys, openKeys } = state;
    const { setCollapsed, onOpenKeys, onSelectedKeys } = actions;

    const getMenu = (data = [], key = 1) => {
        const html = data.map((item, index) => {
            if ((item.childrens || []).some(child => !child.noMenuRequired) && !item.noMenuRequired) {
                return (
                    <SubMenu
                        key={item.name}
                        title={<span>
                            {item.icon ? <Icon type={item.icon} /> : <img src={item.iconImg} alt="" className="menu-iconImg" />}
                            <span style={{ opacity: collapsed && key === 1 && 0 }} >{item.name}</span>
                        </span>
                        }
                    >
                        {getMenu(item.childrens, ++key)}
                    </SubMenu>
                )
            } else if (!item.noMenuRequired) {
                return (
                    <Menu.Item key={item.name} title={item.name}>
                        {item.icon ? <Icon type={item.icon} /> : <img src={item.iconImg} alt="" className="menu-iconImg" />}
                        <span style={{ opacity: collapsed && key === 1 && 0 }} >{item.name}</span>
                    </Menu.Item >
                )
            }
        });
        return html
    }
    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={v => setCollapsed(v)}
        >
            <div className="menu-logo" />
            <Menu
                theme="dark"
                selectedKeys={selectedKeys || []}
                openKeys={openKeys || []}
                mode="inline"
                onClick={(item, key, keyPat) => {
                    onSelectedKeys([item.key]);
                }}
                onSelect={(item, key) => {
                    onSelectedKeys(item.selectedKeys);
                }}
                onOpenChange={onOpenKeys}
            >
                {getMenu(routeData, 1)}
            </Menu>
        </Sider>
    )
}

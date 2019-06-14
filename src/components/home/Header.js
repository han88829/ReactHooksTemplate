import React from "react";
import { Layout, Icon } from 'antd';
import { useStore, useActions } from "easy-peasy";
import User from "@pages/user";

const { Header } = Layout;

export default (props) => {
    const collapsed = useStore(state => state.home.collapsed);
    const setCollapsed = useActions(actions => actions.home.setCollapsed);
    return (
        <Header style={{ background: '#fff', padding: 0 }} >
            <Icon
                className="trigger"
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={() => setCollapsed(!collapsed)}
            />
            <User  {...props} />
        </Header>
    )
}
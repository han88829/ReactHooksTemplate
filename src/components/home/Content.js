import React from "react";
import { Layout, Breadcrumb } from 'antd';
import { Route } from "react-router-dom";
import { useStore } from "easy-peasy";

import App from "../app";

const { Content } = Layout;

export default () => {
    const data = useStore(state => state.home.breadcrumb) || [];
    return (
        <Content style={{ margin: '0 16px', marginBottom: 16 }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                {data.map(item => {
                    return <Breadcrumb.Item key={item.name}>{item.name}</Breadcrumb.Item>
                })}
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                <Route path="/" component={App} />
            </div>
        </Content>
    )
}
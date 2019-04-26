import React from "react";
import { Layout, Breadcrumb } from 'antd';
import { Route } from "react-router-dom";

import App from "../app";

const { Content } = Layout;

export default () => {
    return (
        <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                <Route path="/" component={App} />
            </div>
        </Content>
    )
}
import React, { useEffect } from "react";
import { Layout } from 'antd';

import Menu from "./menu";
import Header from "./Header";
import Content from "./Content";

export default (props) => {
    return (
        <Layout style={{ minHeight: '100vh' }} className="home">
            <Menu  {...props} />
            <Layout>
                <Header />
                <Content />
            </Layout>
        </Layout>
    )
}
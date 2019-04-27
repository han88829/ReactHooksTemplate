import React, { useEffect } from "react";
import { Layout } from 'antd';
import { useActions } from "easy-peasy";

import Menu from "./menu";
import Header from "./Header";
import Content from "./Content";

export default (props) => {
    const initBreadcrumb = useActions(actions => actions.home.initBreadcrumb);
    useEffect(() => {
        const url = window.location.pathname;
        const number = url.replace(/[^\d]/g, '');
        initBreadcrumb({ url, number })
    }, []);
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
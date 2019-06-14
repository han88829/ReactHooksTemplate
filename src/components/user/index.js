import React, { useState, useEffect } from "react";
import { useStore, useActions } from "easy-peasy";
import { Menu, Dropdown, Icon } from 'antd';
import "./index.scss";

import user_img from "@assets/user/user.png";

export default (props) => {
    const { user } = useStore(state => state.user);
    const { onLogout, getUser } = useActions(action => action.user);
    const { onPush } = useActions(action => action.home);

    useEffect(() => {
        if (!user.name) {
            getUser();
        }
    }, []);

    const menu = (
        <Menu>
            <Menu.Item
                onClick={() => {
                    onPush({ props, key: "个人中心" });
                }}
            >
                <Icon type="user" />
                个人中心
            </Menu.Item>
            <Menu.Item>
                <Icon type="setting" />
                个人设置
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item onClick={onLogout}>
                <Icon type="logout" />
                退出登录
            </Menu.Item>
        </Menu>
    );
    return <div className="header-user">
        <Dropdown overlay={menu}>
            <div className="userInfo">
                <span className="user-img">
                    <img src={user_img} alt="" />
                </span>
                <span>{user.name}</span>
            </div>
        </Dropdown>

    </div>
}
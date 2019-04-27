/*
    配置只支持App下路由，menu下菜单
    path :      路由地址
    component : 引入文件路径，基于app/index.js
    icon:       菜单配置icon，基于home/menu   
    iconImg: icon 自定义图片 优先级低于icon
    name:       名称
    childrens : 子页面配置信息
    authority :  权限
    noMenuRequired : default false   不在菜单中显示请设置 : true
*/

// 用户
import User from "../components/user";
import UserDetail from "../components/user/detail";

// 测试demo
import demo from "../components/demo";

import userImg from '../assets/user/user.png';

export default [
    {
        path: '/user',
        component: User,
        name: "用户",
        icon: "",
        iconImg: userImg,
        childrens: [
            {
                path: '/user/detail',
                component: UserDetail,
                authority: ['admin'],
                name: "用户详情",
                noMenuRequired: true,
                icon: "",
                iconImg: userImg,
            }
        ],
    }, {
        path: '/demo',
        component: demo,
        name: "测试",
        icon: "exception",
        iconImg: "",
    }
];

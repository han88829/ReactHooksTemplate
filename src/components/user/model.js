import { action } from 'easy-peasy';
import { message } from "antd";

const store = {
    user: JSON.parse(sessionStorage.getItem('user') || "{}"),
    getUser: action((state, params = {}) => {
        const user = JSON.parse(sessionStorage.getItem('user') || "{}");
        state.user = user;
    }),
    // 登出
    onLogout: action((state, params) => {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (var i = keys.length; i--;) {
                document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString() + ";path=/";
            }
        }
        sessionStorage.clear();
        message.info('退出成功！');
        window.location.href = '/login';
    })
}

export default store;
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import routeData from "../../config/router.config";

export default () => {
    const user =JSON.parse(sessionStorage.getItem('user') ||"{}");
    const getRoute = (data = []) => {
        let childrens = [];
        let arr = data.map((item, key) => {
            if (item.childrens && item.childrens.length >= 0) {
                childrens = getRoute(item.childrens || [])
            }
            if(!item.authority || item.authority.includes(user.name)){
                return (
                    <Route exact path={item.path} component={item.component} key={item.path} />
                )
            }
           
        });

        return [...arr, ...childrens]
    }

    return (
        <Switch>
            {getRoute(routeData).map(x => x)}

            {/* 重定向路由 */}
            {/* {<Redirect from="/" to="/app" />} */}
        </Switch>
    )
}

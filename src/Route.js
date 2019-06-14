import React from 'react';
import { BrowserRouter as Router, Route, Switch ,Redirect} from 'react-router-dom';
import home from "./components/home";
import Login from "./components/login";

function App() {
  const user =JSON.parse(sessionStorage.getItem('user') ||"{}");
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/"   component={home} />

            {/*  重定向路由 */}
            <Redirect from="/" to={user.name?'/':'/logon'} />
      </Switch>
    </Router>
  );
}

export default App;

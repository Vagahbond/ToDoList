import React from 'react';
import {
  Switch,
  Route,
  Link,
  withRouter,
} from 'react-router-dom';

import { Layout, Menu } from 'antd';

import './App.css'

import CreateTodo from '../components/CreateTodo/CreateTodo'
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import About from './About/About';
import Signup from './Signup/Signup';


class App extends React.Component {
  routes = [
    { name: 'Todolists', to: "/" },
    { name: 'Signup', to: "/signup" },
    { name: 'Login', to: "/login" },
    { name: 'About', to: "/about" },
  ]

  render() {
    const activated_routes = this.routes.reduce((acc, route, i) => {
      if (route.to === this.props.location.pathname) {
        acc.push(i.toString());
      }

      return acc;
    }, []);

    return (
      <Layout>
        <Layout.Header>
          <Menu theme="dark" mode="horizontal" selectedKeys={activated_routes}>
            {this.routes.map((route, i) => (
              <Menu.Item key={i.toString()}>
                <Link to={route.to}>{route.name}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Layout.Header>
        <Layout.Content className="layout-content">
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
          </Switch>
        </Layout.Content>
        <CreateTodo />
        <Layout.Footer style={{ textAlign: 'center' }}>Yoni Firroloni & Nathanael Demacon ©2020</Layout.Footer>
      </Layout>
    );
  }
}

export default withRouter(App);

import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Input, Row, Col, Button, PageHeader, Form, Alert } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';

import * as api from '../../utils/api'

class Login extends React.Component {
  state = {
    error: null,
  }

  onLogin = async (values) => {
    try {
      const { data } = await api.request('POST', '/login', values);

      api.setToken(data.token);
      this.props.history.push('/');
    } catch ({ response: { data } }) {
      this.setState({
        error: data.error,
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <PageHeader title="Login" />

        <Row>
          <Col span={6} offset={9}>
            <Form onFinish={this.onLogin}>
              <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input type="email" prefix={<UserOutlined />} placeholder="Email" />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password prefix={<MailOutlined />} placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <Row justify="space-between">
                  <Col>
                    <Link to="/signup">Create an account.</Link>
                  </Col>
                  <Col>
                    <Button type="primary" htmlType="submit">Login</Button>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item hidden={!this.state.error}>
                <Alert
                  message="Error"
                  description={this.state.error}
                  type="error"
                  showIcon
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </React.Fragment >
    )
  }
}

export default withRouter(Login)

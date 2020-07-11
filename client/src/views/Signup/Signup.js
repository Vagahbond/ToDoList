import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import { Input, Row, Col, Button, PageHeader, Form, Alert } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, CalendarOutlined } from '@ant-design/icons';

import * as api from '../../utils/api'

class Signup extends React.Component {
  state = {
    error: null,
  }

  onSignup = async (values) => {
    try {
      await api.request('POST', '/signup', values);
      this.props.history.push('/login');
    } catch ({ response: { data } }) {
      this.setState({
        error: data.error,
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <PageHeader title="Signup" />
        <Row>
          <Col span={6} offset={9}>
            <Form onFinish={this.onSignup}>
              <Form.Item name="firstname" rules={[{ required: true, message: 'Please input your firstname!' }]}>
                <Input prefix={<UserOutlined />} placeholder="Firstname" />
              </Form.Item>
              <Form.Item name="lastname" rules={[{ required: true, message: 'Please input your lastname!' }]}>
                <Input prefix={<UserOutlined />} placeholder="Lastname" />
              </Form.Item>
              <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input type="email" prefix={<MailOutlined />} placeholder="Email" />
              </Form.Item>
              <Form.Item name="birthdate" rules={[{ required: true, message: 'Please input your birthdate!' }]}>
                <Input type="date" prefix={<CalendarOutlined />} placeholder="Birthdate" />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, min: 8, max: 40, message: 'Please input your password!' }]}>
                <Input.Password prefix={<LockOutlined />} placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <Row justify="space-between">
                  <Col>
                    <Link to="/login">Login to an existing account.</Link>
                  </Col>
                  <Col>
                    <Button type="primary" htmlType="submit">Signup</Button>
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

export default withRouter(Signup);

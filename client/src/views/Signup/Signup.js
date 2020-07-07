import React from 'react';

import { Input, Row, Col, Button, PageHeader, Form } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default class Signup extends React.Component {
  onSignup = values => {
    console.log(values)
  }

  render() {
    return (
      <React.Fragment>
        <PageHeader title="Signup" />
        <Row>
          <Col span={6} offset={9}>
            <Form>
              <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
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
            </Form>
          </Col>
        </Row>
      </React.Fragment >
    )
  }
}
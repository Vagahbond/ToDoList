import React from 'react';

import { Input, Row, Col, Button, Space, PageHeader } from 'antd';
import { Link } from 'react-router-dom';

export default class Signup extends React.Component {
  state = {
    username: '',
    password: '',
  }

  /**
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e 
   */
  changeUsername = e => {
    this.setState({
      username: e.target.value,
    });
  }

  /**
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e 
   */
  changePassword = e => {
    this.setState({
      password: e.target.value,
    });
  }

  render() {
    return (
      <React.Fragment>
        <PageHeader
          title="Signup"
        />
        <Row>
          <Col span={6} offset={9}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Input placeholder="Username" value={this.state.username} onChange={this.changeUsername} />
              <Input placeholder="Password" value={this.state.password} onChange={this.changePassword} />
              <Row justify="space-between">
                <Col>
                  <Link to="/login">Login into an existing account.</Link>
                </Col>
                <Col>
                  <Button>Signup</Button>
                </Col>
              </Row>
            </Space>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}
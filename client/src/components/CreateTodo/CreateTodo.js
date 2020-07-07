import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Button, Space, Input } from 'antd';

import './CreateTodo.css';

export default class CreateTodo extends React.Component {
  state = {
    content: '',
    visible: false,
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
    this.createTodo();
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  createTodo = () => {

    console.log(this.state.content)
  }

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} e 
   */
  onTextChanged = e => {
    this.setState({
      content: e.target.value,
    });
  }

  render() {
    return (
      <div >
        <Button type="primary" className="FAB" shape="circle" icon={<PlusOutlined />} size="large" onClick={this.showModal} />
        <Modal
          title="Create Todo : "
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Input.TextArea value={this.state.content} onChange={this.onTextChanged} />
          </Space>
        </Modal>
      </div>
    );
  }
}

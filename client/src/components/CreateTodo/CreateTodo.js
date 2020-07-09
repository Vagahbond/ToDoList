import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Button, Space, Input, Popover } from 'antd';

import './CreateTodo.css';

import * as api from '../../utils/api';

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

  createTodo = async () => {
    console.log(this.state.content)

    const values = {
      content: this.state.content,
    }

    const { data } = await api.request('POST', '/todolist', values);

    if (data?.error) {
      this.setState({
        error: data.error,
      });
    } else {
      console.log("Created todo!")
    }
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
    const content = (
      <div>
        <p>Create a new Todo Item</p>
      </div>
    );

    return (
      <div >
        <Popover content={content} title="Create" trigger="hover">
          <Button type="primary" className="FAB" shape="circle" icon={<PlusOutlined />} size="large" onClick={this.showModal} />
        </Popover>
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

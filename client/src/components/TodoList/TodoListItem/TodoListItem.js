import React from 'react';
import PropTypes from 'prop-types';

import { List, Input, Checkbox, Button, Form } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import * as api from '../../../utils/api';

export default class TodoListItem extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    content: PropTypes.string,
    creation_date: PropTypes.string,
    checked: PropTypes.bool,
  }

  state = {
    content: PropTypes.string,
    checked: false,
    editing: false,
  }

  constructor(props) {
    super(props);

    this.state.content = props.content;
    this.state.checked = props.checked;
  }

  componentDidMount() {
    console.log('PROPS', this.props)
  }

  onDelete = async (e) => {
    await this.deleteItem();
  }

  /**
   * @param {import('antd/lib/checkbox').CheckboxChangeEvent} e 
   */
  onCheckChange = async (e) => {
    this.setState({
      checked: e.target.checked,
    }, async () => {
      await this.updateItem();
    });
  }

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} e 
   */
  onContentChange = (e) => {
    this.setState({
      content: e.target.value,
    });
  }



  startEditing = (e) => {
    this.setState({
      editing: true,
    });
  }

  onEditConfirmed = async (e) => {
    this.setState({
      editing: false,
    }, async () => {
      await this.updateItem()
      this.props.refreshCallback()
    });
  }

  async deleteItem() {
    try {
      await api.request('DELETE', `/todolist/${this.props.id}`);

      console.log("Deleted todo!")
      this.props.refreshCallback()
    } catch ({ response: { data } }) {
      this.setState({
        error: data.error,
      });
    }

  }

  async updateItem() {
    const values = {
      content: this.state.content,
      checked: this.state.checked,
    }

    try {
      await api.request('PUT', `/todolist/${this.props.id}`, values);

      console.log("Updated todo!")
      this.props.refreshCallback()
    } catch ({ response: { data } }) {
      this.setState({
        error: data.error,
      });
    }
  }

  render() {
    return (
      <List.Item>
        <Checkbox checked={this.state.checked} onChange={this.onCheckChange} />
        <Form
          style={{
            display: this.state.editing ? '' : 'none',
            marginLeft: '22px',
            marginRight: '22px',
            width: '100%',
          }}
          layout="inline"
          onFinish={this.onEditConfirmed}
        >
          <Form.Item
            style={{
              width: '100%',
            }}
          >
            <Input
              placeholder="Todo content"
              value={this.state.content}
              onChange={this.onContentChange}
            />
          </Form.Item>
          <Form.Item hidden>
            <Button htmlType="submit"></Button>
          </Form.Item>
        </Form>
        <div
          style={{
            cursor: 'pointer',
            display: this.state.editing ? 'none' : '',
            marginLeft: '22px',
            marginRight: '22px',
            padding: '4px 12px',
            width: '100%',
          }}
          onClick={this.startEditing}
        >{this.state.content}</div>
        <Button type="link" shape="circle" icon={<CloseOutlined />} size="middle" danger={true} onClick={this.onDelete} />
      </List.Item>
    );
  }
}

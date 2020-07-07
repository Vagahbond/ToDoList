import React from 'react';
import PropTypes from 'prop-types';

import { List, Input, Checkbox, Button, Form } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

export default class TodoListItem extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  }

  state = {
    name: '',
    checked: false,
    editing: false,
  }

  constructor(props) {
    super(props);

    this.state.name = props.name;
    this.state.checked = props.checked;
  }

  onDelete = (e) => {
    console.log("Deleting " + this.props.name);
  }

  /**
   * @param {import('antd/lib/checkbox').CheckboxChangeEvent} e 
   */
  onCheckChange = (e) => {
    this.setState({
      checked: e.target.checked,
    });
  }

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} e 
   */
  onNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  }

  startEditing = (e) => {
    this.setState({
      editing: true,
    });
  }

  onEditConfirmed = (e) => {
    console.log(this.props.name)
    this.setState({
      editing: false,
    });
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
              placeholder="Todo name"
              value={this.state.name}
              onChange={this.onNameChange}
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
        >{this.state.name}</div>
        <Button type="link" shape="circle" icon={<CloseOutlined />} size="middle" danger={true} onClick={this.onDelete} />
      </List.Item>
    );
  }
}

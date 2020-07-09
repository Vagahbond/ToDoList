import React from 'react';

import * as api from '../../utils/api'

import { List, PageHeader } from 'antd';

import TodoListItem from './TodoListItem/TodoListItem';

export default class TodoList extends React.Component {
  state = {
    items: [],
  }

  async componentDidMount() {
    const { data } = await api.request('GET', '/todolist');
    
    this.setState({
      items: data.items,
    });

    console.log(data)
  }

  render() {
    return (
      <React.Fragment>
        <PageHeader
          title="Dashboard"
          subTitle="Todolists"
        />
        <List
          size="large"
          bordered
          dataSource={this.state.items}
          renderItem={todo => (
            <TodoListItem {...todo} />
          )}
        />
      </React.Fragment>
    );
  }
}

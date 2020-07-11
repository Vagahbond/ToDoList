import React from 'react';

import * as api from '../../utils/api'

import { List, PageHeader } from 'antd';

import TodoListItem from './TodoListItem/TodoListItem';

export default class TodoList extends React.Component {
  state = {
    items: [],
  }

   async refreshItems() {
    const { data } = await api.request('GET', '/todolist');
    
    this.setState({
      items: data.items,
    });

    console.log(data)
  }

  async componentDidMount() {
    await this.refreshItems()
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

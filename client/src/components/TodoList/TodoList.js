import React from 'react';

import * as api from '../../utils/api'

import { List, PageHeader } from 'antd';

import TodoListItem from './TodoListItem/TodoListItem';

export default class TodoList extends React.Component {
  state = {
    items: [],
  }

  refreshItems = async () => {
    try {
      const { data } = await api.request('GET', '/todolist');

      console.log(data)

      /**
       * `this.state.items` needs to be emptied before reassigned because of... reasons.
       */
      this.state.items = [];
      this.forceUpdate(() => {
        this.setState({
          items: data.items
        });
      });
    } catch ({ response: { data } }) {
      this.setState({
        error: data.error,
      });
    }
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
            <TodoListItem {...todo}
              refreshCallback={this.refreshItems} />
          )}
        />
      </React.Fragment>
    );
  }
}

import React from 'react';
import PropTypes from 'prop-types'

import { List, PageHeader } from 'antd';

import TodoListItem from './TodoListItem/TodoListItem';

export default class TodoList extends React.Component {
  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
    })),
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
          dataSource={this.props.todos}
          renderItem={todo => (
            <TodoListItem name={todo.name} />
          )}
        />
      </React.Fragment>
    );
  }
}

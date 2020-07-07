import React from 'react';

import TodoList from '../../components/TodoList/TodoList';

export default class Dashboard extends React.Component {
  render() {
    return (
      <TodoList todos={[
        {
          name: 'Yoni doit faire ses devoirs.'
        },
        {
          name: 'Nathanael doit ranger sa chambre.'
        }
      ]} />
    )
  }
}

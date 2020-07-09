import React from 'react';
import { PageHeader } from 'antd';

export default class About extends React.Component {
  render() {
    return (
      <React.Fragment>
        <PageHeader
          title="About"
        />
        This site was created by the almighty sheep and the magic bearded man.
      </React.Fragment>
    )
  }
}

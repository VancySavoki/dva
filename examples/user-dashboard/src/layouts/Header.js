import React from 'react';
import { Menu, Icon } from 'antd';
import Link from 'umi/link';
import withRouter from 'umi/withRouter';

function Header({ location }) {
  return (
    <Menu selectedKeys={[location.pathname]} mode="horizontal" theme="dark">
      <Menu.Item key="/nodes">
        <Link to="/nodes">
          <Icon type="bars" />Nodes
        </Link>
      </Menu.Item>
      <Menu.Item key="/deployments">
        <Link to="/deployments">
          <Icon type="home" />deployments
        </Link>
      </Menu.Item>
      <Menu.Item key="/404">
        <Link to="/page-you-dont-know">
          <Icon type="frown-circle" />404
        </Link>
      </Menu.Item>
    </Menu>
  );
}

export default withRouter(Header);

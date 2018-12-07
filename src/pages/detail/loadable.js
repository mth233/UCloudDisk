import React from 'react';
import Loadable from 'react-loadable';
import { Spin } from 'antd';
const LoadableComponent = Loadable({
  loader: () => import('./'),
  loading() {
  	return (
      <Spin size="large" />
      <div>
        正在加载
      </div>)
  }
});

export default () => <LoadableComponent/>

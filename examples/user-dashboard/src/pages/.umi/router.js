import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import { routerRedux } from 'dva/router';


let Router = DefaultRouter;
const { ConnectedRouter } = routerRedux;
Router = ConnectedRouter;


let routes = [
  {
    "path": "/",
    "component": require('../../layouts/index.js').default,
    "routes": [
      {
        "path": "/deployments",
        "exact": true,
        "component": require('../deployments/page.js').default
      },
      {
        "path": "/",
        "exact": true,
        "component": require('../index.js').default
      },
      {
        "path": "/nodes",
        "exact": true,
        "component": require('../nodes/page.js').default
      },
      {
        "component": () => React.createElement(require('/home/savoki/sdb1/web/dva/examples/user-dashboard/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', routes: '[{"path":"/","component":"./src/layouts/index.js","routes":[{"path":"/deployments","exact":true,"component":"./src/pages/deployments/page.js"},{"path":"/","exact":true,"component":"./src/pages/index.js"},{"path":"/nodes","exact":true,"component":"./src/pages/nodes/page.js"}]}]' })
      }
    ]
  }
];


export default function() {
  return (
<Router history={window.g_history}>
  <Route render={({ location }) =>
    renderRoutes(routes, {}, { location })
  } />
</Router>
  );
}

import { Component } from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';

const app = dva({
  history: window.g_history,
});
window.g_app = app;
app.use(createLoading());
app.use(require('../../plugins/onError.js').default);
app.model({ ...(require('../../pages/deployments/models/deployments.js').default) });
app.model({ ...(require('../../pages/nodes/models/nodes.js').default) });

class DvaContainer extends Component {
  render() {
    app.router(() => this.props.children);
    return app.start()();
  }
}

export default DvaContainer;

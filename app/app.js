import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { HelmetProvider } from 'react-helmet-async';
import history from 'utils/history';
import configureStore from './stores/configureStore';
import { translationMessages } from './translations/i18n';

// Load the favicon and the .htaccess file
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess';

import App from 'containers/app';
import LanguageProvider from 'containers/languageProvider';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { withEb } from 'components/ErrorBoundary';
import 'sanitize.css/sanitize.css';

moment.locale('zh-cn');

const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const ConnectedApp = props => (
  <Provider store={store}>
    <LanguageProvider messages={props.messages}>
      <ConnectedRouter history={history}>
        <HelmetProvider>
          <ConfigProvider locale={zhCN}>
            {withEb(<App />)}
          </ConfigProvider>
        </HelmetProvider>
      </ConnectedRouter>
    </LanguageProvider>
  </Provider>
);

ConnectedApp.propTypes = {
  messages: PropTypes.object,
};

const render = messages => {
  ReactDOM.render(<ConnectedApp messages={messages} />, MOUNT_NODE);
};

if (module.hot) {
  // Hot reloadable translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./translations/i18n'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() =>
      Promise.all([
        import('intl/locale-data/jsonp/en.js'),
        import('intl/locale-data/jsonp/de.js'),
      ]),
    ) // eslint-disable-line prettier/prettier
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}

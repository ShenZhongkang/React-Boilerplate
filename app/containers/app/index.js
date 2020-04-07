import React from 'react';
import { hot } from 'react-hot-loader/root';
import MainRoute from 'components/MainRoute';
import routes from 'routes';
import GlobalStyle from 'global-styles';
import './styles.less';

const App = () => {
  return (
    <div className='fullScreen'>
      <MainRoute routes={routes} />
      <GlobalStyle />
    </div>
  );
};

export default hot(App);
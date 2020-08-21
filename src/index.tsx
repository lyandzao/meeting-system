/**
 * @Author: zao
 * @Date: 2020-05-07 14:28:21
 * @LastEditors: zao
 * @LastEditTime: 2020-08-13 10:21:49
 * @Description:  入口文件
 */
import React from 'react';
import ReactDOM from 'react-dom';

import Router from '@/router';
import request from '@/services/axios/config';
import auth from '@/store/auth';
import systemMsg from '@/store/systemMsg';
import composeContainer from '@/utils/composeContainer';
import { UseAPIProvider } from '@umijs/use-request';

import * as serviceWorker from './serviceWorker';

const Provider = composeContainer(auth, systemMsg)

const App = () => {
  return (
    <UseAPIProvider value={{
      requestMethod: request
    }}>
      <Provider>
        <Router />
      </Provider>
    </UseAPIProvider>

  )
}



ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.register();

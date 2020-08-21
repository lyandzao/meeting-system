/*
 * @Author: zao
 * @Date: 2020-05-07 14:28:32
 * @LastEditors: zao
 * @LastEditTime: 2020-08-13 10:21:25
 * @Description:  app
 */
import '@/styles/global.scss';

import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import RenderRoutes from '@/components/commons/RenderRoutes';
import {
  useAuth,
} from '@/hooks';
import authContainer from '@/store/auth';
import systemMsgContainer from '@/store/systemMsg';
import { isUndefined } from '@/utils';
import {useMount,useUpdateEffect} from '@umijs/hooks'
import routesConfig from './config';

const App = () => {
  // 全局登陆校验
  const auth = authContainer.useContainer()
  // 右侧的信息提示
  const systemMsg = systemMsgContainer.useContainer()
  // 登陆后的身份token,jwt
  const token = useAuth()
  // 在每次打开页面就去localstorage校验是否登陆
  useMount(() => {
    if (!isUndefined(token.token) && token.token !== '') {
      auth.setIsLogin(true)
    }
  })
  // 当登陆状态受到外部环境改变时,比如退出登陆,此时改变状态
  useUpdateEffect(() => {
    if (auth.isLogin) {
      systemMsg.run()
    }
  }, [auth.isLogin])
  return (
    <Router>
      {/*把是否登陆注册到全局 */}
      <RenderRoutes routes={routesConfig} isLogin={auth.isLogin} />
    </Router>
  )
}

export default App
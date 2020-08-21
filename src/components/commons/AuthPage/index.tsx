/**
 * @ Author: zao
 * @ Create Time: 2020-08-20 18:49:22
 * @ Modified by: zao
 * @ Description: 路由鉴权拦截组件
 */

import React, { ReactElement } from 'react'
import { Button } from 'antd'

import { useHistory } from 'react-router-dom'
import style from './AuthPage.module.scss'
interface Props {

}

function AuthPage({ }: Props): ReactElement {
  const history = useHistory()
  return (
    <div className={style.container}>
      <h2>若要访问请进行如下操作</h2>
      <div className={style.btnGroup}>
        <Button type='primary' onClick={() => history.push('/login')}>登陆</Button>
        <Button onClick={() => history.goBack()}>取消</Button>
      </div>

    </div>
  )
}

export default AuthPage

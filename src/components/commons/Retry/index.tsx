/**
 * @ Author: zao
 * @ Create Time: 2020-08-20 18:49:22
 * @ Modified by: zao
 * @ Description: 加载失败，重试组件
 */

import React, { ReactElement } from 'react'
import {SyncOutlined} from '@ant-design/icons'
import style from './Retry.module.scss'
interface Props {
  msg?: string;
  className?: string;
  callback?: () => any;
}

function Retry({className,msg='请求失败,请重试',callback}: Props): ReactElement {
  return (
    <div className={`${className} ${style.container}`}>
      <span>{msg}</span>
      <SyncOutlined className={style.icon} onClick={callback}/>
    </div>
  )
}

export default Retry

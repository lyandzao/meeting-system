/**
 * @ Author: zao
 * @ Create Time: 2020-08-20 18:49:22
 * @ Modified by: zao
 * @ Description: 嘉宾显示组件
 */

import React, { ReactElement } from 'react'
import style from './style.module.scss'

interface Props {
  key?: string;
  img?: string;
  name?: string;
}

function Guest({key,img,name}: Props): ReactElement {
  return (
    <div key={key} className={style.container}>
      <img src={img} alt=""/>
      <div>{name}</div>
    </div>
  )
}

export default Guest

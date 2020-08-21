/**
 * @ Author: zao
 * @ Create Time: 2020-08-20 18:49:22
 * @ Modified by: zao
 * @ Description: 嘉宾单项
 */

import React, { ReactElement } from 'react'
import style from './style.module.scss'
import {
  useRequest,
  useUnmount,
} from '@umijs/hooks';
import {Iguest,getGuestAvatar} from '@/services/apis/guest'
interface Props {
  readonly?: boolean;
  list: Iguest[];
}

function Guest({readonly=true,list}: Props): ReactElement {
  return (
    <div className={style.container}>
      {list.length !== 0 && list.map((item, index) => {
        return (
          <div className={style.item}>
            <img src={getGuestAvatar(item.avatarUrl)} alt=""/>
            <div className={style.info}>
              {item.name}
            </div>
          </div>
          
        )
      })}
    </div>
  )
}

export default Guest

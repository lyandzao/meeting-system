/**
 * @ Author: zao
 * @ Create Time: 2020-03-20
 * @ Modified by: zao
 * @ Description: 全局各个单项比赛，发布的消息item
 */

import React, {
  ReactElement,
  useState,
} from 'react';

import { useImmer } from 'use-immer';

import { useHistory } from 'react-router-dom'

import Button from '@/components/commons/Button';
import { useBoolean } from '@umijs/hooks'
import {
  ClockCircleOutlined,
  StarOutlined,
} from '@ant-design/icons';

import style from './style.module.scss';
import itemDefaultSrc from '@/assets/images/item-default@2x.png'

export interface Iitem {
  id: string;
  src: string;
  title: string;
  favorite: boolean;
  time: string;
  isMyItem?: boolean;
}

interface Props {
  item: Iitem;
}

function Item({ item }: Props): ReactElement {
  enum BtnColor { isMy = 'rgb(245, 110, 45)', isNot = '#2d95f5' }
  const [itemState, setItemState] = useImmer({
    ...item
  })
  const history = useHistory()

  const handleClick = () => {
    history.push(`/file/${item.id}`)
  }

  return (
    <div className={style.container} onClick={handleClick}>
      <img className={style.img} src={itemState.src || itemDefaultSrc} alt="" />
      <div className={style.titleBar}>
        <div className={style.title}>{itemState.title}</div>
      </div>
      <div className={style.timeBar}>
        <div className={style.time}>
          <ClockCircleOutlined />
          <div className={style.font}>{itemState.time}</div>
        </div>
        <Button color={itemState.isMyItem?BtnColor.isMy:BtnColor.isNot} value={itemState.isMyItem?'我的文档':'相关文档'} fontSize={3} className={style.btn} size='small'/> 
      </div>
    </div>
  )
}

export default Item

/**
 * @ Author: zao
 * @ Create Time: 2020-03-20
 * @ Modified by: zao
 * @ Description: 全局各个单项会议，发布会议item
 */

import React, {
  ReactElement,
  useState,
} from 'react';

import { useImmer } from 'use-immer';

import { useHistory } from 'react-router-dom'

import Button from '@/components/commons/Button';
import {useBoolean} from '@umijs/hooks'
import {
  ClockCircleOutlined,
  StarOutlined,
} from '@ant-design/icons';

import { Iitem } from './';
import style from './ProjectItem.module.scss';
import itemDefaultSrc from '@/assets/images/item-default@2x.png'

interface Props {
  item: Iitem;
  jumpTo: string;
  btnShow?: boolean;
}

function Item({ item,jumpTo,btnShow }: Props): ReactElement {
  enum BtnColor { already = 'rgba(250,167,48,1)', lapse = 'rgba(159,158,157,1)' }
  const ifShowBtn=useBoolean(btnShow)
  const [BtnStatus, setBtnStatus] = useImmer({
    color: BtnColor.already,
    value: '有效'
  })
  const history = useHistory()

  const handleClick = () => {
    history.push(`/${jumpTo}/${item.id}`)
  }

  return (
    <div className={style.container} onClick={handleClick}>
      <img className={style.img} src={item.src || itemDefaultSrc} alt="" />
      <div className={style.titleBar}>
        <div className={style.title}>{item.title}</div>
        <StarOutlined />
      </div>
      <div className={style.timeBar}>
        <div className={style.time}>
          <ClockCircleOutlined />
          <div className={style.font}>{item.time}</div>
        </div>
        {ifShowBtn.state ? <Button {...BtnStatus} fontSize={8} className={style.btn} /> : null}
      </div>
    </div>
  )
}

export default Item

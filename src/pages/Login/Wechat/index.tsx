/**
 * @ Author: zao
 * @ Create Time: 2020-08-20 18:49:22
 * @ Modified by: zao
 * @ Description: 微信登陆
 */
 // TODO: 暂时未做

import React, { ReactElement } from 'react';

import style from './Wechat.module.scss';

interface Props {
  className?: string;
}

function Wechat(props: Props): ReactElement {
  return (
    <div className={`${style.container} ${props.className}`}>
      微信登录
    </div>
  )
}

export default Wechat

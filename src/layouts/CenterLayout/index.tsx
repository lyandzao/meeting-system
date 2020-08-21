/**
 * @ Author: zao
 * @ Create Time: 2020-08-20 18:49:22
 * @ Modified by: zao
 * @ Description: 个人中心布局，包含侧边bar和内容
 */

import React, { ReactElement } from 'react';

import CenterBar from '@/components/bars/CenterBar';
import style from './CenterLayout.module.scss'

interface Props {
  children: React.ReactNode;
}

function CenterLayout({ children }: Props): ReactElement {
  return (
    <div className={style.container}>
      <CenterBar className={style.left}/>
      <div className={style.right}>{children}</div>
    </div>
  )
}

export default CenterLayout

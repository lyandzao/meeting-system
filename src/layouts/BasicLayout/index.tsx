/**
 * @ Author: zao
 * @ Create Time: 2020-08-20 18:49:22
 * @ Modified by: zao
 * @ Description: 基础布局，包含头部，内容和尾部
 */

import React, { ReactElement } from 'react';

import Bottom from '@/components/commons/Bottom';
import Header from '@/components/commons/Header';

import style from './BasicLayout.module.scss';

interface Props {
  children: React.ReactNode;
}

function BasicLayout({ children }: Props): ReactElement {
  return (
    <div className={style.container}>
      <Header />
      <div className={style.children}>{children}</div>
      <Bottom className={style.bottom} />
    </div>
  )
}

export default BasicLayout

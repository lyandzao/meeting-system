/**
 * @ Author: zao
 * @ Create Time: 2020-08-20 18:49:22
 * @ Modified by: zao
 * @ Description: 侧边消息布局，包含内容和侧边布局
 */

import React, { ReactElement, useState } from 'react';

import { Spin } from 'antd'
import SystemMsg from '@/components/commons/SystemMsg';
import style from './MsgLayout.module.scss';
import systemMsgContainer from '@/store/systemMsg'

interface Props {
  children: React.ReactNode;
}

function MsgLayout({ children }: Props): ReactElement {
  const systemMsg = systemMsgContainer.useContainer()

  return (
    <div className={style.container}>
      <div className={style.left}>{children}</div>
      <div className={style.right}>
        <Spin spinning={systemMsg.loading} >
        <SystemMsg name='热门会议' msgList={systemMsg.msgList} />
      </Spin>
      </div>
      

    </div>

  )
}

export default MsgLayout

/**
 * @ Author: zao
 * @ Create Time: 2020-08-20 18:49:22
 * @ Modified by: zao
 * @ Description: 会议发布的侧边消息布局
 */

import React, { ReactElement } from 'react';

import { Spin } from 'antd'
import SystemMsg from '@/components/commons/SystemMsg';
import systemMsgContainer from '@/store/systemMsg'
import style from './RecruitLayout.module.scss';

interface Props {
  children: React.ReactNode;
}

function RecruitLayout({ children }: Props): ReactElement {
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

export default RecruitLayout

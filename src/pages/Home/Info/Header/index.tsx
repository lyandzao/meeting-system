import React, {
  ReactElement,
} from 'react';

import { Spin, } from 'antd';
import { useParams } from 'react-router-dom';
import { useImmer } from 'use-immer';
import infoDetail from '@/assets/images/info_detail.png'
import Input from '@/components/forms/Input/Input';
import {
  getItemInfo,
  Iitem,
} from '@/services/apis/item';

import {
  useRequest,
} from '@umijs/hooks';
import style from './style.module.scss';

interface Props extends Icontainer{
  
}
interface Iinfo extends Iitem {


}
function Info({className }: Props): ReactElement {
  const { meetingId } = useParams()
  const _meetingId = Number(meetingId)
  const [info, setInfo] = useImmer<Iinfo>({
    mName: '',
    location:'',
    startTime: '',
    closeTime:'',
  })

  const meetingInfoR = useRequest((meetingId = _meetingId) => getItemInfo(meetingId), {
    onSuccess: (result, params) => {
      if (result.data) {
        const { meeting } = result.data
        setInfo(draft => {
          draft.mName = meeting.mName
          draft.location = meeting.location
          draft.startTime = meeting.startTime
          draft.closeTime = meeting.closeTime
        })
      }
    }
  })


  return (
    <Spin wrapperClassName={className} spinning={meetingInfoR.loading}>
      <div className={style.container}>
        <div className={style.header}>
          <h2 className={style.title}>{info.mName}</h2>
          <div className={style.headerInfo}>
            <img src={infoDetail} alt="img" className={style.icon} />
            <div className={style.basicInfo}>
              <div className={style.timeAndAddr}>
                <Input type='text' name={'开始时间'} readOnly value={info.startTime} />
                <Input type='text' name={'结束时间'} readOnly value={info.startTime} />
                <Input type='text' name={'会议地点'} readOnly value={info.location} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  )
}

export default Info



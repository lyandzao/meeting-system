// TODO: remember to set request
// TODO: remember to set UploadInput loadStatus

import React, {
  FormEvent,
  ReactElement,
  useState
} from 'react';

import { Spin, message } from 'antd';
import { useParams, useLocation } from 'react-router-dom';
import { useImmer } from 'use-immer';

import Input from '@/components/forms/Input/Input';
import Textarea from '@/components/forms/Textarea';
import UploadInput from '@/components/forms/UploadInput'
import {
  getItemInfo,
  Iitem,
} from '@/services/apis/item';
import { uploadFiles, downloadFile, deleteMyFile } from '@/services/apis/files'

import {
  useRequest,
  useUnmount,
} from '@umijs/hooks';
import { download,download2 } from '@/utils'
import style from './style.module.scss';

interface Props {
  type: number;
}
interface Iinfo extends Iitem {
  isFavorited: boolean;
  isApplied: boolean;
  files: {
    fileid: number;
    meetingid: number;
    path: string;
    name: string;
  }[]
}
function File({ type }: Props): ReactElement {
  const { meetingId } = useParams()
  const _meetingId = Number(meetingId)
  const [roleType, setRoleType] = useState(0)
  const [fileStatus, setFileStatus] = useState(false)
  const location = useLocation()
  const [info, setInfo] = useImmer<Iinfo>({
    mName: '',
    startTime: '',
    closeTime: '',
    introduction: '',
    organizer: '',
    communicate: '',
    schedule: '',
    isFavorited: false,
    isApplied: false,
    files: []
  })

  enum relationType {
    created = 1,// 创建的会议
    applied = 2,// 参加的会议
    favorited = 3,// 收藏的会议
  }
  enum btnStatus {
    applied = 'rgba(255,190,14,1)',// 已参加会议
    unApplied = 'rgba(255,190,14,1)',// 未参加会议
    appliedValue = '取消报名',
    unAppliedValue = '我要报名'
  }
  const meetingInfoR = useRequest((meetingId = _meetingId) => getItemInfo(meetingId), {
    onSuccess: (result, params) => {
      if (result.data) {
        const { relations, meeting, files } = result.data
        // if (relations.includes(relationType.created)) {
        //   setRoleType(relationType.created)
        // } else {
        //   setRoleType(0)
        // }
        if (location.state) {
          setRoleType(relationType.created)
        } else {
          setRoleType(0)
        }
        setInfo(draft => {
          draft.mName = meeting.mName
          draft.location = meeting.location
          draft.startTime = meeting.startTime
          draft.closeTime = meeting.closeTime
          draft.introduction = meeting.introduction
          draft.organizer = meeting.organizer
          draft.communicate = meeting.communicate
          draft.schedule = meeting.schedule
          draft.typeid = meeting.typeid
          draft.needvolunteer = meeting.needvolunteer
          draft.files = files.map((item: any) => {
            return {
              uid: item.fileid,
              name: item.name,
              meetingId: item.meetingid,
            }
          })
        })
      }
    }
  })


  const downloadFileR = useRequest((meetingId, fileName) => downloadFile(meetingId, fileName), {
    manual: true,
    onSuccess: (result, params) => {
      download(result, params[1])
    },
  })



  const uploadFileR = useRequest((formData) => uploadFiles(formData), {
    manual: true,
    onSuccess: (result, params) => {
      console.log(result)

      if (result.code >= 0) {
        setFileStatus(true)
        message.success('上传成功')
      } else {
        setFileStatus(false)
      }
    }
  })

  const deleteMyFileR = useRequest((meetingId, fileId) => deleteMyFile(meetingId, fileId), {
    manual: true,
    onSuccess: (result, params) => {
      if (result.data) {
        setFileStatus(true)
        message.success('删除成功')
      } else {
        setFileStatus(false)
      }
    },
    onError: (error) => {
      setFileStatus(false)
    }
  })


  return (
    <Spin spinning={meetingInfoR.loading}>
      <div className={style.container}>
        <div className={style.header}>
          <div>
            <h2 className={style.title}>{info.mName}</h2>
            <div className={style.meetingIcon}></div>
          </div>
          <div className={style.info}>
            <Input type='text' name={'开始时间'} readOnly value={info.startTime} />
            <Input type='text' name={'结束时间'} readOnly value={info.closeTime} />
            <Input type='text' name={'地点'} readOnly value={info.location} />
          </div>

        </div>
        <UploadInput
          className={style.fileList}
          needUpload={roleType === relationType.created} defaultFileList={info.files}
          loadStatus={false}
          meetingId={_meetingId}
          uploadFile={uploadFileR.run}
          deleteFile={deleteMyFileR.run}
          downloadFile={(meetinfId,fileName)=>download2(meetingId as string,fileName)}
          refresh={meetingInfoR.refresh} />
      </div>
    </Spin>
  )
}

export default File



/**
 * @ Author: zao
 * @ Create Time: 2020-08-20 18:49:22
 * @ Modified by: zao
 * @ Description: 会议详细页面
 */

// TODO: remember to set request
// TODO: remember to set UploadInput loadStatus

import React, {
  FormEvent,
  ReactElement,
  useState,
} from 'react';

import {
  message,
  Modal,
  Spin,
} from 'antd';
import { useParams } from 'react-router-dom';
import { useImmer } from 'use-immer';

import infoDetail from '@/assets/images/info_detail.png';
import Button from '@/components/commons/Button';
import Input from '@/components/forms/Input/Input';
import RadioGroup from '@/components/forms/RadioGroup';
import Textarea from '@/components/forms/Textarea';
import {
  deleteMyFile,
  downloadFile,
  uploadFiles,
} from '@/services/apis/files';
import {
  applyItem,
  favoriteItem,
  getItemInfo,
  Iitem,
  quitFavorite,
  quitItem,
} from '@/services/apis/item';
import { download } from '@/utils';
import {
  InfoCircleOutlined,
  LoadingOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';
import { useRequest } from '@umijs/hooks';

import GuestC from './Guest';
import style from './Info.module.scss';
import TaskC from './Tasks';

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
interface Itasks{
  meetid?: string;
  numbers?: string;
  taskid?: string;
  taskinfo?: string;
  worktime?: string;
}
interface Iguests{
  guestid?: string;
  avatarUrl?: string;
  flightInfo?: string;
  guestTel?: string;
  introduction?: string;
  meetingid?: string;
  name?: string;
  personId?: string;
  position?: string;
}
function Info({ type }: Props): ReactElement {
  const { meetingId } = useParams()
  const _meetingId = Number(meetingId)
  const [roleType, setRoleType] = useState(0)
  const [joinRole, setJoinRole] = useState(1)
  const [fileStatus, setFileStatus] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [needService, setNeedService] = useState('不需要')
  const [info, setInfo] = useImmer<Iinfo>({
    mName: '',
    startTime: '',
    introduction: '',
    organizer: '',
    communicate: '',
    schedule: '',
    isFavorited: false,
    isApplied: false,
    files: []
  })
  const [tasks, setTasks] = useImmer<Itasks[]>([])
  const [guests, setGuests] = useImmer<Iguests[]>([])
  enum relationType {
    created = 1,// 创建的会议
    applied = 2,// 参加的会议
    favorited = 3,// 收藏的会议
  }
  enum joinRoleType{
    normal = 1,
    volunteer=2
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
        const { relations, guests,tasks, meeting, files } = result.data
        if (relations.includes(relationType.created)) {
          setRoleType(relationType.created)
        } else {
          setRoleType(0)
        }
        setInfo(draft => {
          draft.isFavorited = relations.includes(String(relationType.favorited))
          draft.isApplied = relations.includes(String(relationType.applied))
          draft.mName = meeting.mName
          draft.location = meeting.location
          draft.startTime = meeting.startTime
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
        setTasks(draft => {
          return tasks
        })
        setGuests(draft => {
          return guests
        })
      }
    }
  })

  const applyItemR = useRequest((meetingId = _meetingId) => applyItem(meetingId), {
    manual: true,
    onSuccess: (result, param) => {
      if (result && result.code >= 0) {
        setInfo(draft => { draft.isApplied = true })
        setShowModal(false)
      } else {
        setInfo(draft => { draft.isApplied = false })
        setShowModal(false)
      }
    }
  })
  const quitItemR = useRequest((meetingId = _meetingId) => quitItem(meetingId), {
    manual: true,
    onSuccess: (result, param) => {
      if (result && result.code >= 0) {
        setInfo(draft => { draft.isApplied = false })
      } else {
        setInfo(draft => { draft.isApplied = true })
      }
    }
  })
  const favoriteR = useRequest((meetingId = _meetingId) => favoriteItem(meetingId), {
    manual: true,
    onSuccess: (result, param) => {
      if (result && result.code >= 0) {
        setInfo(draft => { draft.isFavorited = true })
      } else {
        setInfo(draft => { draft.isFavorited = false })
      }
    }
  })
  const quitFavoriteR = useRequest((meetingId = _meetingId) => quitFavorite(meetingId), {
    manual: true,
    onSuccess: (result, param) => {
      if (result && result.code >= 0) {
        setInfo(draft => { draft.isFavorited = false })
      } else {
        setInfo(draft => { draft.isFavorited = true })
      }
    }
  })
  const downloadFileR = useRequest((meetingId, fileName) => downloadFile(meetingId, fileName), {
    manual: true,
    onSuccess: (result, params) => {
      if (result.code < 0) {
        message.error(result.message)
      } else {
        download(result, params[1])
      }
    }
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

  // 报名
  const handleApply = async (e: FormEvent) => {
    e.preventDefault()
    if (info.isApplied) {
      quitItemR.run()
    } else {
      setShowModal(true)
    }
  }

  const applyMeetingByDifferentRole = (e:React.SyntheticEvent) => {
    e.preventDefault()
    if (joinRole === joinRoleType.normal) {
      // 普通参与者  --> 不需要住宿和接机
      // todo: 这里记得改住宿和接机逻辑
      applyItemR.run()
    } else {
      // 志愿者  --> 需要住宿和接机
      // todo: 这里记得改住宿和接机逻辑
      applyItemR.run()
    }
  }

  // 收藏
  const handleFavorite = async () => {
    if (info.isFavorited) {
      quitFavoriteR.run()
    } else {
      favoriteR.run()
    }
  }


  return (
    <Spin spinning={meetingInfoR.loading}>
      <form className={style.container} onSubmit={handleApply}>
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
              <div className={style.btnGroup}>
                <div className={style.favorite}>
                  {info.isFavorited ?
                    quitFavoriteR.loading
                      ? <LoadingOutlined className={style.star} />
                      : <StarFilled className={style.starFiled} onClick={handleFavorite} />
                    : favoriteR.loading
                      ? <LoadingOutlined className={style.star} />
                      : <StarOutlined className={style.star} onClick={handleFavorite} />}
                </div>
                <Button type='submit' className={style.btn} value={info.isApplied ? btnStatus.appliedValue : btnStatus.unAppliedValue} fontSize={10} loading={info.isApplied ? quitItemR.loading : applyItemR.loading} size='small' />
              </div>
            </div>
          </div>

          <Modal
            title="接机和住宿服务"
            visible={showModal}
            onOk={applyMeetingByDifferentRole}
            onCancel={() => setShowModal(false)}
            confirmLoading={applyItemR.loading}
          >
            <RadioGroup name='接机服务和住宿服务' radioList={['需要', '不需要']} bind={setNeedService} initialData={needService} />
            <span style={{fontSize:12,color:'#faad14'}}><InfoCircleOutlined />  若不是嘉宾请慎重选择,后续会有必要的费用</span>

          </Modal>
        </div>
        <div className={style.meetingInfo}>
          <h2>会议信息</h2>
          <div>
            <Textarea name={'会议简介'} readOnly value={info.introduction} />
            <Input type='text' name={'主办方'} readOnly value={info.organizer} />
            <Input type='text' name='联系方式' readOnly value={info.communicate} />
          </div>
        </div>
        <div className={style.meetingGuest}>
          <h2>出席嘉宾</h2>
          <div><GuestC list={guests}/></div>
        </div>
        <div className={style.meetingVolunteer}>
          <h2>志愿者招募</h2>
          <div>
            <Input type='text' name='招募人数' readOnly value={info.needvolunteer} />
            <Textarea name='招募需求' readOnly value={info.schedule} />
            <TaskC list={tasks} meetingId={meetingId as string}/>
          </div>
        </div>
      </form>
    </Spin>
  )
}

export default Info



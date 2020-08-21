/**
 * @ Author: zao
 * @ Create Time: 2020-08-20 18:49:22
 * @ Modified by: zao
 * @ Description: 添加嘉宾
 */

import React, { ReactElement } from 'react'
import { useImmer } from 'use-immer'
import { useBoolean, useRequest, useMount } from '@umijs/hooks'
import { Modal } from 'antd'
import Input from '@/components/forms/Input'
import { Iguest, addGuest, getGuestInfo } from '@/services/apis/guest'
import { useChange } from '@/hooks'
import Card from './Card'
import { PlusCircleFilled } from '@ant-design/icons'
import style from './style.module.scss'
interface Props {
  meetingId: string
}

function Source({ meetingId }: Props): ReactElement {
  const showGuestModal = useBoolean(false)
  const introduction = useChange('')
  const name = useChange('')
  const position = useChange('')
  const flightInfo = useChange('')
  const personId = useChange('')
  const guestTel = useChange('')
  const [list, setList] = useImmer<Iguest[]>([])
  const getAllGuestR = useRequest(getGuestInfo, {
    manual: true,
    onSuccess: (res, param) => {
      if (res.data.info) {
        setList(draft => {
          return res.data.info
        })
      }
    }
  })
  const addGuestR = useRequest(addGuest, {
    manual: true,
    onSuccess: (res, param) => {
      showGuestModal.setFalse()
      getAllGuestR.refresh()
    }
  })

  const handleAddGuest = () => {
    addGuestR.run(meetingId,introduction.value,name.value,position.value,flightInfo.value,personId.value,guestTel.value)
  }
  useMount(() => {
    getAllGuestR.run(meetingId)
  })
  return (
    <div className={style.c1}>
      <div className={style.tt}>导入嘉宾信息</div>
      {
        list?.map((item, index) => {
          return <Card meetingId={meetingId} loading={getAllGuestR.loading} type='guest' key={`source-guest-${index}`} guest={item} />
        })
      }
      <PlusCircleFilled className={style.btn} style={{ fontSize: 40, color: 'rgba(145, 191, 229, 1)', cursor: 'pointer' }} onClick={showGuestModal.setTrue} />
      <Modal
        visible={showGuestModal.state}
        onOk={handleAddGuest}
        onCancel={showGuestModal.setFalse}
        confirmLoading={addGuestR.loading}
      >
        <div className={style.modal}>
          <Input bind={name} type='text' name='姓名' />
          <Input bind={position} type='text' name='职位' />
          <Input bind={introduction} type='text' name='介绍' />
          <Input bind={guestTel} type='text' name='电话' />
          <Input bind={personId} type='text' name='身份证号' />
          <Input bind={flightInfo} type='text' name='航班信息' />
        </div>

      </Modal>
    </div>

  )
}

export default Source

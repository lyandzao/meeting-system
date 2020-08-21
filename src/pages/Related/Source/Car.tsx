/**
 * @ Author: zao
 * @ Create Time: 2020-08-20 18:49:22
 * @ Modified by: zao
 * @ Description: 添加车辆
 */

import React, { ReactElement } from 'react'
import { useImmer } from 'use-immer'
import { useBoolean, useRequest, useMount } from '@umijs/hooks'
import { Modal } from 'antd'
import Input from '@/components/forms/Input'
import { useChange } from '@/hooks'
import { Idriver, getAllDrivers, addDriver} from '@/services/apis/driver'
import Card from './Card'
import { PlusCircleFilled } from '@ant-design/icons'
import style from './style.module.scss'
interface Props {
  meetingId: string;
}

function Car({ meetingId }: Props): ReactElement {
  const showCarModal = useBoolean(false)
  const carId = useChange('')
  const driverName = useChange('')
  const driverTel = useChange('')
  const carType = useChange('')
  const [list, setList] = useImmer<Idriver[]>([])
  const getAllDriversR = useRequest(getAllDrivers, {
    manual: true,
    onSuccess: (res, param) => {
      if (res.data.list) {
        setList(draft => {
          return res.data.list
        })
      }
    }
  })
  const addDriverR = useRequest(addDriver, {
    manual: true,
    onSuccess: (res, param) => {
      showCarModal.setFalse()
      getAllDriversR.refresh()
    }
  })

  const handleAddDriver = () => {
    addDriverR.run(meetingId, carId.value, driverName.value, driverTel.value, carType.value)
  }

  useMount(() => {
    getAllDriversR.run(meetingId)
  })
  return (
    <div className={style.c2}>
      <div className={style.tt}>导入司机信息</div>
      {
        list?.map((item, index) => {
          return <Card meetingId={meetingId} type='car' key={`source-car-${index}`} car={item}/>
        })
      }
      <PlusCircleFilled className={style.btn} style={{ fontSize: 40, color: 'rgba(145, 191, 229, 1)', cursor: 'pointer' }} onClick={showCarModal.setTrue} />
      <Modal
        visible={showCarModal.state}
        onOk={handleAddDriver}
        onCancel={showCarModal.setFalse}
        confirmLoading={addDriverR.loading}
      >
        <div className={style.modal}>
          <Input bind={carId} type='text' name='车牌号'/>
          <Input bind={driverName} type='text' name='司机姓名'/>
          <Input bind={driverTel} type='text' name='司机电话'/>
          <Input bind={carType} type='text' name='车型'/>
        </div>
      </Modal>
    </div>

  )
}

export default Car

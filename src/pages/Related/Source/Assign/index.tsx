/**
 * @ Author: zao
 * @ Create Time: 2020-08-20 18:49:22
 * @ Modified by: zao
 * @ Description: 分配房间或者住宿
 */


import React, { ReactElement } from 'react'
import { useImmer } from 'use-immer'
import { assignDriver } from '@/services/apis/driver'
import { useChange } from '@/hooks'
import { Idriver, getAllDrivers } from '@/services/apis/driver'
import { useRequest, useMount } from '@umijs/hooks'
import { Modal } from 'antd'
import Button from '@/components/commons/Button'
import Input from '@/components/forms/Input'
import { NavLink } from 'react-router-dom'
import style from './style.module.scss'
interface Props {
  visible: any;
  meetingId: string;
  guestId: string;
}

function Assign({ meetingId, guestId, visible }: Props): ReactElement {
  const [list, setList] = useImmer<Idriver[]>([])
  const assignDriverR = useRequest(assignDriver, {
    manual: true,
    onSuccess: (res, param) => {
      visible.setFalse()
    }
  })
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
  const handleAssign = (driverId:any) => {
    // assignDriverR.run(meetingId,)
    assignDriverR.run(meetingId,driverId,guestId)
  }
  useMount(() => {
    getAllDriversR.run(meetingId)
  })
  return (
    <Modal
      title={'分配接机和住宿'}
      visible={visible.state}
      onOk={()=>{}}
      onCancel={visible.setFalse}
      confirmLoading={assignDriverR.loading}
    >
      <div className={style.modal}>
        <header>
          <li><NavLink to='./air' activeClassName={style.active}>接机</NavLink></li>
          <li><NavLink to='./room' activeClassName={style.active}>住宿</NavLink></li>
        </header>
        <article>
          <div className={style.inlieContainer}>
            {list.map((item, index) => {
              return (
                <div key={`assign--${index}`} className={style.wrapper}>
                <div className={style.form}>
                  <Input value={item.carId} readOnly type='text' name='车牌号' />
                  <Input value={item.driverName} readOnly type='text' name='司机姓名' />
                  <Input value={item.driverTel} readOnly type='text' name='司机电话' />
                  <Input value={item.carType} readOnly type='text' name='车型' />
                </div>
                <div className={style.btn}>
                  <Button value='分配'onClick={()=>handleAssign(item.driverId)} />
                </div>
              </div>)
            })}
          </div>
        </article>
      </div>
    </Modal>
  )
}

export default Assign


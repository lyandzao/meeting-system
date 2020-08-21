/**
 * @ Author: zao
 * @ Create Time: 2020-08-20 18:49:22
 * @ Modified by: zao
 * @ Description: 任务单项
 */

import React, { ReactElement,useState } from 'react'
import {Modal} from 'antd'
import Input from '@/components/forms/Input'
import Textarea from '@/components/forms/Textarea'
import Button from '@/components/commons/Button'
import style from './style.module.scss'
import {
  useRequest,
  useUnmount,
} from '@umijs/hooks';
import {useChange} from '@/hooks'
import {joinVolunteer} from '@/services/apis/volunteer'
interface Itasks {
  meetid?: string;
  numbers?: string;
  taskid?: string;
  taskinfo?: string;
  worktime?: string;
}

interface Props {
  list: Itasks[];
  meetingId: string;
}

function Tasks({ list, meetingId }: Props): ReactElement {
  const [showModal, setShowModdal] = useState(false)
  const studentId=useChange('')
  const personId = useChange('')
  const [taskId, setTaskId] = useState('')
  const joinVolunteerR = useRequest(joinVolunteer, {
    manual: true,
  })
  const handleJoin = (taskId: string) => {
    setTaskId(taskId)
    setShowModdal(true)
  }
  const join = () => {
    joinVolunteerR.run(meetingId, {
      // studentid: studentId.value,
      // personid: personId.value,
      taskid:taskId
    })
  }
  return (
    <div className={style.container}>
      {list.length!==0 && 
        list.map((item, index) => {
          return (
            <div key={item.taskid
            } className={style.item}>
              <div className={style.tt}>任务{index + 1}</div>
              <Input type='text' name='招募人数' readOnly value={item.numbers} />
              <Input type='text' name='工作时间' readOnly value={item.worktime} />
              <Textarea name='任务详情' readOnly value={item.taskinfo} />
             <div className={style.btnWrapper}> <Button className={style.btn} value='申请' onClick={() => handleJoin(item.taskid || '')} fontSize={10} size="middle"/></div>
            </div>
          )
        })
      }
      <Modal
        title="志愿者申请"
        visible={showModal}
        onOk={join}
        onCancel={() => setShowModdal(false)}
        confirmLoading={joinVolunteerR.loading}
      >
        <Input type='text' name='学生证号' bind={studentId} />
        <br></br>
        <Input type='text' name='身份证号' bind={personId} />
      </Modal>
      {}
    </div>
  )
}

export default Tasks

import React, { ReactElement } from 'react';

import {
  message,
  Spin,
} from 'antd';

import Button from '@/components/commons/Button';
import Input from '@/components/forms/Input/Input';
import Textarea from '@/components/forms/Textarea';
import { useChange } from '@/hooks';
import { publishItem } from '@/services/apis/item';
import { useRequest, useBoolean, useDebounceFn } from '@umijs/hooks';
import { meetingTypes } from '@/constant'
import validate from '@/utils/validate';
import { useImmer } from 'use-immer'
import style from './style.module.scss';

interface Props {

}

function Publish({ }: Props): ReactElement {
  const name = useChange('')
  const startTime = useChange('')
  const closeTime = useChange('')
  const location = useChange('')
  const introduction = useChange('')
  const organizer = useChange('')
  const communicate = useChange('')
  const needNum = useChange('')
  const claim = useChange('')
  const validateRight = useBoolean(false)
  const [validateMsg, setValidateMsg] = useImmer({
    mName: { msg: '请输入会议名称', warn: false, isRight: false },
    location: { msg: '请输入地点', warn: false, isRight: false },
    startTime: { msg: '请输入开始时间', warn: false, isRight: false },
    closeTime: { msg: '请输入结束时间', warn: false, isRight: false },
    introduction: { msg: '请输入会议介绍', warn: false, isRight: false },
  })
  const publishItemR = useRequest(publishItem, {
    manual: true,
    onSuccess: (result, params) => {
      if (result.code >= 0) {
        message.success('发布成功')
      }
    }
  })
  const validateForm = {
    validateName: () => {
      if (validate.required(name.value)) {
        setValidateMsg(draft => {
          draft.mName.msg = '请输入会议名称'
          draft.mName.warn = false
          draft.mName.isRight = true
        })
        return true
      } else {
        setValidateMsg(draft => {
          draft.mName.msg = '名称不能为空'
          draft.mName.warn = true
          draft.mName.isRight = false
        })
        return false
      }
    },
    validateLocation: () => {
      if (validate.required(location.value)) {
        setValidateMsg(draft => {
          draft.location.msg = '请输入地点'
          draft.location.warn = false
          draft.location.isRight = true
        })
        return true
      } else {
        setValidateMsg(draft => {
          draft.location.msg = '地点不能为空'
          draft.location.warn = true
          draft.location.isRight = false
        })
        return false
      }
    },
    validateStartTime: () => {
      if (validate.required(startTime.value)) {
        setValidateMsg(draft => {
          draft.startTime.msg = '请输入开始时间'
          draft.startTime.warn = false
          draft.startTime.isRight = true
        })
        return true
      } else {
        setValidateMsg(draft => {
          draft.startTime.msg = '时间不能为空'
          draft.startTime.warn = true
          draft.startTime.isRight = false
        })
        return false
      }
    },
    validateCloseTime: () => {
      if (validate.required(closeTime.value)) {
        setValidateMsg(draft => {
          draft.startTime.msg = '请输入结束时间'
          draft.startTime.warn = false
          draft.startTime.isRight = true
        })
        return true
      } else {
        setValidateMsg(draft => {
          draft.startTime.msg = '时间不能为空'
          draft.startTime.warn = true
          draft.startTime.isRight = false
        })
        return false
      }
    },
    validateIntroduction: () => {
      if (validate.required(introduction.value)) {
        setValidateMsg(draft => {
          draft.introduction.msg = '请输入会议介绍'
          draft.introduction.warn = false
          draft.introduction.isRight = true
        })
        return true
      } else {
        setValidateMsg(draft => {
          draft.introduction.msg = '介绍不能为空'
          draft.introduction.warn = true
          draft.introduction.isRight = false
        })
        return false
      }
    },
  }
  const validateName = useDebounceFn(validateForm.validateName, 300)
  const validateLocation = useDebounceFn(validateForm.validateLocation, 300)
  const validateStartTime = useDebounceFn(validateForm.validateStartTime, 300)
  const validateCloseTime = useDebounceFn(validateForm.validateCloseTime, 300)
  const validateIntroduction = useDebounceFn(validateForm.validateIntroduction, 300)
  const checkValidate = useDebounceFn(() => {
    if (validateMsg.mName.isRight && validateMsg.location.isRight && validateMsg.introduction.isRight) {
      validateRight.setTrue()
    } else {
      validateRight.setFalse()
    }
  }, 300)
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (validateRight.state) {
      publishItemR.run({
        mName: name.value,
        location: location.value,
        startTime: startTime.value,
        closeTime:closeTime.value,
        introduction: introduction.value,
        organizer: organizer.value,
        communicate: communicate.value,
        needvolunteer: needNum.value,
        schedule: claim.value,
        typeid: meetingTypes.studentTeams,
      })
    }

  }
  const handleStartDate = (date: any, dateString: any) => {
    startTime.setValue(dateString)
  }
  const handleCloseDate = (date: any, dateString: any) => {
    closeTime.setValue(dateString)
  }
  return (
    <Spin spinning={publishItemR.loading}>
      <form className={style.container} onSubmit={handleSubmit} onInput={checkValidate.run}>
        <Input type='text' onInput={validateName.run} bind={name} name='会议名称' msg={validateMsg.mName.msg} warn={validateMsg.mName.warn} />
        <Input type='text' onInput={validateLocation.run} bind={location} name='地点' msg={validateMsg.location.msg} warn={validateMsg.location.warn} />
        <Input type='Date' onInput={validateStartTime.run} bind={startTime} name='开始时间' dateCallback={handleStartDate} msg={validateMsg.startTime.msg} warn={validateMsg.startTime.warn} />
        <Input type='Date' onInput={validateCloseTime.run} bind={closeTime} name='结束时间' dateCallback={handleCloseDate} msg={validateMsg.closeTime.msg} warn={validateMsg.closeTime.warn} />
        <Textarea onInput={validateIntroduction.run} bind={introduction} name='会议简介' msg={validateMsg.introduction.msg} warn={validateMsg.introduction.warn} />
        <Textarea bind={claim} name='时间表' />
        <Input type='text' bind={organizer} name='主办单位' />
        <Input type='text' bind={communicate} name='联系方式' />
        <Input type='text' bind={needNum} name='招募志愿者人数' />
        <Button type='submit' value='发布' className={style.btn} disabled={!validateRight.state} loading={publishItemR.loading} />
      </form>
    </Spin>

  )
}

export default Publish

/**
 * @ Author: zao
 * @ Create Time: 2020-08-20 18:49:22
 * @ Modified by: zao
 * @ Description: 关于志愿者相关接口
 */

import * as config from './config'
import { get, post } from '../axios'

export interface Ivolunt {
  meetid?: string;
  introduction?: string;
  number?: number;
  isproof?: 1 | -1; // 是否需要提供时长证明
  full?: 1 | -1; // 是否需要停止招募
}

export interface Ivolunteer {
  studentid?: string;
  personid?: string;
  taskid?: string;
}

export const addVolunt = (volunt: Ivolunt) => post(config.PUBLISH_VOLUNT_ACTIVITY, {
  data: {
    volunt
  }, msg: '添加成功'
})

/**
 * 
 * @param meetingId 
 * @param content 
 * @param type 4正在申请，5通过申请
 */
export const broadcast = (meetingId: string, content: string, type: 4 | 5) => post(config.SEND_VOLUNT_BROADCAST + meetingId, {
  data: {
    content,
    type
  }, msg: '广播成功'
})

export const joinVolunteer = (meetingId: string, voluntinfo: Ivolunteer) => post(config.JOIN_VOLUNTEER + meetingId, {
  data: {
    voluntinfo: encodeURIComponent(JSON.stringify(voluntinfo))
  }, msg: '申请成功，请等待审核'
})
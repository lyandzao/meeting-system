/**
 * @ Author: zao
 * @ Create Time: 2020-08-20 18:49:22
 * @ Modified by: zao
 * @ Description: 关于嘉宾相关接口
 */

import * as config from './config'
import { get, post,deleteFile } from '../axios'

export interface Iguest{
  guestid?: string,
  meetingid?:string,
  avatarUrl?: string,
  introduction?: string,
  name?: string,
  position?: string,
  flightInfo?: string,
  personId?: string,
  guestTel?: string
}

export const addGuest = (meetingId: string, introduction: string, name: string, position: string, flightInfo: string, personId: string, guestTel: string, icon?: any) => post(config.ADD_GUEST, {
  data: {
    meetingId,
    introduction,
    name,
    position,
    flightInfo,
    personId,
    guestTel,
    icon
  },msg:'添加成功'
})

export const deleteGuest = (guestId: string) => deleteFile(config.d_DELETE_GUEST, {
  data: {
    guestId
  }
})

export const getGuestInfo = (meetingId: string) => get(config._GET_GUEST_INFO + meetingId)

export const getGuestAvatar = (url?: string) => 'http://www.ljhhhx.com:8080/meeting/guestImg/' + url

export const updateGuest = (meetingId: string, introduction: string, name: string, position: string, flightInfo: string, personId: string, guestTel: string, icon: any) => post(config.MODIFY_GUEST_INFO, {
  data: {
    meetingId,
    introduction,
    name,
    position,
    flightInfo,
    personId,
    guestTel,
    icon
  }, msg: '添加成功'
})
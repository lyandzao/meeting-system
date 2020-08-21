/**
 * @ Author: zao
 * @ Create Time: 2020-08-20 18:49:22
 * @ Modified by: zao
 * @ Description: 对响应数据做数据转换
 */

import { getTime } from './index'

export interface Iitem {
  meetingid: number;
  mName: string | null;
  location: string;
  startTime: string;
  closeTime: string;
  introduction: string;
  schedule: string;
  needvolunteer: number;
  typeid: number;
  organizer: string;
  hostedby: string;
  communicate: string;
}

export const transformItemList = (data: Iitem[]) => {
  return data.map(item => {
    return {
      id: item.meetingid,
      src: '',
      title: item.mName,
      time: getTime(item.startTime, item.closeTime,true),
      favorite: false,
    }
  })
}

export const transformAwesomeItemList = (data: Iitem[], isMy: boolean) => {
  return data.map(item => {
    return {
      id: item.meetingid,
      src: '',
      title: item.mName,
      time: getTime(item.startTime, item.closeTime,false),
      favorite: false,
      isMyItem:isMy,
    }
  })
}
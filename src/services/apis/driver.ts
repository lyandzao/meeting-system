/**
 * @ Author: zao
 * @ Create Time: 2020-08-20 18:49:22
 * @ Modified by: zao
 * @ Description: 关于司机相关接口
 */

import * as config from './config'
import { get, post, deleteFile } from '../axios'

export interface Idriver {
  driverId?: string;
  carId: string;
  driverName: string;
  driverTel: string;
  carType: string;
}

export const addDriver = (
  meetingId: string,
  carId: string,
  driverName: string,
  driverTel: string,
  carType: string
) => post(config.ADD_DRIVER, {
  data: {
    meetingId,
    carId,
    driverName,
    driverTel,
    carType
  }, msg: '添加司机成功'
})

export const getAllDrivers = (meetingId: string) => post(config.SHOW_ALL_DRIVERS, {
  data: {
    meetingId
  }
})

export const assignDriver = (meetingId: string, driverId: string, guestId: string) => post(config.ASSIGN_DRIVER, {
  data: {
    meetingId,
    driverId,
    guestId
  },msg:'分配成功'
})
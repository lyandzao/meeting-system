/**
 * @ Author: zao
 * @ Create Time: 2020-08-20 18:49:22
 * @ Modified by: zao
 * @ Description: 封装的请求方法
 */

import { message } from 'antd';
import { AxiosRequestConfig } from 'axios';

import instance from './config';

interface Iopt extends AxiosRequestConfig {
  ifHandleError?: boolean; // 统一处理错误
  ifCanceled?: boolean;
  msg?: string;
}

// 统一处理返回200但code为负的情况
const errorHandler = (res: any) => {
  if (res && res.code < 0) {
    message.error(res.message)
  }
}

const request = async (opt: Iopt) => {
  const options: Iopt = {
    method: 'get',
    ifHandleError: true,
    ifCanceled: false,
    ...opt
  }
  try {
    const res = await instance(options);
    if (options.ifHandleError) {
      errorHandler(res)
    }
    return res
  } catch (err) {
    if (options.ifHandleError && !options.ifCanceled) {
      message.error(err.message || err.msg || '请求失败!')
    }
    return err
  }
}

export const get = (url: string, opt?: Iopt) => {
  return request({
    method: 'GET',
    url,
    params: opt?.params,
    headers: opt?.headers,
    msg: opt?.msg
  })
}
export const post = (url: string, opt?: Iopt, multipart?: boolean) => {
  let contentType: string = 'application/x-www-form-urlencoded;charset=UTF-8'
  if (multipart) {
    contentType = 'multipart/form-data;charset=UTF-8'
  }
  return request({
    method: 'post',
    url,
    data: opt?.data,
    headers: {
      'Content-Type': contentType
    },
    msg: opt?.msg
  })
}

export const deleteFile = (url: string, opt?: Iopt) => {

  return request({
    method: 'DELETE',
    url,
    data: opt?.data,
    msg: opt?.msg
  })
}

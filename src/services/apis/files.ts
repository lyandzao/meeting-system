/**
 * @ Author: zao
 * @ Create Time: 2020-08-20 18:49:22
 * @ Modified by: zao
 * @ Description: 关于文件相关接口
 */

import * as config from './config'
import { get, post,deleteFile } from '../axios'

/**
 * 上传文件
 * @param formData {file,meetingId} 
 */
export const uploadFiles = (formData: any) => post(config.UPLOAD_FILE, { data: formData }, true)


/**
 * 下载文件
 * @param meetingId 
 * @param fileName 
 */
export const downloadFile = (meetingId: number, fileName: string) => get(
  config._DOWNLOAD_FILE,
  {
    params: { meetingId, fileName },
    responseType: 'blob'
  }
)


/**
 * 删除文件
 * @param meetingId 
 * @param fileId 
 */
export const deleteMyFile=(meetingId:number,fileId:number)=>deleteFile(config.d_DELETE_MEETING_FILE,{data:{meetingId,fileId}})

/**
 * 获取下载列表
 * @param meetingId 
 */
export const getFileList=(meetingId:number)=>get(config._GET_FILE_LIST,{params:{meetingId}})


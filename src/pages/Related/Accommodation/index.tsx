/**
 * @ Author: zao
 * @ Create Time: 2020-08-20 18:49:22
 * @ Modified by: zao
 * @ Description: 住宿页面
 */

import React, { ReactElement } from 'react'
import Bar from '../Bar'
import Distribution from '../Distribution'
import Button from '@/components/commons/Button'
import style from './style.module.scss'
import {useHistory,useParams} from 'react-router-dom'
interface Props {

}

function Accommodation({ }: Props): ReactElement {
  const history=useHistory()
  const {meetingId}=useParams()
  const jumpToSource = () => {
    history.push('/source/'+meetingId,{from:'accommodation'})
  }
  return (
    <div className={style.container}>
      <Bar num={'6'} guestList={[
        {
          img: '',
          name: 'zao'
        },
        {
          img: '',
          name: 'zao2'
        },
        {
          img: '',
          name: 'zao3'
        },
      ]} />
      <Distribution num={'6'} type={'room'} list={[
        {
          type: '单间',
          num: '12',
          price: '188元'
        }
      ]} />
      <Button className={style.btn} value={'+导入资源'} color={'rgba(145, 191, 229, 1)'} onClick={jumpToSource}/>
    </div>
  )
}

export default Accommodation

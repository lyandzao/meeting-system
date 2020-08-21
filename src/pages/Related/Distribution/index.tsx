/**
 * @ Author: zao
 * @ Create Time: 2020-08-20 18:49:22
 * @ Modified by: zao
 * @ Description: car或者room的详情
 */

import React, { ReactElement } from 'react'
import style from './style.module.scss'
import Button from '@/components/commons/Button'

interface Props {
  num?: string;
  type?: 'car' | 'room';
  list?: {
    type: string;
    num: string;
    price?: string;
  }[]
}

const Room = ({ list }: {
  list?: {
    type?: string;
    num?: string;
    price?: string;
  }[]
}): ReactElement => {
  return (
    <table>
      <tr>
        <th>房型</th>
        <th>数量</th>
        <th>价格</th>
      </tr>
      {list?.map((item, index) => {
        return (
          <tr key={`car${index}`}>
            <td>{item.type}</td>
            <td>{item.num}</td>
            <td>{item.price}</td>
          </tr>
        )
      })}
    </table>)
}

const Car = ({ list }: {
  list?: {
    type?: string;
    num?: string;
  }[]
}): ReactElement => {
  return (
    <table>
      <tr>
        <th>车型</th>
        <th>数量</th>
      </tr>
      {list?.map((item, index) => {
        return (
          <tr key={`car${index}`}>
            <td>{item.type}</td>
            <td>{item.num}</td>
          </tr>
        )
      })}
    </table>)
}

function Distribution({ num, type,list }: Props): ReactElement {
  return (
    <div className={style.container}>
      {type === 'room' && (
        <div>
          <div className={style.header}>
            <div className={style.tt}>剩余房间: <span>{num}</span>间</div>
          </div>
          <Room list={list}/>
        </div>
      )}
      {type === 'car' && (
        <div>
          <div className={style.header}>
            <div className={style.tt}>剩余车辆: <span>{num}</span>辆</div>
          </div>
          <Car list={list}/>
        </div>
      )}
    </div>
  )
}

export default Distribution

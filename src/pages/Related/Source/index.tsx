import React, { ReactElement } from 'react'
import Guest from './Guest'
import Car from './Car'
import Room from './Room'
import {useParams} from 'react-router-dom'
import style from './style.module.scss'
interface Props {
  meetingId: string;
}

function Source({}: Props): ReactElement {
  const {meetingId}=useParams()
  return (
    <div className={style.container}>
      <Guest meetingId={meetingId as string} />
      <Car meetingId={meetingId as string} />
      <Room meetingId={meetingId as string}/>
    </div>
  )
}

export default Source

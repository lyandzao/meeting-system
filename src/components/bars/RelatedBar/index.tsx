import React, { ReactElement } from 'react'
import { NavLink,useParams } from 'react-router-dom'
import style from './style.module.scss'

interface Props extends Icontainer{
  title: string;
}

function RelatedBar({ className,title }: Props): ReactElement {
  const {meetingId}=useParams()
  return (
    <ul className={`${className} ${style.container}`}>
      <h2 className={style.title}>{title}</h2>
      <div className={style.bar}>
        <li className={style.aircraft}><NavLink to={`/aircraft/${meetingId}`} exact activeClassName={style.active}></NavLink>接机服务</li>
        <li className={style.accommodation}><NavLink to={`/accommodation/${meetingId}`} exact activeClassName={style.active}></NavLink>住宿安排</li>
        <li></li>
      </div>

    </ul>
  )
}

export default RelatedBar

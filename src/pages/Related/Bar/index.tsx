import React, { ReactElement } from 'react'
import Guest from '@/components/commons/Guest'
import style from './style.module.scss'
import Button from '@/components/commons/Button'
interface Props {
  num?: string;
  guestList?: {
    img: string;
    name: string;
  }[];
  callback?: () => any;
}

function Bar({num='5',guestList,callback}: Props): ReactElement {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.tt}>已安排嘉宾: <span>{num}</span>人</div>
        <Button className={style.btn} value={'查看详情'} color={'rgba(253, 202, 48, 1)'}/>
      </div>
      <div className={style.list}>
        {
          guestList?.map((item, index) => {
            return <Guest key={`guest${index}`} img={item.img} name={item.name}/>
          })
        }
      </div>
    </div>
  )
}

export default Bar

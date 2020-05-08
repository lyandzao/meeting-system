import React, { ReactElement } from 'react'
import InfoHeader from '@/pages/Home/Info/Header'
import RelatedBar from '@/components/bars/RelatedBar'
import style from './style.module.scss'
interface Props {
  
}

function Info({}: Props): ReactElement {
  return (
    <div className={style.container}>
      <InfoHeader/>
      <RelatedBar className={style.relatedBar} title={'会务资源安排'}/>
    </div>
  )
}

export default Info

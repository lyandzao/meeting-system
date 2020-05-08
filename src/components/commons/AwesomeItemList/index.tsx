import React, { ReactElement } from 'react'
import Item from './Item';
import style from './style.module.scss'
import { Spin } from "antd";
import Retry from '@/components/commons/Retry'
interface Props {
  title: string;
  loading?: boolean;
  itemList?: any[];
  className?: string;
  errorHandle?: () => any;
}

function AwesomeItemList({ loading = false, title = '', className, itemList, errorHandle }: Props): ReactElement {
  return (
    <div className={`${className} ${style.container}`}>
      <h2 className={style.title}>{title}</h2>
      <Spin spinning={loading}>
        <div className={style.list}>
          {itemList
            ? itemList.map((item, index) => <Item key={`${item.id}-${index}`} item={item} />)
            : !loading ?
              <Retry className={style.err} callback={errorHandle} />
              : <></>}
        </div>
      </Spin>
    </div>
  )
}

export default AwesomeItemList

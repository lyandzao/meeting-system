import React, {
  ReactElement,
  useState,
} from 'react';


import AwesomeItemList from '@/components/commons/AwesomeItemList'
import { getUserRelatedItem } from '@/services/apis/item';
import { transformAwesomeItemList } from '@/utils/itemDataTransfer';
import { useRequest } from '@umijs/hooks';

import style from './style.module.scss';

interface Props {

}


function Awesome({ }: Props): ReactElement {
  const [createdList, setCreatedList] = useState<any[]>()
  const [appliedList, setAppliedList] = useState<any[]>()
  const myCreatedItemR = useRequest(() => getUserRelatedItem(1), {
    onSuccess: (result, params) => {
      if (result.data) {
        setCreatedList(transformAwesomeItemList(result.data.meetings, true))
      }
    }
  })
  const myAppliedItemR = useRequest(() => getUserRelatedItem(2), {
    onSuccess: (result, params) => {
      if (result.data) {
        setAppliedList(transformAwesomeItemList(result.data.meetings, false))
      }
    }
  })

  return (
    <div className={style.container} >
      <AwesomeItemList title='我的会议' loading={myCreatedItemR.loading} itemList={createdList} errorHandle={myCreatedItemR.refresh} />
      <AwesomeItemList title='参加的会议' loading={myAppliedItemR.loading} itemList={appliedList} errorHandle={myAppliedItemR.refresh} />
    </div>
  )
}

export default Awesome

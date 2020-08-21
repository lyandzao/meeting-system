/**
 * @ Author: zao
 * @ Create Time: 2020-08-20 18:49:22
 * @ Modified by: zao
 * @ Description: 做倒计时倒数
 */
// TODO: 改用ref取代state

import { useState } from 'react';

const useCountdown = (
  initial: number
): [number, () => void, boolean] => {
  const [count, setCount] = useState(initial);
  const [timeStatus, setTimeStatus] = useState(false);
  
  let timer: any;
  const countdown = () => {
    setCount(count => {
      if (count > 0) {
        return count-1
      } else {
        clearInterval(timer)
        setTimeStatus(false)
        return initial
      }
    })
  }
  const start = () => {
    setTimeStatus(true)
    timer=setInterval(countdown,1000)
  }

  return [count, start, timeStatus];
};

export default useCountdown
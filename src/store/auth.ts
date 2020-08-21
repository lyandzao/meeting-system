/**
 * @ Author: zao
 * @ Create Time: 2020-08-20 18:49:22
 * @ Modified by: zao
 * @ Description: 全局的登陆状态
 */

import { useState, useCallback } from 'react'
import { createContainer } from "unstated-next"

function useAuth() {
  const [isLogin, setIsLogin] = useState(false)
  return { isLogin, setIsLogin }
}

let Auth=createContainer(useAuth)

export default Auth
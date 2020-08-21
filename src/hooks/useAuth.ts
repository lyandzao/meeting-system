/**
 * @ Author: zao
 * @ Create Time: 2020-08-21 21:35:53
 * @ Modified by: zao
 * @ Description: 取全局的token,做登陆检查
 */

import useStorage from './useStorage'

const useAuth = () => {
  const [token, setToken, clearToken] = useStorage('user_token')
  return {
    token,
    setToken,
    clearToken
  };
}

export default useAuth
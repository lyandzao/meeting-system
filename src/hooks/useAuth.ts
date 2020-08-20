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
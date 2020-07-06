import { useRef,useCallback} from 'react'
import { createContainer } from "unstated-next"

function useMeetingId() {
  const meetingId = useRef('')
  const setMeetingId=useCallback(
    (target) => {
      meetingId.current=target
    },
    [],
  )
  return {meetingId,setMeetingId}
}

let Auth = createContainer(useMeetingId)

export default Auth
'use client'
import { WebinarWithPresenter } from '@/lib/type'
import { Call, StreamCall, useStreamVideoClient } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import LiveWebinarView from '../Common/LiveWebinarView'
import { Webinar } from '@prisma/client'

type Props = {
    userId: string
    username: string
    callId: string
callType: string
webinar: WebinarWithPresenter | Webinar
token: string
}

const CustomLiveStreamPlayer = ({userId, username, callId, callType, webinar, token}: Props) => {
    const client = useStreamVideoClient()
    const [call, setCall] = useState<Call>()
    const [showChat, setShowChat] = useState(true)
    useEffect(() => {
        if (!client) return
        const myCall = client.call(callId, callType)
        setCall(myCall)
        myCall.join().catch((error) => console.error("Failed to join call:", error))
        return () => {
            myCall.leave().catch((error) => console.error("Failed to leave a call:",error))
            setCall(undefined)

        }
    }, [client, callId, callType])
    if (!call) return null

  return (
    <StreamCall call={call}>
        <LiveWebinarView
showChat={showChat}
setShowChat={setShowChat}
webinar={webinar}
isHost={true}
username={username}
userId={userId}
userToken={token}
        />
    </StreamCall>
  )
}

export default CustomLiveStreamPlayer
import { WebinarWithPresenter } from '@/lib/type'
import { User, Webinar } from '@prisma/client'
import React from 'react'
import {StreamVideo, StreamVideoClient, User as StreamUser} from "@stream-io/video-react-sdk"
import CustomLiveStreamPlayer from './CustomLiveStreamPlayer'

type Props = {
    apiKey: string
    token: string
    callId: string
    webinar: WebinarWithPresenter | Webinar,
    user: User
}


const LiveStreamState = ({apiKey, token, callId, webinar, user}: Props) => {

  const streamUser: StreamUser = { id: user.id }
       const client = new StreamVideoClient({apiKey, user: streamUser, token})
  return (
    <StreamVideo client={client}>
        <CustomLiveStreamPlayer
        userId={user.id}
        username={user.name}
    callId={callId}
callType='livestream'
webinar={webinar}
token={token}
        
        />
    </StreamVideo>
  )
}

export default LiveStreamState
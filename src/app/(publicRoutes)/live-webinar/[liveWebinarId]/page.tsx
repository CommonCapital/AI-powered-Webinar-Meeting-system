import { onAuthenticateUser } from '@/actions/auth'
import { getWebinarById, getWebinarByPresenterId } from '@/actions/webinar'
import React from 'react'
import RenderWebinar from './_components/RenderWebinar'
import { getTokenFromUserId } from '@/actions/stream'

type Props = {
    params: Promise<{liveWebinarId: string}>
    searchParams: Promise<{error: string}>
}

const page = async ({params, searchParams}: Props) => {
 const {liveWebinarId} = await params
 const {error} = await searchParams

 const webinarData = await getWebinarById(liveWebinarId)
 if (!webinarData) {
    return (
        <div className='w-full min-h-screen flex justify-center items-center text-lg sm:text-4xl'>Webinar not found.</div>
    )
 }


 const checkUser = await onAuthenticateUser()
 const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!
 const token = await getTokenFromUserId(checkUser.user?.id)
 const callId = process.env.STREAM_CALL_ID!


    return (
    <div className='w-full min-h-screen mx-auto'>
<RenderWebinar 
apiKey={apiKey}
token={token}
callId={callId}
user = {checkUser.user || null}
error={error}
webinar={webinarData}
/>
    </div>
  )
}

export default page
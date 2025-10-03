'use client'
import { User, Webinar, WebinarStatusEnum } from '@prisma/client'
import React, { useEffect } from 'react'
import WebinarUpcomingState from './Upcoming webinar/WebinarUpcomingState'
import { usePathname, useRouter } from 'next/navigation'
import { useAttendeeStore } from '@/store/useAttendedStore'
import { toast } from 'sonner'
import LiveStreamState from './LiveWebinar/LiveStreamState'
import { WebinarWithPresenter } from '@/lib/type'

type Props = {
    error: string | undefined
    user: User | null
    webinar: WebinarWithPresenter | Webinar
    apiKey: string
    token: string
    callId: string
   
}

const RenderWebinar = ({error, user, webinar, apiKey, token, callId}: Props) => {
 const router = useRouter()
 const pathname = usePathname()
 const attendee = useAttendeeStore()

 useEffect(() => {
    if (error) {
        toast.error(error)
        router.push(pathname)
    }
 }, [error])
    return (
    <React.Fragment>
{webinar.webinarStatus === WebinarStatusEnum.SCHEDULED ? (
    <WebinarUpcomingState
    webinar={webinar}
    currentUser={user || null}

    />
) : (
    webinar.webinarStatus === WebinarStatusEnum.WAITING_ROOM ? (
        <WebinarUpcomingState webinar={webinar} currentUser={user || null}/>
    ) : (
        webinar.webinarStatus === WebinarStatusEnum.LIVE ? (
            //TODO Add live meeting component
            <React.Fragment>
                {user?.id === webinar.presenterId ? (
                     <LiveStreamState
                     apiKey={apiKey}
                     token={token}
                     callId={callId} 
                     webinar={webinar}
                     user={user}
                     />
                    
                ) :
                (attendee ? (
                    // <Participant 
                    //     apiKey={apiKey}
                    //     token={token}
                    //     callId={callId}
                    // />
                    'Hello'
                ) : (
                    <WebinarUpcomingState
                        webinar={webinar}
                        currentUser={user || null}
                    />
                ))
             } </React.Fragment>
        ) : (
            webinar?.webinarStatus === WebinarStatusEnum.CANCELLED ? (<div className='flex justify-center items-center h-full w-full'>
                <div className='text-center space-y-4'
                >
                    <h3 className='text-2xl font-semibold text-primary'>{webinar?.title}</h3>
                     <p className='text-muted-foreground text-xs'>This webinar has been cancelled</p>
                </div>
            </div>) : ""
        )
    )
)}
    </React.Fragment>
  )
}

export default RenderWebinar
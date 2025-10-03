'use client'
import {  User, Webinar, WebinarStatusEnum } from '@prisma/client'
import React, { useState } from 'react'
import CountDownTimer from './CountDownTimer'
import WaitListComponent from './WaitListComponent'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Loader2 } from 'lucide-react'
import { changeWebinarStatus } from '@/actions/webinar'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'


type Props = {webinar: Webinar, currentUser: User | null}

const WebinarUpcomingState = ({webinar, currentUser}: Props) => {
const router = useRouter()
    const [loading, setLoading] = useState(false)
const handleStartMeeting = async () => {
setLoading(true)
try {
   const res = await  changeWebinarStatus(webinar.id, 'LIVE')
   if (!res.success ) {
    throw new Error(res.message)
   }
   toast.success('Webinar started successfully')
   router.refresh()
} catch (error) {
    console.error(error)
    toast.error("Failed to start meeting")

} finally {
    setLoading(false)
}
}
    return (
    <div className='w-full min-h-screen mx-auto mac-w-[400px] flex flex-col justify-center
    items-center gap-8 py-20'>
<div className='space-y-6'>
<p className='text-3xl font-semibold text-primary text-center'>
    Seems like you are slightly early
</p>
<CountDownTimer
targetDate={new Date(webinar.startTime)}
className="text-center"
webinarId={webinar.id}
webinarStatus={webinar.webinarStatus}
     />
     <div className='space-y-6 w-full h-full flex justify-center items-center flex-col'> 

</div>
{webinar?.webinarStatus === WebinarStatusEnum.SCHEDULED ? (
  <div className="flex justify-center">
    <WaitListComponent
      webinarId={webinar.id}
      webinarStatus={WebinarStatusEnum.SCHEDULED}
    />
  </div>
) : webinar?.webinarStatus === WebinarStatusEnum.WAITING_ROOM ? (
  <div className="flex justify-center">
    {currentUser?.id === webinar?.presenterId ? (
      <Button className="w-full max-w-[300px] font-semibold" onClick={handleStartMeeting} disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="animate-spin mr-2" />
            Starting...
          </>
        ) : (
          "Start Meeting"
        )}
      </Button>
    ) : (
      <WaitListComponent
        webinarId={webinar.id}
        webinarStatus={WebinarStatusEnum.WAITING_ROOM}
      />
    )}
  </div>
) : webinar?.webinarStatus === WebinarStatusEnum.LIVE ? (
  <div className="flex justify-center">
    <WaitListComponent
      webinarId={webinar.id}
      webinarStatus={WebinarStatusEnum.LIVE}
    />
  </div>
) : webinar?.webinarStatus === WebinarStatusEnum.CANCELLED ? (
  <p className="text-center text-red-500">Webinar Cancelled</p>
) : (
  <div className="flex justify-center">
    <Button className="w-full max-w-[300px] font-semibold" onClick={() => router.push('/')}>
      Ended
    </Button>
  </div>
)}
    </div>
    <div className='text-center space-y-4'>
        <h3 className='text-2xl font-semibold text-primary'>
         {webinar.title}
        </h3>
    <p className='text-muted-foreground text-xs'>
{webinar.description}
    </p>
    <div className='w-full justify-center flex gap-2 flew-wrap items-center'>
        <Button
        variant={'outline'

        }
        className='rounded-md bg-secondary backdrop-blur-2xl'
        >
<Calendar className='mr-2' />
{format(new Date(webinar.startTime), 'dd/MM/yyyy')}
        </Button>
        <Button variant={'outline'}>
            <Clock className='mr-2' />
            {format(new Date(webinar.startTime), 'hh:mm a')}
        </Button>

    </div>
    </div>
    </div>
  )
}

export default WebinarUpcomingState
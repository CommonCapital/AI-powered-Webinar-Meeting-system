'use client'
import { registerAttendee } from '@/actions/attendace'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useAttendeeStore } from '@/store/useAttendedStore'
import { WebinarStatusEnum } from '@prisma/client'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

type Props = {
    webinarId: string,
    webinarStatus: WebinarStatusEnum,
    onRegistred?: () => void
}

const WaitListComponent = ({webinarId, webinarStatus, onRegistred}: Props) => {
 const [isOpen, setIsOpen] = useState(false)
 const [email, setEmail] = useState('')
 const [name, setName] = useState('')
 const [isSubmitting, setIsSubmitting ] = useState(false)
 const [submitted, setSubmitted] = useState(false)
 const {setAttendee} = useAttendeeStore()

 const router = useRouter()
 const button = () => {
    switch (webinarStatus) {
        case WebinarStatusEnum.SCHEDULED:
            return 'Get Reminder'
        case WebinarStatusEnum.WAITING_ROOM:
            return "Get Reminder"
        case WebinarStatusEnum.LIVE:
            return "Join Meeting"
        default:
            return "Register"
    }
 }
 const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault()
setIsSubmitting(true)
try {
    const res = await registerAttendee({
        email,
        name,
        webinarId
    })
    if (!res.success) {
        throw new Error(res.message || "Failed to register attendee")
    }
    if (res?.data?.user) {
        setAttendee({
            id: res.data.user.id,
            name: res.data.user.id,
            email: res.data.user.email,
            callStatus: "PENDING",
            createdAt: new Date(), 
    updatedAt: new Date(), 
        })
    }

    toast.success(
webinarStatus === WebinarStatusEnum.LIVE ? "Successfully joined the webinar" : "Successfully registred for webinar"
    )
    setEmail("")
    setName("")
    setSubmitted(true)

    setTimeout(() => {
        setIsOpen(false)
        if (webinarStatus === WebinarStatusEnum.LIVE) {
            router.refresh()
        }

        if (onRegistred) onRegistred()

    }, 1500)
} catch (error) {
    console.error("Error submitting waitlist form:", error)
    toast.error(
        error instanceof Error ? error.message : "Something went wrong"
    )
} finally {
    setIsSubmitting(false)
}
 }
    return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
       <DialogTrigger asChild >
        <Button className={`${
            webinarStatus === WebinarStatusEnum.LIVE ? 'bg-red-600 hover:bg-red-700' : 'bg-primary hover:bg-primary/90'
        } rounded-md px-4 py-2 text-primary-foreground flex items-center justify-center text-sm font-semibold`}>
{webinarStatus === WebinarStatusEnum.LIVE && (
    <span className='mr-2 h-2 w-2 bg-white rounded-full animate-pulse'></span>
)}
<div className='flex items-center animate-pulse'>{button()}</div>
        </Button>
       </DialogTrigger>
       <DialogContent className='border-0 bg-transparent' isHideCloseButton={true}>
        <DialogHeader className='justify-center items-center border border-input rounded-xl p-4 bg-background'>
            <DialogTitle className='text-center text-lg font-semibold mb-4'>
                {webinarStatus === WebinarStatusEnum.LIVE ? "Join the Meeting" : "Join the Waitlist"}
            </DialogTitle>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
               {!submitted && (
                <React.Fragment>
                    <Input
                     type="text"
                     placeholder="Your Name"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     required
                    />
                     <Input
                     type="email"
                     placeholder="Your Email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                    />
                </React.Fragment>
               )} 
               <Button type="submit" className='w-full' disabled={isSubmitting || submitted}>
{isSubmitting ? (
<>
<Loader2 className='animate-spin mr-2'/>{" "}
{webinarStatus === WebinarStatusEnum.LIVE ? "Joining..." : "Registering..."}

</>
): submitted ? (
    webinarStatus === WebinarStatusEnum.LIVE ? "You're all set to join " : "You've successfully joined the waitlist!"
): webinarStatus === WebinarStatusEnum.LIVE ? "Join the Meeting" : "Join the waitlist" }
               </Button>
            </form>
        </DialogHeader>
       </DialogContent>
    </Dialog>
  )
}

export default WaitListComponent
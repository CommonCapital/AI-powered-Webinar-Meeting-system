'use client'
import { WebinarWithPresenter } from '@/lib/type'
import { CtaTypeEnum, Webinar } from '@prisma/client'
import { MessageSquare, Users } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {ParticipantView, useCallStateHooks} from '@stream-io/video-react-sdk'
import {StreamChat} from 'stream-chat'
import { title } from 'process'
import "stream-chat-react/dist/css/v2/index.css"
import { Button } from '@/components/ui/button'
import {Chat, Channel, MessageList, MessageInput} from "stream-chat-react"
import CTADialogBox from './CTADialogBox'
type Props = {
    showChat: boolean
    setShowChat: (show: boolean) => void
    webinar: WebinarWithPresenter | Webinar
    isHost?: boolean
    username: string
    userId: string
    userToken: string
}

const LiveWebinarView = ({showChat, setShowChat, webinar, isHost, username, userId, userToken}: Props) => {
    const {useParticipantCount, useParticipants} = useCallStateHooks()
    const viewerCount = useParticipantCount()
    const participants = useParticipants()
    const hostParticipant = participants.length > 0 ? participants[0] : null

     const [chatClient, setChatClient] = useState<StreamChat | null>(null)
     const [channel, setChannel] = useState<any>(null)
     const [dialogOpen, setDialogOpen] = useState(true)
     const handleCTAButtonClick = async () => {
         if (!channel) return 
         console.log('CTA Button Clicked', channel)
         await channel.sendEvent({
            type: "open_cta_dialog",
         })
     }
     useEffect(() => {
        const initChat = async () => {
            const client = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY!)
            
            await client.connectUser(
            {
                    id: userId,
                    name: username,
            },
            userToken
        )
      const channel = client.channel('livestream', webinar.id, { name:  webinar.title}
    );

        await channel.watch()

        setChatClient(client)
        setChannel(channel)
        }

        initChat()
        
        

        return () => {
            if (chatClient) {
                chatClient.disconnectUser()
            }
        }

     }, [userId, username, userToken, webinar.id, webinar.title])
     
   
     useEffect(() => {
if (chatClient && channel) {
    channel.on((event: any) => {
        if (event.type === 'open_cta_dialog' && !isHost) {
            setDialogOpen(true)
        }
    })
}
     }, [chatClient, channel, isHost])
      if (!chatClient || !channel) return null;
  return (
    <div className='flex flex-col w-full h-screen max-h-screen overflow-hidden bg-background text-foreground'>
<div className='py-2 px-4 border-b border-border flex items-center justify-between'>
<div className='flex items-center space-x-2'>
<div className='bg-accent-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium flex items-center'>

<span className='relative flex h-2 w-2 mr-2'>
    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75'></span>
    <span className='relative inline-flex rounded-full h-2 w-2 bg-destructive animate-pulse'></span>
</span>

LIVE

</div>
</div>

<div className='flex items-center space-x-3'>

    <div className='flex items-center space-x-1 bg-muted/50 px-3 py-1 rounded-full'>

    <Users size={16}/>
    <span className='text-sm'>{viewerCount}</span>

    </div>
<button onClick={() => setShowChat(!showChat)}
    className={`px-3 py-1 rounded-full text-sm flex items-center space-x-1 ${
        showChat ? "bg-accent-primary text-primary-foreground" : "bg-muted/50"
    }`}
    >
<MessageSquare size={16} />
<span>Chat</span>
</button>
</div>

</div>


<div className='flex flex-1 p-2 gap-2 overflow-hidden'>
<div className='flex-1 rounded-lg overflow-hidden border border-border flex flex-col bg-card'>
<div className='flex-1 relative overflow-hidden'>
{hostParticipant ? 
(
    <div className='w-full h-full'>
        <ParticipantView
participant={hostParticipant}
className='w-full h-full object-cover !max-w-full'
        />
    </div>
) : (
    <div className='w-full h-full flex items-center justify-center text-muted-foreground flex-col space-y-4'
    >
        <div className='w-24 h-24 rounded-full bg-muted flex items-center justify-center'
        
        >
            <Users size={40}
            className='text-muted-foreground'/>
            
        </div>
        <p>Waiting for stream to start</p>
    </div>
)}

{isHost && (
    <div className='absolute top-4 right-4 bg-background/80 nackdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium'> Host
    </div>
)}
</div>

<div className='p-2 border-t border-border flex items-center justify-between py-2'>
<div className='flex items-center space-x-2'>

    <div className='text-sm items-center space-x-2'>
        {webinar.title}
    </div>

</div>

{isHost && (
    <div className='flex items-center space-x-1'>
<Button onClick={handleCTAButtonClick}>
{webinar.ctaType === CtaTypeEnum.BOOK_A_CALL ? "Book a call" : "Buy Now"}
</Button>
    </div>
)}

</div>

</div>

{showChat && (
    <Chat client={chatClient}>
        <Channel channel={channel}>
            <div className='w-72 bg-card border border-border rounded-lg overflow-hidden flex flex-col'>

                <div className='py-2 px-3 border-b border-border font-medium flex items-center justify-between'>

                    <span>Chat</span>
                    <span className='text-xs bg-muted px-2 py-0.5 rounded-full'>{viewerCount} viewers</span>

                </div>
              <MessageList />

              <div className='p-2 border-t border-border'>
                <MessageInput />
              </div>
            </div>
        </Channel>
    </Chat>
)}

</div>

{dialogOpen && (
    <CTADialogBox
open={dialogOpen}
onOpenChange={setDialogOpen}
webinar={webinar}
userId={userId}

/>
)}


    </div>
  )
}

export default LiveWebinarView
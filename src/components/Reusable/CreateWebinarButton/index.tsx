"use client"

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useWebinarStore } from '@/store/useWebinarStore'
import { PlusIcon } from 'lucide-react'
import React, { useState } from 'react'
import MultiStepForm from './MultiStepForm'
import BasicInfoStep from './BasicInfoStep'
import CTAStep from './CTAStep'
import AdditionalInfoStep from './AdditionalInfoStep'
import Stripe from 'stripe'
import SuccessStep from './SuccessStep'

type Props = {
    stripeProducts: Stripe.Product[] | []
}



const CreateWebinarButton = ({stripeProducts}: Props) => {
    const {isModalOpen, setModalOpen, isComplete, setComplete, resetForm} = useWebinarStore()

    const [webinarLink, setWebinarLink] = useState<string>("")
    const steps = [
      { id: "basicInfo", title: "Basic Information", description: "Fill out the basic information for the meeting", component: <BasicInfoStep /> }, 
      { id: 'cta', title: "CTA", description: "Please provide the end-point for your attendaces through your meeting", component: (<CTAStep assistants={[]} stripeProducts={stripeProducts}/>)},
      { id: 'additionalInfo', title: 'Additional Information', description: "Please fill out information about additional options if necessary", component: <AdditionalInfoStep />}
      
    ];
    const handleComplete = (webinarId: string) => {
setComplete(true)
setWebinarLink(`${process.env.NEXT_PUBLIC_BASE_URL}/live-webinar/${webinarId}`)
    }
    const handleCreateNew = () => {
resetForm()
    }
  return (
    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
       <DialogTrigger asChild>
          <button className='rounded-xl flex gap-2 items-center hover:cursor-pointer px-4 py-2 border border-border bg-primary/10 backdrop-blur-sm text-sm font-normal text-primary hover:bg-primary-20'
          onClick={() => setModalOpen(true)}>
            <PlusIcon />
            Create Meeting
          </button>
       </DialogTrigger>
     <DialogContent className='sm:max-w-[900px] p-0 bg-transparent border-none'>
       {isComplete ? (
<div className='bg-muted text-primary rounded-lg overflow-hidden'>
    <DialogTitle className='sr-only'>Meeting Created</DialogTitle>
<SuccessStep
webinarLink={webinarLink}
onCreateNew={handleCreateNew}

/>
</div>
       ) : (
        <>
        <DialogTitle className='sr-only'>Meeting </DialogTitle>
        <MultiStepForm  steps={steps} onComplete={handleComplete}  />
        </>
       )}
     </DialogContent>
    </Dialog>
  )
}

export default CreateWebinarButton;
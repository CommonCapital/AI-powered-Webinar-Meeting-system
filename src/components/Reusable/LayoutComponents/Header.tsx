"use client"
import { Button } from "@/components/ui/button"
import { User } from "@prisma/client"
import { ArrowLeft, CloudLightningIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

import PurpleIcon from "../PurpleIcon"
import CreateWebinarButton from "../CreateWebinarButton"
import Stripe from "stripe"

import SubscriptionModal from "../SubscriptionModal"
import { StripeElements } from "../Stripe/Element"

type Props = {user: User; stripeProducts: Stripe.Product[] | []}



const Header = ({user, stripeProducts}: Props) => {
    const pathname = usePathname()
    const router = useRouter()
    
return (
    <div className="w-full px-4 pt-10 sticky top-0 z-10 flex justify-between items-center flex-wrap gap-4 bg-background"> 
      {pathname.includes('pipeline' ) ? (
        <Button
        className="bg-primary/10 border border-border rounded-2xl" variant={'outline' } onClick={() => router.push('/webinars')}
        >
            <ArrowLeft /> Back to Webinars
        </Button>
      ) :(<div className="px-4 py-2 flex justify-center text-bold items-center rounded-xl bg-background border border-border text-primary capitalize">
        {pathname.split('/')[1]}
        </div>)}

        <div className="flex gap-6 items-center flex-wrap">
    <PurpleIcon>
        <CloudLightningIcon />
    </PurpleIcon>

   {/* {user.subscription ? 
   (<CreateWebinarButton stripeProducts={stripeProducts}/>) : (
        <StripeElements>
            <SubscriptionModal user={user} />
        </StripeElements>
    )}*/}
<CreateWebinarButton stripeProducts={stripeProducts}/>
        </div>
    </div>)
}

export default Header
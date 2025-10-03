import { useStripeElements } from '@/lib/stripe/stripe-client';
import React from 'react'
import {Elements} from '@stripe/react-stripe-js';
type Props = {children: React.ReactNode}

export const StripeElements = ({children}: Props) => {
 const {StripePromise} = useStripeElements();
 const promise = StripePromise();
    return (
    promise && <Elements stripe={promise}>{children}</Elements>
  )
}

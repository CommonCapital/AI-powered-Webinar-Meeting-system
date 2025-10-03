import { onAuthenticateUser } from '@/actions/auth'
import { getAllProductsStripeProduct } from '@/actions/stripe'
import Header from '@/components/Reusable/LayoutComponents/Header'
import Sidebar from '@/components/Reusable/LayoutComponents/Sidebar'
import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
 type Props = {
    children: React.ReactNode
 }

 const Layout =  async({children}: Props) => {
    const userExists = await onAuthenticateUser()

    if (!userExists.user) {
        redirect('/sign-in')
    }
    const stripeProducts = await getAllProductsStripeProduct()
    return (
        <div className='flex w-full m-h-screen'>
            <Sidebar />
            <div className='flex flex-col w-full h-screen overflow-auto px-4 scrollbar-hide container mx-auto'>
                <Header user={userExists.user} stripeProducts={stripeProducts.product || []}/>
                <div className='mt-10 backdrop-blur-[20px]'/>
          <div className='flex-1 py-10'>  {children}</div>
            </div>
        </div>
    )
 }

 export default Layout
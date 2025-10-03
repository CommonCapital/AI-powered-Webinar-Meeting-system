import { updateSubscription } from "@/actions/stripe";
import { stripe } from "@/lib/stripe";
import { Trykker } from "next/font/google";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
const STRIPE_SUBSCRIPTION_EVENT = new Set([
    "invoice.created",
    "invoice.finalized",
    "invoice.paid",
    "checkout.session.completed",
    "customer.subscription.created",
    "customer.subscription.updated",
    "customer.subscription.deleted",
])
const getStripeEvent = async (body: string, signature: string | null): Promise<Stripe.Event> => {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    if (!signature || !webhookSecret) {
        throw new Error("Stripe signature or webhook secret missing")

    }
    return stripe.webhooks.constructEvent(body, signature, webhookSecret)
}

export async function POST(request: NextRequest) {
console.log("Received Stripe event")
const body = await request.text()
const signature = (await headers()).get("Stripe-signature")

try {
    const stripeEvent = await getStripeEvent(body, signature)
    if (!STRIPE_SUBSCRIPTION_EVENT.has(stripeEvent.type)) {
        console.log("Unhandled irrelevant event!", stripeEvent.type)
        return NextResponse.json({received: true}, {status:200})
    }
    const event = stripeEvent.data.object as Stripe.Subscription
    const metadata = event.metadata
  if (
    metadata.connectAccountPayments ||
    metadata.connectAccountSubscriptions
  ) {
    console.log('Skipping connected account subscription event')
    return NextResponse.json(
        {message: "Skipping connected account event"},
        {status: 200}
    )
  }
switch (stripeEvent.type ) {
    case 'checkout.session.completed': 
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
            await updateSubscription(event)
            console.log("CREATED FROM WEBHOOK", event)
            return NextResponse.json({received: true}, {status: 200})

    default:
        console.log("Unhandled relevant event!", stripeEvent.type)
        return NextResponse.json({recevied: true} , {status: 200} )
        } 
} catch (error: any) {
    console.error("Webhook processing error:", error)
    return new NextResponse(`Webhook Error: ${error.message}`, {
        status: error.statusCode || 500,
    })
}
}
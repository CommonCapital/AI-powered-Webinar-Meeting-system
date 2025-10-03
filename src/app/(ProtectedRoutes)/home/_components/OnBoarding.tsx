'use client'

import { onBoardingSteps } from "@/lib/data"
import { CheckCircle } from "lucide-react"
import Link from "next/link"


const OnBoarding = () => {
    return (
        <div className="flex flex-col gap-1 items-start justify-start">
           {onBoardingSteps.map((step, index) => (
            <Link
key={index} href={step.link} className="flex items-center gap-2"
            >
            <CheckCircle />
            <p className="text-base text-foreground">{step.title}</p>
            </Link>
           ))}
        </div>
    )
}

export default OnBoarding
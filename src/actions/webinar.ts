'use server'

import { WebinarFormState } from "@/store/useWebinarStore"
import { onAuthenticateUser } from "./auth"
import { PrismaClient, WebinarStatusEnum } from "@prisma/client"
import { prismaClient } from "@/lib/prismaClient"
import { revalidatePath } from "next/cache"
function combineDateTime(date: Date, time: string, timeFormat: "AM" | "PM"): Date {
 const [hours, minutes] = time.split(":")
 let hour = Number.parseInt(hours, 10)
 let minute = Number.parseInt(minutes || '0', 10)

 if (timeFormat === 'PM' && hour<12) {
    hour += 12

 } else if (timeFormat === 'AM' && hour === 12) {
    hour = 0
 }

 const result = new Date(date)
 result.setHours(hour, minute, 0, 0)
 return result
 

}
export const createWebinar = async (formData: WebinarFormState) => {
    try {
        const user = await onAuthenticateUser()
        if (!user) {
            return {status: 401, message: "Unauthorized"}

        }
        {/* Adjust it for Advisora*/}
       // if (!user.user?.subscription) {
       //     return {status: 402, message: "Subscription is required"}
       // }
       const presenterId = user.user?.id

     console.log('Form Data:', formData, presenterId)

     if (!formData.basicInfo.date) {
        return {status: 404, message: "Webinar's date is required"}
     }
     if (!formData.basicInfo.time) {
        return {status: 404, message: "Webinar's time is required"}
     }

     const combinedDateTime = combineDateTime(
        formData.basicInfo.date,
        formData.basicInfo.time,
        formData.basicInfo.timeFormat || "AM"
     )
     const now = new Date()
     if(combinedDateTime < now) {
         return {
            status: 400,
            message: "Webinar date and time cannot be in the past"
         }
     }

     const webinar = await prismaClient.webinar.create({
        data: {
            title: formData.basicInfo.webinarName || "",
            description: formData.basicInfo.description || "",
            startTime: combinedDateTime,
            tags: formData.cta.tags || [],
            ctaLabel: formData.cta.ctaLabel,
            ctaType: formData.cta.ctaType,
            aiAgentId: formData.cta.aiAgent || null,
            priceId: formData.cta.priceId || null,
            lockChat: formData.additionalInfo.lockChat || false,
            couponCode: formData.additionalInfo.couponEnabled ? formData.additionalInfo.couponCode : null,
            couponEnabled: formData.additionalInfo.couponEnabled || false,
              presenterId :  presenterId || "",

        },
     })

     revalidatePath('/')
     return {
        status: 200,
        message: "Webinar created successfully",
        webinarId: webinar.id,
        webinarLink: `/webinar/${webinar.id}`,
     }

    } catch (error) {
       console.error(`Error creating webinar:`+error)  
       return {status: 500, message: "Failed to create webinar"} 
    }
}

export const getWebinarByPresenterId = async (presenterId: string) => {
   try {const webinars = await prismaClient.webinar.findMany({
      where: {
         presenterId: presenterId
      },
      include: {
         presenter: {
            select: {
name: true,
stripeConnectId: true, //remove it further
 id: true,
            }
         }
      }
   })
return webinars
} catch (error) {
console.error("Error getting webinars:", error)
return []
}
}

export const getWebinarById = async (webinarId: string) => {
try {
   const webinar = await prismaClient.webinar.findUnique({
      where: {id: webinarId},
      include: {
         presenter: {
            select: {
               id: true,
               name: true,
               profileImage: true,
               stripeConnectId: true
            }
         }
      }
   })
   return webinar
} catch (error) {
   console.error("Error getting webinar:", error)
   throw new Error("Failed to fetch webinar")
}
}


export const changeWebinarStatus = async (webinarId: string, status: WebinarStatusEnum) => {
try {
   const webinar = await prismaClient.webinar.update({
      where: {
         id: webinarId
      },
      data: {
         webinarStatus: status,
      },
   });
   return {
      status: 200,
      success: true,
      message: "Webinar status updated successfully",
      data: webinar,
   };
} catch (error) {
   console.error(error)
   return {
      status: 500,
      success: false,
      message: "Failed"
   }
}
}
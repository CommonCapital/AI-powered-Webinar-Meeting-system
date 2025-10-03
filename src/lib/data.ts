import { CallStatusEnum } from "@prisma/client";
import { BotIcon, HomeIcon, Leaf, PersonStandingIcon, Settings, Settings2Icon, SparkleIcon, User, WebcamIcon } from "lucide-react";

export const sidebarData = [
    {
        id: 1,
        title: "Home",
        icon: HomeIcon,
        link: '/home'
    },
    {
        id: 2,
        title: "Webinars",
        icon: WebcamIcon,
        link: '/webinars',
    },
    {
        id: 3,
        title: 'Leads',
        icon: User,
        link: "/lead",
    },
    {id: 4,
     title: 'AI Agent',
     icon: BotIcon,
     link: "/ai-agents",
    },
    {
        id: 5,
        title: 'Settings',
        icon: Settings,
        link: "/settings",
    }
]

export const onBoardingSteps = [
    {id: 1, title: "Create a webinar", complete: false, link: ""},
    {id: 2, title: "Get leads ", complete: false, link: ''
    },
    {id: 3, title: "Conversion status", complete: false, link: ""}

]

export const potentialCustomers = [
    {
        id: "1",
        name: "John Doe",
        email: "Johndoe@gmail.com",
        clerkId: "1",
        profileImage: "/vercel.svg",
        isActive: true,
        lastLoginAt: null,
        createdAt: new Date(),
         updatedAt: new Date(),
         deletedAt: null,
         tags: ["New", "Hot Lead"],
         callStatus: CallStatusEnum.COMPLETED 
    },
        {
        id: "2",
        name: "John Doe",
        email: "Johndoe@gmail.com",
        clerkId: "2",
        profileImage: "/vercel.svg",
        isActive: true,
        lastLoginAt: null,
        createdAt: new Date(),
         updatedAt: new Date(),
         deletedAt: null,
         tags: ["New", "Hot Lead"],
         callStatus: CallStatusEnum.COMPLETED 
    },
        {
        id: "3",
        name: "John Doe",
        email: "Johndoe@gmail.com",
        clerkId: "3",
        profileImage: "/vercel.svg",
        isActive: true,
        lastLoginAt: null,
        createdAt: new Date(),
         updatedAt: new Date(),
         deletedAt: null,
         tags: ["New", "Hot Lead"],
         callStatus: CallStatusEnum.COMPLETED 
    },
]

export const subscriptionPriceId = `prod_T8KCAhhzdDwOHG`
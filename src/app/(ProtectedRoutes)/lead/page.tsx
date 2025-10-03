import PageHeader from '@/components/Reusable/PageHeader'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Settings, User2Icon, Webcam } from 'lucide-react'
import React from 'react'
import { leadData } from './data'

type Props = {}

const LeadPage = (props: Props) => {
  return (
    <div className='w-full flex flex-col gap-8'>
       <PageHeader
leftIcon={<Webcam className='w-3 h-3' />}
mainIcon={<User2Icon className='w-12 h-12' />}
rightIcon={<Settings className='w-3 h-3' />}
heading="The home to all your customers"
placeholder='Search customer...'
       />
       <Table>
    <TableHeader>
        <TableRow>
            <TableHead className='text-sm text-muted-foreground'>
                Name
            </TableHead>
            <TableHead className='text-sm text-muted-foreground'>
                Email
            </TableHead>
            <TableHead className='text-sm text-muted-foreground'>
                Phone
            </TableHead>
            <TableHead className=' text-right text-sm text-muted-foreground'>
                Tags
            </TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        {leadData?.map((lead, index) => (
            <TableRow key={index} className='border-0' >
            <TableCell className='font-medium'>{lead?.name}</TableCell>
            <TableCell>{lead?.email}</TableCell>
            <TableCell>{lead?.phone}</TableCell>
            <TableCell className='text-right'>
                    {lead?.tags?.map((tag, index) => (
  <Badge key={index} variant={'outline'}>{tag}</Badge>
                    ))}
            </TableCell>
        </TableRow>
        ))}
    </TableBody>
       </Table>
    </div>
  )
}

export default LeadPage
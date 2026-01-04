import { Bookmark } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
    const nagivate=useNavigate();
    const jobId=1234;
    const daysAgoFunction=(mongodbTime)=>{
        const createdAt=new Date(mongodbTime)
        const currentTime=new Date();
        const timeDifference=currentTime-createdAt;
        return Math.floor(timeDifference/(24*60*60*1000))
       }
    return (
        <div className="p-5 rounded-md bg-white shadow-lg border-gray-300 m-2 border">
            <div className="flex items-center justify-between gap-3">
                <h1>{daysAgoFunction(job?.createdAt)===0?'Today': `${daysAgoFunction(job?.createdAt)} days ago`}</h1>
                <Button variant='outline' className="rounded-xl" size='icon'><Bookmark /></Button>
            </div>
            <div className="flex gap-2 items-center my-2">
                <Button variant='outline' >
                    <Avatar size='icon '>
                        {/* <AvatarImage src="https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png" width={'50px'} /> */}
                        <AvatarImage  src={job?.company?.logo || "https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png"}  width={'50px'} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className="font-medium text-lg">{job?.company?.name}</h1>
                    <p className=" text-sm text-gray-500">{job?.location}</p>
                </div>
            </div>
            <div>
                <h1 className="font-bold text-lg">{job?.title}</h1>
                <p className="">{job?.description}</p>
            </div>
            <div className="flex gap-3 my-3">
                <Badge className="text-blue-500" variant='ghost'>{job?.position}</Badge>
                <Badge className="text-red-500" variant='ghost'>{job?.jobType}</Badge>
                <Badge className="text-violet-700" variant='ghost'>{job?.salary}</Badge>
            </div>
            <div className="flex gap-2">
                <Button onClick={()=>nagivate( `/description/${job?._id}`)} variant='outline'> details</Button>
                <Button variant='outline' className="bg-violet-800">Save for latter</Button>
            </div>
        </div>
    )
}

export default Job

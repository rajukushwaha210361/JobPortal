// import { Bookmark } from 'lucide-react'
// import React from 'react'
// import { Button } from './ui/button'
// import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
// import { Badge } from './ui/badge'
// import { useNavigate } from 'react-router-dom'

// const Job = ({job}) => {
//     const nagivate=useNavigate();
//     const jobId=1234;
//     const daysAgoFunction=(mongodbTime)=>{
//         const createdAt=new Date(mongodbTime)
//         const currentTime=new Date();
//         const timeDifference=currentTime-createdAt;
//         return Math.floor(timeDifference/(24*60*60*1000))
//        }
//     return (
//         <div className="p-5 rounded-md bg-white shadow-lg border-gray-300 m-2 border">
//             <div className="flex items-center justify-between gap-3">
//                 <h1>{daysAgoFunction(job?.createdAt)===0?'Today': `${daysAgoFunction(job?.createdAt)} days ago`}</h1>
//                 <Button variant='outline' className="rounded-xl" size='icon'><Bookmark /></Button>
//             </div>
//             <div className="flex gap-2 items-center my-2">
//                 <Button variant='outline' >
//                     <Avatar size='icon '>
//                         {/* <AvatarImage src="https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png" width={'50px'} /> */}
//                         <AvatarImage  src={job?.company?.logo || "https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png"}  width={'50px'} />
//                     </Avatar>
//                 </Button>
//                 <div>
//                     <h1 className="font-medium text-lg">{job?.company?.name}</h1>
//                     <p className=" text-sm text-gray-500">{job?.location}</p>
//                 </div>
//             </div>
//             <div>
//                 <h1 className="font-bold text-lg">{job?.title}</h1>
//                 <p className="">{job?.description}</p>
//             </div>
//             <div className="flex gap-3 my-3">
//                 <Badge className="text-blue-500" variant='ghost'>{job?.position}</Badge>
//                 <Badge className="text-red-500" variant='ghost'>{job?.jobType}</Badge>
//                 <Badge className="text-violet-700" variant='ghost'>{job?.salary}</Badge>
//             </div>
//             <div className="flex gap-2">
//                 <Button onClick={()=>nagivate( `/description/${job?._id}`)} variant='outline'> details</Button>
//                 <Button variant='outline' className="bg-violet-800">Save for latter</Button>
//             </div>
//         </div>
//     )
// }

// export default Job

import { Bookmark } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const nagivate = useNavigate()
    const jobId = 1234

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime)
        const currentTime = new Date()
        const timeDifference = currentTime - createdAt
        return Math.floor(timeDifference / (24 * 60 * 60 * 1000))
    }

    return (
        <div
            className="bg-white rounded-2xl border border-gray-200 p-5
                       shadow-sm hover:shadow-xl transition-all duration-300
                       hover:-translate-y-1 flex flex-col gap-4"
        >
            {/* Top Row */}
            <div className="flex items-center justify-between text-sm text-gray-500">
                <span>
                    {daysAgoFunction(job?.createdAt) === 0
                        ? 'Today'
                        : `${daysAgoFunction(job?.createdAt)} days ago`}
                </span>

                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full hover:bg-violet-100 hover:text-violet-700 transition"
                >
                    <Bookmark className="w-4 h-4" />
                </Button>
            </div>

            {/* Company Info */}
            <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 rounded-xl border bg-gray-50">
                    <AvatarImage
                        src={
                            job?.company?.logo ||
                            'https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png'
                        }
                        className="object-contain p-1"
                    />
                </Avatar>

                <div>
                    <h1 className="font-semibold text-base text-gray-800">
                        {job?.company?.name}
                    </h1>
                    <p className="text-sm text-gray-500">
                        {job?.location}
                    </p>
                </div>
            </div>

            {/* Job Details */}
            <div>
                <h1 className="font-bold text-lg text-gray-900 line-clamp-1">
                    {job?.title}
                </h1>
                <p className="text-sm text-gray-600 line-clamp-2">
                    {job?.description}
                </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
                <Badge variant="ghost" className="text-blue-600 bg-blue-50">
                    {job?.position}
                </Badge>
                <Badge variant="ghost" className="text-rose-600 bg-rose-50">
                    {job?.jobType}
                </Badge>
                <Badge variant="ghost" className="text-violet-700 bg-violet-50">
                    {job?.salary}
                </Badge>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-auto">
                <Button
                    onClick={() => nagivate(`/description/${job?._id}`)}
                    variant="outline"
                    className="flex-1 rounded-xl hover:bg-gray-100"
                >
                    View Details
                </Button>

                <Button
                    className="flex-1 rounded-xl bg-gradient-to-r
                               from-violet-600 to-indigo-600
                               hover:from-violet-700 hover:to-indigo-700
                               text-white transition"
                >
                    Save Job
                </Button>
            </div>
        </div>
    )
}

export default Job

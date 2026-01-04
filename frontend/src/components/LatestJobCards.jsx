import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
    const navigate=useNavigate()
    return (
        <div onClick={()=>navigate(`/description/${job._id}` )} className="border border-gray-300">
            <div className="flex flex-col gap-3 bg-white  shadow-xl cursor-pointer p-3 border-gray-200">
                <div>
                    <h1 className="font-medium text-lg">{job?.company?.name}</h1>
                    <p className="text-sm text-gray-500" >{job?.location}</p>
                </div>
                <div>
                    <h1 className="font-bold  text-lg">{job?.title}</h1>
                    <p className="text-sm text-gray-500">{job?.description}</p>
                </div>
                <div className="flex gap-3">
                    <Badge className="text-blue-500" variant='ghost'>{job?.position}</Badge>
                    <Badge className="text-red-500" variant='ghost'>{job?.jobType}</Badge>
                    <Badge className="text-violet-700" variant='ghost'>{job?.salary}</Badge>
                </div>
            </div>
        </div>
    )
}

export default LatestJobCards

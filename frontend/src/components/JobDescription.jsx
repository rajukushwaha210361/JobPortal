import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { setSingleJob } from '@/redux/jobSlice';
import { toast } from 'sonner';
const JobDescription = () => {
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth)
    const { singleJob } = useSelector(store => store.job)
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;

    const [isApplied, setIsApplied] = useState(isInitiallyApplied)
    // console.log(singleJob?.applications[0].applicant)
    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true })
            if (res.data.success) {
                
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob)) //helps to real time updated
                toast.success(res.data.message)
                setIsApplied(true)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                console.log(res)
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
                    // setIsApplied(true)
                }
            } catch (err) {
                console.error(err);
            }
        }
        fetchSingleJob()
    }, [jobId, dispatch, user?._id]);
    return (
        <div className="max-w-7xl m-auto my-16">
            <div className="flex justify-between">
                <div>
                    <h1 className="font-bold text-lg">{singleJob?.title}</h1>
                    <div className="flex gap-3 my-3">
                        <Badge className="text-blue-500" variant='ghost'>{singleJob?.position}</Badge>
                        <Badge className="text-red-500" variant='ghost'>{singleJob?.jobType}</Badge>
                        <Badge className="text-violet-700" variant='ghost'>{singleJob?.position}</Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied} className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}>{isApplied ? <span>Already Applied</span> : <span>Apply Now</span>}</Button>
            </div>
            <div>
                <h1 className="font-bold text-lg">Job description</h1>
                <hr />
                <div className="my-4">
                    <h1 className="font-bold">Role: <span className="pl-4 font-normal text-gray-500">{singleJob?.title}</span></h1>
                    <h1 className="font-bold">Location: <span className="pl-4 font-normal text-gray-500">{singleJob?.location}</span></h1>
                    <h1 className="font-bold">Description: <span className="pl-4 font-normal text-gray-500">{singleJob?.description}</span></h1>
                    <h1 className="font-bold">Experience: <span className="pl-4 font-normal text-gray-500">{singleJob?.experienceLevel}</span></h1>
                    <h1 className="font-bold">Salary: <span className="pl-4 font-normal text-gray-500">{singleJob?.salary}</span></h1>
                    <h1 className="font-bold">Total Application: <span className="pl-4 font-normal text-gray-500">{singleJob?.applications?.length}</span></h1>
                    <h1 className="font-bold">Date Posted: <span className="pl-4 font-normal text-gray-500">{singleJob?.createdAt.split('T')[0]}</span></h1>

                </div>
            </div>

        </div>
    )
}

export default JobDescription


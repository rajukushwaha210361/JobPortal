import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import Job from './Job';
import { useNavigate } from 'react-router-dom';

const randomJobs=[1,2,3,4,5,6,7,8];

const LatestJobs = () => {
  const {allJobs}=useSelector(store=>store.job);
  const navigate=useNavigate();
  return (
    <div className="max-w-7xl m-auto p-1">
      <h1 className="text-center sm:text-left text-4xl font-bold"><span className="text-violet-700 ">Latest & Top </span> Job openings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 my-10 gap-4 sm:p-0 p-4">
      {
         allJobs.length>=0? allJobs?.slice(0,6).map((job,index)=><LatestJobCards  key={index._id} job={job}/>):<span>No job available</span>
        }
        </div>
    </div>
  )
}

export default LatestJobs

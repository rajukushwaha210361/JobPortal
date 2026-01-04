import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

// const randomJobs=[1,2,3,4,5];

const Browse = () => {
  useGetAllJobs()
  const {allJobs}=useSelector(store=>store.job)
  const dispatch=useDispatch()
  useEffect(() => {
    
    return () => {
      dispatch(setSearchedQuery(""))
    };
  }, []);
  console.log(allJobs)
  return (
    <div>
     <Navbar/>
     <div className="max-w-7xl m-auto">
        <h1 className="font-bold text-xl my-10">Search reasult({allJobs.length})</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 bg-white shadow-lg border-gray-300 ">
          {
            allJobs.map((job)=>{
              return (
               <Job key={job._id} job={job}/>
              )
            })
          }
        </div>
     </div>
    </div>
  )
}

export default Browse


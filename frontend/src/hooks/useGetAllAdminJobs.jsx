import { setAllAdminJobs, setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllAdminJobs = () => {
const dispatch=useDispatch();
  useEffect(() => {
      const fetchAllAdminJobs=async()=>{
    try {
        const res=await axios.get(`${JOB_API_END_POINT}/getadminjobs`,{withCredentials:true});
        if(res.data.success){
            dispatch(setAllAdminJobs(res.data.jobs))
        }
          console.log("🟢 API Response =>", res.data);
    } catch (err) {
      console.error(err);
    }
}
// console.log(res.data)
fetchAllAdminJobs()
  }, []);
};

export default useGetAllAdminJobs
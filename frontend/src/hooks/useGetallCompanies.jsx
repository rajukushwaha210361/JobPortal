import { setCompanies } from '@/redux/companySlice';
import { setAllJobs } from '@/redux/jobSlice';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllCompanies = () => {
const dispatch=useDispatch();
  useEffect(() => {
      const fetchCompanies=async()=>{
    try {
        const res=await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true});
        console.log(res.data)
        if(res.data.success){
            dispatch(setCompanies(res.data.companies))
        }
    } catch (err) {
      console.error(err);
    }
}
fetchCompanies()
  }, []);
};

export default useGetAllCompanies;

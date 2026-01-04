import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const HeroSection = () => {
    const [query,setQuery]=useState("");
    const dispatch=useDispatch();
   const navigate = useNavigate();
    const searchJobHandler=()=>{
        dispatch(setSearchedQuery(query))
        navigate("/browse")
    }
    return (
        <div className="text-center my-10">
            <div className="flex flex-col gap-5">
                <span className="bg-gray-300 text-red-600 p-2 rounded-full mx-auto">No.1 Job HuntWebsite</span>
                <h1 className="font-bold text-4xl">Search, Apply &<br />Get Your <span className="text-violet-700">Dream Jobs</span></h1>
                <p className="w-3/4 m-auto">Our Job Portal is a simple and efficient platform that connects job seekers with employers. Users can create profiles, apply for jobs, and get alerts, while employers can post jobs and manage applications easily. It’s a smart way to find the right job or hire the right talent.</p>
                <div className="flex shadow-lg border-gray-500 sm:w-[40%] pl-3 rounded-full items-center gap-3 mx-auto">
                    <input type="text" placeholder='Find Your dream jobs'
                    onChange={(e)=>setQuery(e.target.value)}
                        className="outline-none border-none w-full"
                    />
                    <Button onClick={searchJobHandler} className="rounded-full bg-violet-600 hover:bg-violet-800">
                        <Search className="" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection

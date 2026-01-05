// import React, { useState } from 'react'
// import { Button } from './ui/button'
// import { Search } from 'lucide-react'
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { setSearchedQuery } from '@/redux/jobSlice';

// const HeroSection = () => {
//     const [query,setQuery]=useState("");
//     const dispatch=useDispatch();
//    const navigate = useNavigate();
//     const searchJobHandler=()=>{
//         dispatch(setSearchedQuery(query))
//         navigate("/browse")
//     }
//     return (
//         <div className="text-center my-10">
//             <div className="flex flex-col gap-5">
//                 <span className="bg-gray-300 text-red-600 p-2 rounded-full mx-auto">No.1 Job HuntWebsite</span>
//                 <h1 className="font-bold text-4xl">Searc, Apply &<br />Get Your <span className="text-violet-700">Dream Jobs</span></h1>
//                 <p className="w-3/4 m-auto">Our Job Portal is a simple and efficient platform that connects job seekers with employers. Users can create profiles, apply for jobs, and get alerts, while employers can post jobs and manage applications easily. It’s a smart way to find the right job or hire the right talent.</p>
//                 <div className="flex shadow-lg border-gray-500 sm:w-[40%] pl-3 rounded-full items-center gap-3 mx-auto">
//                     <input type="text" placeholder='Find Your dream jobs'
//                     onChange={(e)=>setQuery(e.target.value)}
//                         className="outline-none border-none w-full"
//                     />
//                     <Button onClick={searchJobHandler} className="rounded-full bg-violet-600 hover:bg-violet-800">
//                         <Search className="" />
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default HeroSection
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'

const HeroSection = () => {
    const [query, setQuery] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query))
        navigate("/browse")
    }

    return (
        <div className="relative w-full py-16 px-4 sm:px-8 bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
            <div className="max-w-6xl mx-auto text-center flex flex-col gap-8">

                {/* Glass Badge */}
                <span className="mx-auto backdrop-blur-md bg-white/60 border 
                                 text-indigo-600 font-semibold px-6 py-2 rounded-full
                                 shadow-md hover:shadow-xl transition-all">
                    🌟 India’s Smart Job Platform
                </span>

                {/* Main Heading */}
                <h1 className="font-extrabold text-3xl sm:text-5xl md:text-6xl leading-tight text-gray-900">
                    Build Your Career With <br />
                    <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 
                                     bg-clip-text text-transparent">
                        Better Opportunities
                    </span>
                </h1>

                {/* Sub Text */}
                <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-4xl mx-auto">
                    Discover jobs that match your skills and passion. Apply easily, track applications,
                    and connect with top companies — all from one powerful job portal.
                </p>

                {/* Search Card */}
                <div className="mx-auto w-full sm:w-[80%] md:w-[60%] lg:w-[50%]
                                bg-white/80 backdrop-blur-xl border
                                rounded-2xl shadow-xl p-2
                                hover:shadow-2xl transition-all">

                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Search by job title, skill or company..."
                            onChange={(e) => setQuery(e.target.value)}
                            className="flex-1 px-5 py-4 rounded-xl outline-none
                                       bg-transparent text-gray-700
                                       placeholder-gray-400 text-sm sm:text-base"
                        />

                        <Button
                            onClick={searchJobHandler}
                            className="rounded-xl bg-gradient-to-r 
                                       from-indigo-600 to-cyan-500
                                       hover:from-indigo-700 hover:to-cyan-600
                                       px-6 py-4 text-white
                                       transition-transform hover:scale-105">
                            <Search className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                {/* Extra Line */}
                <p className="text-xs sm:text-sm text-gray-500">
                    Trusted by thousands of job seekers & recruiters across India 🇮🇳
                </p>

            </div>
        </div>
    )
}

export default HeroSection

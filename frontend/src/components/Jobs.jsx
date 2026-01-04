// import React, { useEffect, useState } from 'react'
// import Navbar from './shared/Navbar'
// import FilterCard from './FilterCard';
// import Job from './Job';
// import { useSelector } from 'react-redux';

// // const jobArray = [1, 2, 3, 4, 5, 6, 7, 8];

// const Jobs = () => {
//     const {allJobs,searchedQuery}=useSelector(store=>store.job)
//     const [filterJobs, setFilterJobs]=useState(allJobs);
//     useEffect(() => {
//         if(searchedQuery){
//           const filteredJobs=allJobs.filter((job)=>{
//             return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
//             job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
//             job.location.toLowerCase().includes(searchedQuery.toLowerCase()) 
//         }
//     )
//     setFilterJobs(filteredJobs)
//     }
//         else{
//             setFilterJobs(allJobs)
//         }
       
//     }, [allJobs,searchedQuery]);
//     return (
//         <div className="">
//             <Navbar />
//             <div className="mx-auto max-w-7xl p-2 md:p-0">
//                 <div className="flex flex-col sm:flex-row gap-4">
//                     <div className="w-[30%] md:w-[20%] md:p-0 px-2">
//                         <FilterCard />
//                     </div>
//                     {/* <div> */}
//                     {
//                         allJobs.length <= 0 ? <span>No jobs</span> : (
//                             < div className="flex-1 h-[88vh] overflow-y-auto border ">
//                                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3   gap-4">
//                                     {
//                                         allJobs.map((job, index) => (
//                                             <div>
//                                                 <Job job={job}/>
//                                             </div>))
//                                     }
//                                 </div>
//                             </div>
//                         )
//                     }
//                     {/* </div> */}

//                 </div>
//             </div>
//         </div >
//     )
// }

// export default Jobs
import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job)
    const [filterJobs, setFilterJobs] = useState([])

    useEffect(() => {
        if (searchedQuery) {
            const filtered = allJobs.filter(job =>
                job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            )
            setFilterJobs(filtered)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery])

    return (
        <div>
            <Navbar />

            <div className="mx-auto max-w-7xl p-2 md:p-0">
                <div className="flex flex-col sm:flex-row gap-4">

                    {/* Filter Section */}
                    <div className="w-full sm:w-[30%] md:w-[20%] px-2 md:px-0">
                        <FilterCard />
                    </div>

                    {/* Jobs Section */}
                    {
                        filterJobs.length === 0 ? (
                            <span className="text-center text-gray-500">
                                No jobs found
                            </span>
                        ) : (
                            <div className="flex-1 h-[88vh] overflow-y-auto border">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2">
                                    {
                                        filterJobs.map((job, index) => (
                                            <div key={job._id || index}>
                                                <Job job={job} />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default Jobs

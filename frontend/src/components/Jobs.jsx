// import React, { useEffect, useState } from 'react'
// import Navbar from './shared/Navbar'
// import FilterCard from './FilterCard'
// import Job from './Job'
// import { useSelector } from 'react-redux'

// const Jobs = () => {
//     const { allJobs, searchedQuery } = useSelector(store => store.job)
//     const [filterJobs, setFilterJobs] = useState([])

//     useEffect(() => {
//         if (searchedQuery) {
//             const filtered = allJobs.filter(job =>
//                 job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
//                 job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
//                 job.location.toLowerCase().includes(searchedQuery.toLowerCase())
//             )
//             setFilterJobs(filtered)
//         } else {
//             setFilterJobs(allJobs)
//         }
//     }, [allJobs, searchedQuery])

//     return (
//         <div>
//             <Navbar />

//             <div className="mx-auto max-w-7xl p-2 md:p-0">
//                 <div className="flex flex-col sm:flex-row gap-4">

//                     {/* Filter Section */}
//                     <div className="w-full sm:w-[30%] md:w-[20%] px-2 md:px-0">
//                         <FilterCard />
//                     </div>

//                     {/* Jobs Section */}
//                     {
//                         filterJobs.length === 0 ? (
//                             <span className="text-center text-gray-500">
//                                 No jobs found
//                             </span>
//                         ) : (
//                             <div className="flex-1 h-[88vh] overflow-y-auto border">
//                                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2">
//                                     {
//                                         filterJobs.map((job, index) => (
//                                             <div key={job._id || index}>
//                                                 <Job job={job} />
//                                             </div>
//                                         ))
//                                     }
//                                 </div>
//                             </div>
//                         )
//                     }

//                 </div>
//             </div>
//         </div>
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
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-col lg:flex-row gap-6">

                    {/* Filter Section */}
                    <div className="w-full lg:w-[22%]">
                        <div className="sticky top-20">
                            <FilterCard />
                        </div>
                    </div>

                    {/* Jobs Section */}
                    <div className="flex-1">
                        {filterJobs.length === 0 ? (
                            <div className="flex items-center justify-center h-[60vh]">
                                <span className="text-gray-500 text-lg">
                                    ❌ No jobs found
                                </span>
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl shadow-md h-[80vh] overflow-y-auto">
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 p-4">
                                    {filterJobs.map((job, index) => (
                                        <div key={job._id || index} className="hover:scale-[1.02] transition">
                                            <Job job={job} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Jobs

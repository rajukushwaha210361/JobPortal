
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
// import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
    // const {companies , searchCompanyByText} = useSelector(store => store.company?.companies) || []
    const { companies, searchCompanyByText } = useSelector((store) => store.company);
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job)
    // console.log(companies)
    // console.log(allAdminJobs)
    // console.log("ji")
    const nagivate = useNavigate();
    if (!companies || companies.length === 0) {
        return <div className="text-center p-4">No companies found</div>
    }
    const [filterJobs, setFilterJobs] = useState(allAdminJobs)
    useEffect(() => {

        const FilteredCompany = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        })
        setFilterJobs(FilteredCompany)
    }, [allAdminJobs, searchJobByText]);

    return (
        <div>
            <Table>
                <TableCaption>A recent posted Job</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs.map((job) => (
                        <TableRow key={job._id}>
                            {/* <TableCell>
                                <Avatar size='icon'>
                                    <AvatarImage src={company.logo || "https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png"} width={'50px'} />
                                </Avatar>
                            </TableCell> */}
                            <TableCell>{job?.company?.name}</TableCell>
                            <TableCell>{job?.title}</TableCell>
                            <TableCell>{new Date(job.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                    <PopoverContent className="w-30">
                                        <div className="flex items-center gap-4 w-fit cursor-pointer" onClick={() => nagivate(`/admin/companies/${job._id}`)}>
                                            <Edit2 />
                                            <span>Edit</span>
                                        </div>
                                        <div  onClick={() => nagivate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center gap-4 my-3 w-fit cursor-pointer">
                                            <Eye />
                                            <span>Applicants</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable

// import React, { useEffect, useState } from 'react'
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
// import { Edit2, MoreHorizontal } from 'lucide-react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// const AdminJobsTable = () => {
//   const {companies, searchCompanyByText } = useSelector((store) => store.company);
//   const { allAdminJobs } = useSelector((store) => store.job);
//   const navigate = useNavigate();
//     //  console.log(companies)
//     // console.log(allAdminJobs)
//     // console.log("ji")
//   const [filterJobs, setFilterJobs] = useState([]);

//   useEffect(() => {
//     if (!allAdminJobs) return;

//     const filtered = allAdminJobs.filter((job) => {
//       if (!searchCompanyByText) return true;
//       return job?.company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
//     });

//     setFilterJobs(filtered);
//   }, [allAdminJobs, searchCompanyByText]);

//   if (!filterJobs || filterJobs.length === 0) {
//     return <div className="text-center p-4">No jobs found</div>;
//   }


//   return (
//     <div>
//       <Table>
//         <TableCaption>Recently Posted Jobs</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Company Name</TableHead>
//             <TableHead>Role</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {filterJobs.map((job) => (
//             <TableRow key={job._id}>
//               <TableCell>{job.company?.name}</TableCell>
//               <TableCell>{job.title}</TableCell>
//               <TableCell>{new Date(job.createdAt).toLocaleDateString()}</TableCell>
//               <TableCell className="text-right">
//                 <Popover>
//                   <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
//                   <PopoverContent className="w-32">
//                     <div
//                       className="flex items-center gap-4 w-fit cursor-pointer"
//                       onClick={() => navigate(`/admin/jobs/${job._id}`)}
//                     >
//                       <Edit2 />
//                       <span>Edit</span>
//                     </div>
//                   </PopoverContent>
//                 </Popover>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default AdminJobsTable;


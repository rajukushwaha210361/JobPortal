// import React from 'react'
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
// import { Avatar, AvatarImage } from '../ui/avatar'
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
// import { Edit2, MoreHorizontal } from 'lucide-react'
// import { useSelector } from 'react-redux'

// const CompaniesTable = () => {
//     const { companies } = useSelector(store => store.company)
//     // console.log(companies)
//     return (
//         <div>
//             <Table>
//                 <TableCaption>A list of Your registered companies</TableCaption>
//                 <TableHeader>
//                     <TableRow>
//                         <TableHead>Logo</TableHead>
//                         <TableHead>Name</TableHead>
//                         <TableHead>Date</TableHead>
//                         <TableHead className="text-right">Action</TableHead>
//                     </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                     {
//                         companies.length <= 0 ? <span>No companies</span> : (
//                             <>
//                                 {
//                                     companies.map((company) => {
//                                         return (
//                                             <div key={company._id}>
//                                                 <TableCell>
//                                                     <Avatar size='icon'>
//                                                         <AvatarImage src="https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png" width={'50px'} />
//                                                     </Avatar>
//                                                 </TableCell>
//                                                 <TableCell>{company.name}</TableCell>
//                                                 <TableCell>{company.createdAt.spilt('')[0]}</TableCell>
//                                                 <TableCell className="text-right">
//                                                     <Popover>
//                                                         <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
//                                                         <PopoverContent className="w-32">
//                                                             <div className="flex items-center gap-4 w-fit cursor-pointer">
//                                                                 <Edit2 />
//                                                                 <span>Edit</span>
//                                                             </div>
//                                                         </PopoverContent>
//                                                     </Popover>
//                                                 </TableCell>
//                                             </div>
//                                         )
//                                     })
//                                 }

//                             </>
//                         )
//                     }


//                 </TableBody>
//             </Table>
//         </div>
//     )
// }

// export default CompaniesTable
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    // const {companies , searchCompanyByText} = useSelector(store => store.company?.companies) || []
    const { companies, searchCompanyByText } = useSelector((store) => store.company);
    const nagivate = useNavigate();
    if (!companies || companies.length === 0) {
        return <div className="text-center p-4">No companies found</div>
    }
    const [filterCompany, setFilterCompany] = useState(companies)
    useEffect(() => {

        const FilteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        })
        setFilterCompany(FilteredCompany)
    }, [companies, searchCompanyByText]);

    return (
        <div>
            <Table>
                <TableCaption>A list of Your registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany.map((company) => (
                        <TableRow key={company._id}>
                            <TableCell>
                                <Avatar size='icon'>
                                    <AvatarImage src={company.logo || "https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png"} width={'50px'} />
                                </Avatar>
                            </TableCell>
                            <TableCell>{company.name}</TableCell>
                            <TableCell>{new Date(company.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                    <PopoverContent className="w-32">
                                        <div className="flex items-center gap-4 w-fit cursor-pointer"  onClick={() => nagivate(`/admin/companies/${company._id}`)}>
                                            <Edit2 />
                                            <span>Edit</span>
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

export default CompaniesTable

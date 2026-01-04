import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { TableBody, TableCell } from '../ui/table'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetallCompanies'
import { useDispatch } from 'react-redux'
import { setsearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    useGetAllCompanies()
    const [input,setInput]=useState("")
    const nagivate=useNavigate();
    const dispatch=useDispatch();
    useEffect(() => {
       dispatch(setsearchCompanyByText(input))
    }, [input]);
    return (
        <div>
            <Navbar />
            <div className="max-w-6xl mx-auto my-10">
                <div className="flex justify-between items-center my-5">
                    <Input className="w-fit" placeholder='Filter by name' onChange={(e)=>setInput(e.target.value)} />
                    <Button onClick={()=>nagivate('/admin/companies/create')}>New Company</Button>
                </div>
                <CompaniesTable/>
                
            </div>
        </div>
    )
}

export default Companies
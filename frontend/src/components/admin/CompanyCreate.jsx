import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import axios from 'axios'

const CompanyCreate = () => {
    const nagivate = useNavigate();
    const [CompanyName, setCompanyName] = useState();
    const dispatch=useDispatch();
    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { CompanyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message)
                console.log(res.data.message)
                const companyId = res?.data?.company?._id;
                nagivate(`/admin/companies/${companyId}`)
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto">
                <div className="my-10">
                    <h1 className="font-bold text-2xl">Your Company name</h1>
                    <p>What would you like to give your company name? You can change it latter</p>
                </div>
                <Label>Company name</Label>
                <Input
                    type="text"
                    className="my-2"
                    placeholder='google, amazon...'
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <div className="flex items-center gap-3 my-6">
                    <Button variant='outline' onClick={() => nagivate('/admin/companies')}>Cancel</Button>
                    <Button onClick={registerNewCompany}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate
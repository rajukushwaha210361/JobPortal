import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id)
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null
  });
  const { singleCompany } = useSelector(store => store.company)
  const [loading, setLoading] = useState(false);
  const nagivate = useNavigate();
  const chnageEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const chnageFileHandler = (e) => {
    const file = e.target.files?.[0];
    // setInput(...input, file)
    setInput({ ...input, file }); // ✅ सही
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name)
    formData.append("description", input.description)
    formData.append("website", input.website)
    formData.append("location", input.location)
    
    if (input.file) {
      formData.append("file", input.file)
    }
    try {
      setLoading(true)
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      // console.log('hello')
      if (res.data.success) {
        toast.success(res.data.message);
        nagivate('/admin/companies')
      }console.log('hel')
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }
      console.log('hello')
  }
  useEffect(() => {
    setInput(
      {
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: singleCompany.name || null
      }
    )
  }, [singleCompany]);
  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-10 p-8">
            <Button onClick={() => nagivate('/admin/companies')} variant='outline' className="flex items-center gap-3 text-gray-600 font-semibold"><ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4 items-center">
            <div>
              <Label>Company Name</Label>
              <Input
                type='text'
                name='name'
                value={input.name}
                onChange={chnageEventHandler}
              />
            </div>
            <div>
              <Label>Dercription</Label>
              <Input
                type='text'
                name='description'
                value={input.description}
                onChange={chnageEventHandler}
              />
            </div>
            <div>
              <Label>website</Label>
              <Input
                type='text'
                name='website'
                value={input.website}
                onChange={chnageEventHandler}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type='text'
                name='location'
                value={input.location}
                onChange={chnageEventHandler}
              />
            </div>
            <div>
              <Label>Logo</Label>
              <Input
                type='file'
                accept='image/*'
                onChange={chnageFileHandler}
              />
            </div>
          </div>
          {/* <Button type='submit' className="my-5">Update</Button> */}
          {loading ? (
            <Button className="w-full h-16">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full">Update</Button>
          )}
        </form>
      </div>
    </div>
  )
}

export default CompanySetup
import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant.js'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
const Signup = () => {
  const { user } = useSelector(store => store.auth)
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  });
  const { loading } = useSelector(store => store.auth)
  const nagivate = useNavigate()
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const chnageFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] })
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('fullname', input.fullname)
    formData.append('email', input.email)
    formData.append('phoneNumber', input.phoneNumber)
    formData.append('password', input.password)
    formData.append('role', input.role)
    if (input.file) {
      formData.append("file", input.file)
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        header: {
          'Content-Type': "multipart/form-data"
        },
        withCredentials: true
      })
      if (res.data.success) {
        nagivate('/login')
        toast.success(res.data.message)
      }
    } catch (err) {
      console.log(err)
      console.log(err.response.data.message)
      toast.error(err.response.data.message)
    }
    finally {
      dispatch(setLoading(false))
    }
  }
  //  useEffect(() => {
  //   if(user){
  //     nagivate("/")
  //   }
  //  }, []);
  useEffect(() => {
    if (user) {
      nagivate("/");
    }
  }, [user, nagivate]);
  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col justify-center items-center max-w-7xl mx-auto ">
        <form onSubmit={submitHandler} className="md:w-1/2 border border-gray-400 rounded-md p-5 m-5 sm:my-10">
          <h1 className="font-bold">Sign Up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input type="text"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder='Raju' />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input type="email"
              name='email'
              value={input.email}
              onChange={changeEventHandler}
              placeholder='raju@gmail.com' />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input type="text"
              onChange={changeEventHandler}
              name='phoneNumber'
              value={input.phoneNumber}
              placeholder='123456789' />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input type="password"
              name='password'
              value={input.password}
              onChange={changeEventHandler}
              placeholder='Password' />
          </div>
          <div className="my-2 flex sm:flex-row flex-col sm:items-center justify-between border gap-3 p-2">
            <RadioGroup className="flex  gap-4 items-center">
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  value="student"
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Students</Label>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  value="recruiter"
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className='flex items-center gap-3'>
              <Label>Profile</Label>
              <Input
                accept='image/*'
                type='file'
                onChange={chnageFileHandler}
                className='cursor-pointer '
              />
            </div>
          </div>
          {loading ? <Button className="w-full my-4 h-16"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait</Button> : <Button type='submit' className="w-full">Signup </Button>}

          <p className="text-sm my-3">Already have an account?<Link to='/Login' className="text-blue-600 font-medium">Login</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Signup

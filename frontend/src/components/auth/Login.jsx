import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { Loader2 } from 'lucide-react'
import { setLoading, setUser } from '@/redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'

const Login = () => {
  const { user } = useSelector(store => store.auth)
  const [input, setInput] = useState({

    email: "",
    password: "",
    role: ""
  });
  const { loading } = useSelector(store => store.auth)
  const dispatch = useDispatch();
  const nagivate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        header: {
          'Content-Type': "application/json"
        },
        withCredentials: true
      })
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        nagivate('/')
        toast.success(res.data.message)
      }
    } catch (err) {
      console.log(err)
      toast.error(err.response.data.message)
    }
    finally {
      dispatch(setLoading(false));
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
      <div className="flex flex-col justify-center items-center max-w-7xl mx-auto">
        <form onSubmit={submitHandler} className="md:w-1/2 w-3/4 border border-gray-400 rounded-md p-5 m-5 sm:my-10">
          <h1 className="font-bold">Login</h1>

          <div className="my-2">
            <Label>Email</Label>
            <Input type="email" name='email'
              value={input.email}
              onChange={changeEventHandler}
              placeholder='raju@gmail.com' />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input type="password" name='password'
              value={input.password}
              onChange={changeEventHandler}
              placeholder='Password' />
          </div>
          <div className="my-2 flex items-center justify-between border gap-3">
            <RadioGroup className="flex gap-4 items-center px-2">
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
          </div>
          {loading ? <Button className="w-full my-4 h-16"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait</Button> : <Button type='submit' className="w-full">Login </Button>}
          <p className="text-sm my-3">Don't have an account?<Link to='/signup' className="text-blue-600 font-medium">Signup</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Login

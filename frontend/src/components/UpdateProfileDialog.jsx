import React, { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch()
    const [input, setInput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.bio,
        skills: user?.profile?.skills?.map(skill => skill),
        // file: user?.profile.resume
    })
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('fullname', input.fullname)
        formData.append('email', input.email)
        formData.append('phoneNumber', input.phoneNumber)
        formData.append('bio', input.bio)
        formData.append('skills', input.skills)
        if (input.file) {

            formData.append('file', input.file)
        }
        // console.log(input)
        try {
            setLoading(true)
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': "multipart/form-data"
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message)
            }
        } catch (err) {
            console.log(err)
            toast.success(err.response.data.message)
        }finally{
            setLoading(false)
        }
        
        setOpen(false);
        console.log(input)
    }
    return (
        <div>
            <Dialog open={open}>
                <DialogContent  className="sm:max-w-[420px]" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                        <DialogClose asChild>
                            <button
                                className="absolute top-4 right-4 text-gray-500 hover:text-black"
                                onClick={() => setOpen(false)}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </DialogClose>
                    </DialogHeader>
                    <form onSubmit={submitHandler} className="px-4 py-6">
                        <div className="grid gap-6">
                            {/* Name Field */}
                            <div className="flex flex-col md:flex-row md:items-center gap-2">
                                <Label htmlFor="fullname" className="md:w-1/5">Name</Label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="fullname"
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    className="w-full border border-black"
                                    placeholder="Enter your name"
                                />
                            </div>

                            {/* Email Field */}
                            <div className="flex flex-col md:flex-row md:items-center gap-2">
                                <Label htmlFor="email" className="md:w-1/5">Email</Label>
                                <Input
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    className="w-full border border-black"
                                    placeholder="Enter your email"
                                />
                            </div>

                            {/* Phone Number Field */}
                            <div className="flex flex-col md:flex-row md:items-center gap-2">
                                <Label htmlFor="phoneNumber" className="md:w-1/5">Phone No.</Label>
                                <Input
                                    type="text"
                                    id="number"
                                    name="phoneNumber"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    className="w-full border border-black"
                                    placeholder="Enter your phone number"
                                />
                            </div>

                            {/* Bio Field */}
                            <div className="flex flex-col md:flex-row md:items-center gap-2">
                                <Label htmlFor="bio" className="md:w-1/5">Bio</Label>
                                <Input
                                    type="text"
                                    id="bio"
                                    name="bio"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    className="w-full border border-black"
                                    placeholder="Write a short bio"
                                />
                            </div>

                            {/* Skills Field */}
                            <div className="flex flex-col md:flex-row md:items-center gap-2">
                                <Label htmlFor="skills" className="md:w-1/5">Skills</Label>
                                <Input
                                    type="text"
                                    id="skills"
                                    name="skills"
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    className="w-full border border-black"
                                    placeholder="Enter your skills"
                                />
                            </div>

                            {/* File Upload Field */}
                            <div className="flex flex-col md:flex-row md:items-center gap-2">
                                <Label htmlFor="file" className="md:w-1/5">File</Label>
                                <Input
                                    type="file"
                                    id="file"
                                    name="file"
                                    onChange={fileChangeHandler}
                                    accept="application/pdf"
                                    className="w-full border border-black"
                                />
                            </div>
                        </div>

                        <DialogFooter className="mt-6">
                            {loading ? (
                                <Button className="w-full h-16">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Update
                                </Button>
                            ) : (
                                <Button type="submit" className="w-full">Update Profile</Button>
                            )}
                        </DialogFooter>
                    </form>

                    {/* <form onSubmit={submitHandler} className="">
                        <div className="grid gap-4 py-4">
                            <div className="flex items-center gap-4">
                                <Label htmlFor='fullname' className="text-center">Name</Label>
                                <Input type="text"
                                    id='name'
                                    name='fullname'
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    className="col-span-3 border border-black w-full"
                                    placeholder='Enter the name' />
                            </div>
                            <div className="flex items-center gap-4">
                                <Label htmlFor='email' className="text-center">Email</Label>
                                <Input type="text"
                                    id='email'
                                    name='email'
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    className="col-span-3 border border-black w-full"
                                    placeholder='Enter the name' />

                            </div>
                            <div className="flex items-center gap-4">
                                <Label htmlFor='phoneNumber' className="text-center">Phone No.</Label>
                                <Input type="text"
                                    id='number'
                                    name='phoneNumber'
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    className="col-span-3 border border-black w-full"
                                    placeholder='Enter the name' />

                            </div>
                            <div className="flex items-center gap-4">
                                <Label htmlFor='bio' className="text-center">Bio</Label>
                                <Input type="text"
                                    id='bio'
                                    name='bio'
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    className="col-span-3 border border-black w-full"
                                    placeholder='Enter the name' />

                            </div>
                            <div className="flex items-center gap-4">
                                <Label htmlFor='skills' className="text-center">Skills</Label>
                                <Input type="text"
                                    id='skills'
                                    name='skills'
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    className="col-span-3 border border-black w-full"
                                    placeholder='Enter the name' />

                            </div>
                            <div className="flex items-center gap-4">
                                <Label htmlFor='file' className="text-center">File</Label>
                                <Input type="file"
                                    id='file'
                                    name='file'
                                    value={input.file}
                                    onChange={fileChangeHandler}
                                    accecp='application/pdf'
                                    className="col-span-3 border border-black w-full"
                                    placeholder='Enter the name' />
                            </div>
                        </div>
                        <DialogFooter>
                            {loading ? <Button className="w-full my-4 h-16"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Update</Button> : <Button type='submit' className="w-full">Signup </Button>}

                        </DialogFooter>
                    </form> */}
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default UpdateProfileDialog
import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const skills = ['Html', 'css', 'JavaScript', 'Tailwind', 'react.js', 'Node.js', 'Tailwind', 'react.js', 'Node.js'];
const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const isResume = true;
    const { user } = useSelector(store => store.auth);
    return (
        <div>
            <Navbar />
            <div className="max-w-7xl m-auto bg-white shadow-lg p-5">
                <div className="flex justify-between mt-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-30 w-[100px]">
                            <AvatarImage src="https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png" />
                        </Avatar>
                        <div>
                            <h1 className="font-bold text-lg">{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} variant='outline' className="text-right"><Pen /></Button>
                </div>
                <div className="m-2">
                    <div className="flex items-center gap-3">
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div>
                    <h1 className="font-bold text- items-center lg">Skills</h1>
                    <div className="sm:flex gap-4">
                        {
                            user?.profile?.skills.length != 0 ? user?.profile?.skills.map((item, index) => {
                                return (
                                    <Badge key={index} className="py-1" >{item}</Badge>

                                )
                            }
                            ) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className="grid w-full max-w-sm items-center my-y">
                    <Label className="text-md font-bold"> Resume</Label>
                    {
                        isResume ? <a href={user?.profile?.resume} target='blank' className="text-blue-600 w-full hover:underline">{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>
            </div>
            <div className="max-w-7xl m-auto p-5">
                <h1 className="font-bold text-lg my-4">Applied Jobs</h1>
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile

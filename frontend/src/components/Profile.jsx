// import React, { useState } from 'react'
// import Navbar from './shared/Navbar'
// import { Avatar, AvatarImage } from './ui/avatar'
// import { Button } from './ui/button'
// import { Contact, Mail, Pen } from 'lucide-react'
// import { Badge } from './ui/badge'
// import { Label } from './ui/label'
// import AppliedJobTable from './AppliedJobTable'
// import UpdateProfileDialog from './UpdateProfileDialog'
// import { useSelector } from 'react-redux'
// import store from '@/redux/store'
// import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

// const skills = ['Html', 'css', 'JavaScript', 'Tailwind', 'react.js', 'Node.js', 'Tailwind', 'react.js', 'Node.js'];
// const Profile = () => {
//     useGetAppliedJobs();
//     const [open, setOpen] = useState(false);
//     const isResume = true;
//     const { user } = useSelector(store => store.auth);
//     return (
//         <div>
//             <Navbar />
//             <div className="max-w-7xl m-auto bg-white shadow-lg p-5">
//                 <div className="flex justify-between mt-4">
//                     <div className="flex items-center gap-4">
//                         <Avatar className="h-30 w-[100px]">
//                             <AvatarImage src="https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png" />
//                         </Avatar>
//                         <div>
//                             <h1 className="font-bold text-lg">{user?.fullname}</h1>
//                             <p>{user?.profile?.bio}</p>
//                         </div>
//                     </div>
//                     <Button onClick={() => setOpen(true)} variant='outline' className="text-right"><Pen /></Button>
//                 </div>
//                 <div className="m-2">
//                     <div className="flex items-center gap-3">
//                         <Mail />
//                         <span>{user?.email}</span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                         <Contact />
//                         <span>{user?.phoneNumber}</span>
//                     </div>
//                 </div>
//                 <div>
//                     <h1 className="font-bold text- items-center lg">Skills</h1>
//                     <div className="sm:flex gap-4">
//                         {
//                             user?.profile?.skills.length != 0 ? user?.profile?.skills.map((item, index) => {
//                                 return (
//                                     <Badge key={index} className="py-1" >{item}</Badge>

//                                 )
//                             }
//                             ) : <span>NA</span>
//                         }
//                     </div>
//                 </div>
//                 <div className="grid w-full max-w-sm items-center my-y">
//                     <Label className="text-md font-bold"> Resume</Label>
//                     {
//                         isResume ? <a href={user?.profile?.resume} target='blank' className="text-blue-600 w-full hover:underline">{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
//                     }
//                 </div>
//             </div>
//             <div className="max-w-7xl m-auto p-5">
//                 <h1 className="font-bold text-lg my-4">Applied Jobs</h1>
//                 <AppliedJobTable />
//             </div>
//             <UpdateProfileDialog open={open} setOpen={setOpen} />
//         </div>
//     )
// }

// export default Profile

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
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const Profile = () => {
    useGetAppliedJobs()
    const [open, setOpen] = useState(false)
    const isResume = true
    const { user } = useSelector(store => store.auth)

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Profile Card */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">

                    {/* Top Section */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-24 w-24 rounded-2xl border">
                                <AvatarImage src="https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png" />
                            </Avatar>

                            <div>
                                <h1 className="text-xl font-bold text-gray-800">
                                    {user?.fullname}
                                </h1>
                                <p className="text-sm text-gray-600">
                                    {user?.profile?.bio || "No bio added"}
                                </p>
                            </div>
                        </div>

                        <Button
                            onClick={() => setOpen(true)}
                            variant="outline"
                            className="rounded-xl self-start sm:self-center"
                        >
                            <Pen className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Contact Info */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                        <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-violet-600" />
                            <span>{user?.email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Contact className="w-4 h-4 text-violet-600" />
                            <span>{user?.phoneNumber}</span>
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="mt-6">
                        <h1 className="font-semibold text-lg text-gray-800 mb-3">
                            Skills
                        </h1>
                        <div className="flex flex-wrap gap-2">
                            {user?.profile?.skills?.length !== 0 ? (
                                user?.profile?.skills.map((item, index) => (
                                    <Badge
                                        key={index}
                                        className="bg-violet-50 text-violet-700"
                                    >
                                        {item}
                                    </Badge>
                                ))
                            ) : (
                                <span className="text-gray-500">NA</span>
                            )}
                        </div>
                    </div>

                    {/* Resume */}
                    <div className="mt-6">
                        <Label className="text-base font-semibold text-gray-800">
                            Resume
                        </Label>
                        <div className="mt-2">
                            {isResume ? (
                                <a
                                    href={user?.profile?.resume}
                                    target="blank"
                                    className="text-blue-600 hover:underline break-all"
                                >
                                    {user?.profile?.resumeOriginalName}
                                </a>
                            ) : (
                                <span className="text-gray-500">NA</span>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* Applied Jobs */}
            <div className="max-w-7xl mx-auto px-4 pb-8">
                <h1 className="font-bold text-lg my-4 text-gray-800">
                    Applied Jobs
                </h1>
                <div className="bg-white rounded-2xl shadow-md p-4">
                    <AppliedJobTable />
                </div>
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile

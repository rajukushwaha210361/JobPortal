// import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
// import React from 'react'
// import { Button } from '../ui/button'
// import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
// import { LogOut, User2 } from 'lucide-react'
// import { Link } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import store from '@/redux/store'

// const Navbar = () => {
//     // const user=false;
//     const {user}=useSelector(store=>store.auth);
//     return (
//         <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
//             <div>
//                 <h1 className="text-2xl font-bold">Job<span className="text-red-500">Portal</span></h1>
//             </div>
//             <div className="flex items-center gap-3">
//                 <ul className="flex font-medium items-center gap-5">
//                     <li><Link to='/'>Home</Link></li>
//                     <li><Link to='/jobs'>Jobs</Link></li>
//                     <li><Link to='/browse'>Browse</Link></li>
//                 </ul>
//                 {
//                     !user ? (
//                         <div className='flex gap-2 items-center'>
//                             <Link to='/login'>
//                             <Button variant="outline" >Login</Button>
//                             </Link>
//                             <Link to='/signup'>
//                             <Button className="bg-green-500 hover:bg-green-700"> Signup</Button>
//                             </Link>
//                         </div>
//                     ) :
//                         (
//                             <Popover>
//                                 <PopoverTrigger asChild>
//                                     <Avatar>
//                                         <AvatarImage
//                                             src="https://github.com/shadcn.png"
//                                             alt="@shadcn"
//                                             width="40"
//                                             className="border rounded-full cursor-pointer focus:outline-none focus:ring-0"
//                                         />
//                                     </Avatar>
//                                 </PopoverTrigger>
//                                 <PopoverContent className="my-3 p-4 shadow-lg rounded-md border bg-white">
//                                     <div className="flex items-center gap-5 p-2">
//                                         <Avatar>
//                                             <AvatarImage
//                                                 src="https://github.com/shadcn.png"
//                                                 alt="@shadcn"
//                                                 width="40"
//                                                 className="border rounded-full cursor-pointer focus:outline-none focus:ring-0"
//                                             />
//                                         </Avatar>
//                                         <div>
//                                             <h1 className="font-medium">Raju Mern stack</h1>
//                                             <p className="text-sm text-muted-foreground">Welcome to my profile</p>
//                                         </div>
//                                     </div>
//                                     <div className="flex flex-col">
//                                         <div className="flex items-center p-1">
//                                             <User2 />
//                                             <Button variant="link"><Link to='/profile'>View Profile</Link> </Button>
//                                         </div>
//                                         <div className="flex items-center">
//                                             <LogOut />
//                                             <Button variant="link">Logout</Button>
//                                         </div>
//                                     </div>
//                                 </PopoverContent>
//                             </Popover>
//                         )

//                 }
//             </div>
//         </div>
//     )
// }

// export default Navbar

import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { LogOut, Menu, User2, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const nagivate = useNavigate();

  const logOutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null))
        nagivate('/');
        toast(res.data.message)

      }
    } catch (err) {
      console.log(err)
      toast.error(err.response.data.message)
    }
  }

  return (
    <div className="w-full shadow-sm sticky top-0 bg-white z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        {/* <h1 className="text-2xl font-bold">
          Job<span className="text-red-500">Portal</span>
        </h1> */}
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide">
          Job
          <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Portal
          </span>
        </h1>

        {/* Hamburger for small screens */}
        <div className="md:hidden">
          <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-5">
          <ul className="flex font-medium items-center gap-5">
            {
              user && user.role === 'recruiter' ? (
                <>
                  <li><Link to="/admin/companies">Company</Link></li>
                  <li><Link to="/admin/jobs">Jobs</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/jobs">Jobs</Link></li>
                  <li><Link to="/browse">Browse</Link></li>
                </>
              )
            }

          </ul>

          {!user ? (
            <div className="flex gap-2 items-center">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-green-500 hover:bg-green-700">Signup</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar>
                  <AvatarImage
                    // src="https://github.com/shadcn.png"
                    src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
                    alt={user?.fullname || "profile"}
                    width="40"
                    className="border cursor-pointer w-12 h-12 rounded-full object-cover"

                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="my-3 p-4 shadow-lg rounded-md border bg-white">
                <div className="flex items-center gap-5 p-2">
                  <Avatar>
                    <AvatarImage
                      // src="https://github.com/shadcn.png"
                      src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
                      // src={user.profile.profilePhoto}
                      alt="@shadcn"
                      width="40"
                      className="border  w-12 h-12 rounded-full object-cover"
                    />
                  </Avatar>
                  <div>
                    <h1 className="font-medium">{user.fullname}</h1>
                    <p className="text-sm text-muted-foreground">Welcome to my profile</p>
                  </div>
                </div>
                <div className="flex flex-col">
                  {
                    user && user.role === 'student' && (
                      <div className="flex items-center p-1">
                        <User2 />
                        <Button variant="link">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )
                  }
                  <div className="flex items-center">
                    <LogOut />
                    <Button onClick={logOutHandler} variant="link">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t px-4 pb-4">
          <ul className="flex flex-col gap-4 py-2">
            {
              user && user.role === 'recruiter' ? (
                <>
                  <li><Link to="/admin/companies">Company</Link></li>
                  <li><Link to="/admin/jobs">Jobs</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/jobs">Jobs</Link></li>
                  <li><Link to="/browse">Browse</Link></li>
                </>
              )
            }
          </ul>

          {!user ? (
            <div className="flex flex-col gap-2 mt-3">
              <Link to="/login">
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-green-500 hover:bg-green-700 w-full">Signup</Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4 mt-4">
              <Avatar>
                <AvatarImage
                  // src="https://github.com/shadcn.png"
                  src={user.profile.profilePhoto}
                  alt="@shadcn"
                  width="40"
                  className="border  w-12 h-12 rounded-full object-cover"
                />
              </Avatar>
              <div>
                <h1 className="font-medium">{user.fullname}</h1>
                <p className="text-sm text-muted-foreground">Welcome to my profile</p>

                <div className="flex gap-2 mt-1">
                  {
                    user && user.role === 'student' && (
                      <div className="flex items-center p-1">
                        <User2 />
                        <Button variant="link">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )
                  }
                  {/* <Link to="/profile">
                    <Button variant="link" className="text-sm">View Profile</Button>
                  </Link> */}
                  <Button onClick={logOutHandler} variant="link" className="text-sm">Logout</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;


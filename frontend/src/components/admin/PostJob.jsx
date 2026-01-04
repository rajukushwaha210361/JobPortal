import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { JOB_API_END_POINT } from '@/utils/constant';
const companyArray = [];
const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: "",
        companyId: ""
    })
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const { companies } = useSelector(store => store.company)
    // console.log(companies)
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    //    const selectedChangeHandler=(value)=>{
    //     const selectCompany =(value)=> companies.find((company)=>company.name.toLowerCase()===value);
    //     setInput({...input,companyId:selectCompany._id});
    //    }
    const selectedChangeHandler = (value) => {
        // value is company.name.toLowerCase() as you used in SelectItem
        const selectedCompany = companies.find(
            (c) => c.name.toLowerCase() === value
        );

        setInput(prev => ({ ...prev, companyId: selectedCompany?._id || "" }));
    };
    // const submitHandler = async (e) => {
    //     e.preventDefault();
    //     try {
    //         setLoading(true);
    //         const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
    //             headers: {
    //                 'Content-Type': "application/json"
    //             },
    //             withCredentials: true
    //         })
    //         if (res.data.success) {
    //             toast.success(res.data.message);
    //             navigate("/admin/jobs")

    //         }
    //     } catch (err) {
    //         toast.error(err.response.data.message)
    //     } finally {
    //         setLoading(false)
    //     }
    // }
    const submitHandler = async (e) => {
  e.preventDefault();
  try {
    setLoading(true);

    const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (res?.data?.success) {
      toast.success(res.data.message || "Job posted successfully");
      navigate("/admin/jobs");
    } else {
      toast.error(res?.data?.message || "Unexpected server response");
    }
  } catch (err) {
    const serverMsg = err?.response?.data?.message;
    const fallback = err?.message || "Something went wrong";

    toast.error(serverMsg || fallback);
  } finally {
    setLoading(false);
  }
};

    return (
        <div>
            <Navbar />
            <div className="max-w-xl mx-auto my-10">
                <div className="flex items-center justify-center">
                    <form onSubmit={submitHandler} className="p-4 max-w-4xl border border-gray-200 shadow-lg rounded-md">
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label>Title</label>
                                <Input
                                    type="text"
                                    name="title"
                                    value={input.title}
                                    onChange={changeEventHandler}
                                    className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2" />
                            </div>
                            <div>
                                <label>Description</label>
                                <Input
                                    type="text"
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2" />
                            </div>
                            <div>
                                <label>Requirements</label>
                                <Input
                                    type="text"
                                    name="requirements"
                                    value={input.requirements}
                                    onChange={changeEventHandler}
                                    className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2" />
                            </div>
                            <div>
                                <label>Salary</label>
                                <Input
                                    type="text"
                                    name="salary"
                                    value={input.salary}
                                    onChange={changeEventHandler}
                                    className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2" />
                            </div>
                            <div>
                                <label>location</label>
                                <Input
                                    type="text"
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2" />
                            </div>
                            <div>
                                <label>JobType</label>
                                <Input
                                    type="text"
                                    name="jobType"
                                    value={input.jobType}
                                    onChange={changeEventHandler}
                                    className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2" />
                            </div>
                            <div>
                                <label>Experience Lavel</label>
                                <Input
                                    type="text"
                                    name="experience"
                                    value={input.experience}
                                    onChange={changeEventHandler}
                                    className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2" />
                            </div>
                            <div>
                                <label>No. of position Position</label>
                                <Input
                                    type="number"
                                    name="position"
                                    value={input.position}
                                    onChange={changeEventHandler}
                                    className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2" />
                            </div>
                            {
                                companies.length > 0 && (
                                    <Select onValueChange={selectedChangeHandler}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select a company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {
                                                    companies.map((company) => {
                                                        return (
                                                            <SelectItem value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                                                        )
                                                    })
                                                }

                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                )
                            }

                        </div>
                      
                        {loading ? (
                            <Button className="w-full h-16 ">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-3">Post new Job</Button>
                        )}
                        {
                            companies.length === 0 && <p className="text-sm text-red-600 font-bold my-3">*Please Registed a cmpany first, before postong a jobs</p>
                        }
                    </form>
                </div>
            </div>
        </div>

    )
}

export default PostJob

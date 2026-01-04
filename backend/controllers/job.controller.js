import { Job } from "../models/job.model.js"
import { Application } from "../models/application.model.js";
// import { Job } from "../models/job.model.js";
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            create_by: userId

        })
        return res.status(200).json({
            message: "New job created succrssfully",
            job,
            success: true
        })
    } catch (err) {
        console.log(err)
    }
}
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (err) {
        console.log(err)
    }
}
//Search by Id

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        }
        return res.status(200).json({
            job,
            success: true
        })
    } catch (err) {
        console.log(err)
    }
}

// export const getJobById = async (req, res) => {
//     try {
//         const jobId = req.params.id;
//         const job = await Job.findById(jobId)
//             .populate("company") // company details भी चाहिए तो ये रहेगा
//             .populate({
//                 path: "applications",
//                 populate: { path: "applicant", select: "_id name email" } // applicant details
//             });

//         if (!job) {
//             return res.status(404).json({
//                 message: "Job not found",
//                 success: false
//             });
//         }

//         return res.status(200).json({
//             job,
//             success: true
//         });
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({
//             message: "Server error",
//             success: false
//         });
//     }
// };

// how many job create by admin

export const getAdminJobs = async (req, res) => {
    const adminJob = req.id;
    // const jobs=await Job.find({create_by:adminJob}).populate({
    //     path:'company',
    //     createdAt:-1
    // });
 const jobs = await Job.find({ create_by: adminJob })
    .populate('company')
    .sort({ createdAt: -1 });

    if (!jobs) {
        return res.status(404).json({
            message: "Jobs not found", 
            success: false
        })
    }
    return res.status(200).json({
        jobs,
        success: true
    })
}
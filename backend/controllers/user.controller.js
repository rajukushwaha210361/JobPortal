import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Somethings is missing",
                success: false
            });
        }
        const file = req.file;
       
        //cloudnary use here

        const fileUri = getDataUri(file);
        // const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
            resource_type: "auto",           
        use_filename: true,              
            unique_filename: false,
            public_id: `resumes/${file.originalname.replace(/\.[^/.]+$/, "")}` 
        });
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: "user already exist with this email id",
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        })
        res.status(200).json({
            message: "Account created successfully",
            success: true
        })
    } catch (err) {
        console.log(err)
    }
}


export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Somethings is missing",
                success: false
            })
        }
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "email or password not match",
                success: false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect password",
                success: false
            })
        }
        if (role != user.role) {
            return res.status(400).json({
                message: "Account does exist with the current role",
                success: false
            })
        }
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    }
    catch (err) {
        console.log(err)
    }
}


export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfull",
            success: true
        })
    } catch (err) {
        console.log(err)
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });

        }
        //cloudnary use here

        const fileUri = getDataUri(file);
        // const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
            resource_type: "auto",           
        use_filename: true,              
            unique_filename: false,
            public_id: `resumes/${file.originalname.replace(/\.[^/.]+$/, "")}` 
        });

      


        let skillArray;
        if (skills) {

            skillArray = skills.split(",");
        }
        const userId = req.id;
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }
        //update data
        if (fullname) user.fullname = fullname
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skillArray) user.profile.skills = skillArray
        //resume comes lattter
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url; //save the cloudnary url
            user.profile.resumeOriginalName = file.originalname;  //save the original file name
        }

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).json({
            message: "profile updated successfully",
            user,
            success: true
        })

    } catch (err) {
        console.log(err)
    }
}
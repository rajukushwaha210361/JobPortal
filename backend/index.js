import express from "express";
const app=express();
import cookieParser from 'cookie-parser';
import cors from "cors";
import dotenv from 'dotenv'
import connectDB from "./utils/db.js";
import userRoute from './routes/user.route.js'
import companyRoute from './routes/company.route.js'
import jobRouter from './routes/job.route.js';
import applicationRouter from './routes/application.route.js'
import path from "path";

dotenv.config({});

//middleware

app.use(express.json());
const _dirname=path.resolve()
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions={
    // origin:"http://localhost:5173",
    origin:"https://jobportal-1ppa.onrender.com",

    credentials:true
}
app.use(cors(corsOptions))

const PORT =process.env.PORT || 3000;

//api setup
app.use("/api/v1/company",companyRoute)
app.use("/api/v1/user",userRoute)
app.use("/api/v1/job",jobRouter)
app.use("/api/v1/application",applicationRouter)

app.use(express.static(path.join(_dirname,"/frontend/dist")))
app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

// if (process.env.NODE_ENV === "production") {
//   const frontendPath = path.join(_dirname, "frontend", "dist");
//   app.use(express.static(frontendPath));
//   app.get(/^(?!\/api).*/, (req, res) => {
//   res.sendFile(path.join(frontendPath, "index.html"));
// });

// }
app.listen(PORT,()=>{
    connectDB()
    console.log(`Server running is PORT ${PORT}`);
 })




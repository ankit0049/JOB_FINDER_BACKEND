import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

import userRouter from './routes/user.routes.js'
import applicationRouter from './routes/application.routes.js'
import jobRouter from './routes/job.routes.js' 

import { dbConnection } from './database/dbConnection.js';
import { errroMiddleware } from './middlewares/error.middleware.js';

const app = express(); 
dotenv.config({path:'config.env'}); 


const allowedOrigins = [
  "http://localhost:5173",
  "https://job-dekho-frontend.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      console.log(" Allowed Origin:", origin);
      callback(null, true);
    } else {
      console.log("Blocked Origin:", origin);
      callback(new Error("CORS not allowed for this origin"));
    }
  },
  methods: ["GET", "POST", "DELETE", "PATCH"],
  credentials: true
}));


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(fileUpload({
    useTempFiles : true ,
    tempFileDir : "/tmp/ "
}))



app.use('/api/v1/user',userRouter);
app.use('/api/v1/application',applicationRouter);
app.use('/api/v1/job',jobRouter); 

dbConnection(); 
app.use(errroMiddleware)

export default app;

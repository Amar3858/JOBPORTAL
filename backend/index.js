import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./utils/db.js";
import userRoutes from './routes/user.route.js';
import companyRoutes from './routes/company.route.js'; 
import jobRoutes from './routes/job.route.js'; // Uncomment if you have job routes
import applicationRoutes from './routes/application.route.js'; // Uncomment if you have application routes
import path from 'path';






dotenv.config({});
connectDB();
const PORT = process.env.PORT||3000;
const app = express();

const __dirname = path.resolve();




app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
    origin:"https://jobportal-sag1.onrender.com",
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //
    
}

app.use(cors(corsOptions));


app.use('/api/v1/user', userRoutes);
app.use('/api/v1/company', companyRoutes);
app.use('/api/v1/job', jobRoutes); 
app.use('/api/v1/application', applicationRoutes); 
app.use(express.static(path.join(__dirname, "/frontend/dist"))); // Serve static files from the public directory
app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, "frontend","dist","index.html")); // Serve the index.html file for all other routes
});




app.listen(PORT, () => {
    
  console.log(`Server is running on http://localhost:${PORT}`);
});



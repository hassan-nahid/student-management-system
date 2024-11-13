import express from 'express'
import cors from 'cors'
import "dotenv/config"
import connectDB from './config/mongodb.js'
import studentRoutes from "./routes/studentRoute.js";
import subjectRoutes from "./routes/subjectRoute.js";
import teacherRoutes from "./routes/teacherRoute.js";
import authRoutes from "./routes/authRoute.js";
import noticeRoutes from "./routes/noticeRoute.js";


const app = express()
const port = process.env.PORT || 5000 


connectDB()


// middleware

app.use(express.json())
app.use(cors())


// routes

app.use('/api/students', studentRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/notices",noticeRoutes);



app.get('/', (req, res) => {
    res.send('Server is running....')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })


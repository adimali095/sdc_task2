require("dotenv").config();
const express = require("express");
const studentRoutes = require("./routes/students");
const mentorRoutes = require("./routes/mentors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use('/api/v1/students',studentRoutes);
app.use('/api/v1/mentors',mentorRoutes);

app.get("/",(req,res)=>{
    res.status(200).send(
        `<h1>Homepage</h1>
        <ul>
            <li>
                <a href="/api/v1/students">Get All Students</a>
            </li>
            <li>
                <a href="/api/v1/mentors">Get All Mentors</a>
            </li>
            <li>
                <a href="/api/v1/students/1">Get Specific Student</a>
            </li>
            <li>
                <a href="/api/v1/mentors/1">Get Specific Mentor</a>
            </li>
            <li>
                <a href="/api/v1/mentors/1/mentees">Get Mentees of Secific Mentor</a>
            </li>
        </ul>
        `
    );
})

app.get("*",(req,res)=>{
    res.status(404).send("<h1>Error 404 ! Webpage not found !</h1>");
})

module.exports = app;
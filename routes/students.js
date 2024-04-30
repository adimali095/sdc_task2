const express = require("express");
const {getAllStudents,getStudent,addStudent} = require("../controllers/studentController");
const {addStudentToDB} = require("../models/studentModel")
const router = express.Router();


router.get("/",getAllStudents);
router.get("/:prn",getStudent);

router.post("/",addStudent)

module.exports = router;
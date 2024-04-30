const express = require("express");
const {getAllMentors,getMentor,getMentorMentees,addMentor} = require("../controllers/mentorController");
const router = express.Router();

router.get("/",getAllMentors);
router.get("/:MentorID", getMentor);
router.get("/:MentorID/mentees", getMentorMentees);

router.post("/",addMentor);

module.exports = router;
const {getAllMentorsFromDB,getMentorFromDB,getMentorMenteesFromDB,addMentorToDB} = require("../models/mentorModel");

const getAllMentors = async(req,res)=>{
    res.setHeader('Content-Type',"application/json");
    try{
    const mentors = await getAllMentorsFromDB();
    if(!mentors){
        return res.status(404).send({"Error 404" : "No Mentors Found"});
    }
    return res.status(200).send(mentors);
    }
    catch(error){
        console.log(error);
        return res.status(500).send({"Error 500" : "Internal Server Error"});
    }
}
const getMentor = async (req,res)=>{
    res.setHeader('Content-Type','application/json');
    try{
    const {MentorID} = req.params;
    const mentor = await getMentorFromDB(MentorID);
    if(!mentor){
        return res.status(404).send({"Error 404" : "Mentor Resource Not Found"})
    }
    return res.status(200).send(mentor);
    }
    catch(error){
        console.log(error);
        return res.status(500).send({"Error 500" : "Internal Server Error"});
    }
}
const getMentorMentees = async (req,res)=>{
    res.setHeader("Content-Type","application/json");
    try{
    const {MentorID} = req.params;
    const mentor = await getMentorFromDB(MentorID);
    if(!mentor){
        return res.status(404).send({"Error 404" : "Mentor Resource Not Found"})
    }
    const mentees = await getMentorMenteesFromDB(MentorID);
    if(!mentees){
        return res.status(404).send({"Error 404":"Mentor Does Not have Mentees !"});
    }
    return res.status(200).send({mentor,mentees});
    }
    catch(error){
        console.log(error);
        return res.status(500).send({"Error 500" : "Internal Server Error"});
    }
}

const addMentor = async (req,res)=>{
    try{
    //console.log(req.body)
    const {mentor} = req.body;
    const re = await addMentorToDB(mentor);
    //console.log(re);
    res.status(200).send("<h4>Mentor Added Successfully</h4>")
    }
    catch(error){
        console.log(error);
        res.status(500).send("<h4>Error 500 : Internal Server Error</h4>")
    }

}
module.exports = {getAllMentors,getMentor,getMentorMentees,addMentor};
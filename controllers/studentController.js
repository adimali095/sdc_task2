const {getAllStudentsFromDB,getStudentFromDB,addStudentToDB} = require("../models/studentModel");

const getAllStudents = async(req,res)=>{
    res.setHeader('Content-Type','application/json');
    try{
    const students = await getAllStudentsFromDB();
    if(!students){
        return res.status(404).send({ "Error 404" : "No Student Resource found"});
    }
    return res.status(200).send(students);
    }
    catch(error){
        console.log(error);
        return res.status(500).send({"Error 500" : "Internal Server Error"});
    }
}
const getStudent = async(req,res)=>{
    
    res.setHeader('Content-Type','application/json');
    try{
    const {prn} = req.params;
    const studentInfo = await getStudentFromDB(prn);
    if(!studentInfo){
        return res.status(404).send({"Error 404": "Student Resource Not Found"});
    }
    return res.status(200).send(studentInfo);
    }
    catch(error){
        console.log(error);
        return res.status(500).send({"Error 500" : "Internal Server Error"});
    }
}
const addStudent = async (req,res)=>{
    //console.log("in addstudents")
    try{
    
    //console.log(req.body)
    const {student} = req.body;
    const re = await addStudentToDB(student);
    //console.log(re);
    res.status(200).send("<h4>Student Added Successfully</h4>")
    }
    catch(error){
        console.log(error);
        res.status(500).send("<h4>Error 500 : Internal Server Error</h4>")
    }

}
module.exports = {getAllStudents,getStudent,addStudent}
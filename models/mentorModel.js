const {db} = require("../config/firebase");
//const {getStudentFromDB} = require("./studentModel.js");

async function getAllMentorsFromDB(){
    const allMentorRef = db.collection("mentors");
    const snapshot = await allMentorRef.get();
    const mentors = [];
    snapshot.forEach(doc => {
        mentors.push(doc.data());
    })
    return mentors;
    //return data.mentors;
}
async function getMentorFromDB(MentorID){
    
    const mentorRef = db.collection("mentors").doc(MentorID);
    const doc =await mentorRef.get();
    if(!doc.exists){
        return null;
    }
    return doc.data();
}

/*
MORE EFFICIENT FUNCTION written BELOW
async function getMentorMenteesFromDB(MentorID){
    const mentor = await getMentorFromDB(MentorID);
    const {mentees} = mentor;
    const mentorMentees = [];
    for(const PRN of mentees){
        const student = await getStudentFromDB(PRN);
        mentorMentees.push(student);
    }
    return mentorMentees.length > 0 ? mentorMentees : null;
}
*/

async function getMentorMenteesFromDB(MentorID){
    const mentor = await getMentorFromDB(MentorID);
    const {mentees} = mentor;
    const snapshot = await db.collection("students").where("prn","in",mentees).get();
    const mentorMentees = [];
    snapshot.forEach(doc =>{
        mentorMentees.push(doc.data());
    })
    return mentorMentees.length > 0 ? mentorMentees : null;
}

async function allDocumentsExist(collectionName, docIds) 
{
    if(!Array.isArray(docIds)){
        const doc = await db.collection(collectionName).doc(docIds).get();
        return doc.exists;
    }    
    const checks = docIds.map(docId => db.collection(collectionName).doc(docId).get());
    const results = await Promise.all(checks);
    return results.every(doc => doc.exists);
}
async function addMentorToDB(mentor){
    //console.log(mentor);
    if(mentor.mentees !== "" && mentor.mentees !== null)
    {
        const menteesExist = await allDocumentsExist("students",mentor.mentees);
        if(!menteesExist){
            return null;
        }
    }
    else{
        mentor.mentees = [];
    }
    if(!Array.isArray(mentor.mentees)){
        mentor.mentees = Array.of(mentor.mentees);
    }
    const studentRef = await db.collection("mentors").doc(mentor.mentorID);
    const res = studentRef.set(mentor);
    return true;
}
module.exports ={getAllMentorsFromDB,getMentorFromDB,getMentorMenteesFromDB,addMentorToDB};
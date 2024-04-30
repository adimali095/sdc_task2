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

async function addMentorToDB(mentor){
    const studentRef = await db.collection("mentors").doc(mentor.mentorID);
    const res = studentRef.set(mentor);
    return res;
}
module.exports ={getAllMentorsFromDB,getMentorFromDB,getMentorMenteesFromDB,addMentorToDB};
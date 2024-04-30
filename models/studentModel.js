const {db} = require("../config/firebase");

async function getAllStudentsFromDB(){
    const allStudentRef = db.collection("students");
    const snapshot = await allStudentRef.get();
    students = [];
    snapshot.forEach(doc => {
        students.push(doc.data());
    })
    return students;
    //return data.students;
}

async function getStudentFromDB(PRN){
    const studentRef = db.collection("students").doc(PRN);
    const doc = await studentRef.get();
    if(!doc.exists){
        return null;
    }
    return doc.data();
    //const student = data.students.find(student => student.PRN === PRN);
    //return student || null;
}
async function addStudentToDB(student){
    const studentRef = await db.collection("students").doc(student.prn+"");
    const res = studentRef.set(student);
    return res;
}
module.exports = {getAllStudentsFromDB,getStudentFromDB,addStudentToDB}
const {initializeApp,cert} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

//console.log("Firebase",process.env.FIREBASE_PROJECT_ID)
const serviceAccount = require("./creds")
initializeApp(
    {
        credential : cert(serviceAccount)
    }
);

const db = getFirestore();

module.exports = {db}
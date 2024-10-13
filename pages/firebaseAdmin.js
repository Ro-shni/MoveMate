// lib/firebaseAdmin.js

const admin = require('firebase-admin');
const serviceAccount = require('C:/Users/ramba/OneDrive/Desktop/MoveMate/movemate-d955c-firebase-adminsdk-bomrq-63df5ea03e.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://movemate-d955c.firebaseio.com" // Using your project ID here
  });
}

// Access Firestore and other services
const db = admin.firestore(); // Firestore access
const auth = admin.auth(); // Firebase Authentication access

// Export admin services
module.exports = { admin, db, auth };


// lib/firebaseAdmin.js

import admin from 'firebase-admin';
//const serviceAccount = require('../config/movemate-d955c-firebase-adminsdk-bomrq-63df5ea03e.json'); 

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
    databaseURL: "https://movemate-d955c.firebaseio.com" // Using your project ID here
  });
}

// Access Firestore and other services
const db = admin.firestore(); // Firestore access
const auth = admin.auth(); // Firebase Authentication access

// Export admin services
module.exports = { admin, db, auth };


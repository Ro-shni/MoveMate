// firebaseFunctions.js

import { getFirestore, collection, getDocs } from "firebase/firestore"; 
import { app } from "../firebase"; // Adjust the path based on your structure

// Initialize Firestore
const db = getFirestore(app);

// Function to fetch ride requests
export const fetchRideRequests = async () => {
  try {
    const requestsCollection = collection(db, "rideRequests"); // Adjust collection name as needed
    const snapshot = await getDocs(requestsCollection);
    const requests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Add document ID
    return requests;
  } catch (error) {
    console.error("Error fetching ride requests:", error);
    throw error; // Rethrow to handle in the calling function
  }
};


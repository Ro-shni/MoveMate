// Import Firebase Admin SDK
import { admin, db } from '../firebaseAdmin'; // Adjust your path

export default async function handler(req, res) {
  try {
    // Example: Fetch data from Firestore
    const snapshot = await db.collection('rideRequests').get();
    const requests = snapshot.docs.map((doc) => doc.data());
    
    // Send back the data
    res.status(200).json({ requests });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}

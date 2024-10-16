// pages/status.js


import React, { useState, useEffect } from 'react';
import tw from 'tailwind-styled-components';
import { db } from '../firebase'; // Import your Firebase configuration
import { doc, onSnapshot } from 'firebase/firestore'; // Import Firestore functions
import Map from "./Index_Page_Components/Map"; // Ensure you import the Map component

const Status = () => {
const [driverId, setDriverId] = useState('');
const [status, setStatus] = useState(null);
const [driverLocation, setDriverLocation] = useState({ latitude: 0, longitude: 0 });
const [trackingId, setTrackingId] = useState('');

const checkStatus = async () => {
// Logic to fetch the status based on driverId
console.log('Checking status for Driver ID:', driverId);

// Fetch ride request based on the driverId (assuming it corresponds to requestId)
const requestRef = doc(db, 'rideRequests', driverId); // Update with the correct collection name
const unsubscribe = onSnapshot(requestRef, (doc) => {
const data = doc.data();
if (data) {
setStatus(data.status); // Set the status based on Firestore data
setTrackingId(driverId); // Set the tracking ID
setDriverLocation(data.driverLocation || { latitude: 0, longitude: 0 }); // Update driver location
}
});

return () => unsubscribe(); // Clean up the listener
};

const handleCheckStatus = () => {
if (driverId) {
checkStatus();
} else {
alert("Please enter a Driver ID");
}
};

return (
<Wrapper>
<Title>Check Driver Status</Title>
<Input
type="text"
placeholder="Enter Tracking ID"
value={driverId}
onChange={(e) => setDriverId(e.target.value)}
/>
<Button onClick={handleCheckStatus}>Check Status</Button>
{status && <StatusMessage>{`Status: ${status}`}</StatusMessage>}
{trackingId && (
<>
<TrackingMessage>
This is your tracking ID: <strong>{trackingId}</strong>.
</TrackingMessage>
<MapContainer>
<Map driverLocation={driverLocation} />
</MapContainer>
</>
)}
</Wrapper>
);
};

export default Status;

// Styled components
const Wrapper = tw.div`
flex flex-col p-4 h-screen bg-gray-100
`;

const Title = tw.h1`
text-xl font-bold mb-4 text-center
`;

const Input = tw.input`
p-2 border rounded mb-4
`;

const Button = tw.button`
bg-black text-white py-2 rounded
`;

const StatusMessage = tw.p`
mt-4 text-green-500
`;

const TrackingMessage = tw.p`
mt-4 text-blue-500
`;

const MapContainer = tw.div`
flex-1
`;

import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import { db } from '../../firebase'; // Adjust the path based on your structure
import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';

const DriverDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "rideRequests"), (snapshot) => {
      const requestsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRequests(requestsData);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Function to track driver's location
  const trackDriverLocation = async (id) => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(async (position) => {
        const driverLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        // Update driver's location in Firestore
        const requestRef = doc(db, 'rideRequests', id);
        await updateDoc(requestRef, {
          driverLocation: driverLocation,
        });

        console.log('Driver location updated:', driverLocation);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const acceptRequest = async (id) => {
    const requestRef = doc(db, 'rideRequests', id);
    await updateDoc(requestRef, { status: 'Accepted' });

    // Start tracking the driver's location after accepting the request
    trackDriverLocation(id);
  };

  const rejectRequest = async (id) => {
    const requestRef = doc(db, 'rideRequests', id);
    await updateDoc(requestRef, { status: 'Rejected' });
  };

  const markAsArrived = async (id) => {
    const requestRef = doc(db, 'rideRequests', id);
    await updateDoc(requestRef, { status: 'Arrived' });
  };

  const startDelivery = async (id) => {
    const requestRef = doc(db, 'rideRequests', id);
    await updateDoc(requestRef, { status: 'Delivery in Progress' });
  };

  const markAsDelivered = async (id) => {
    const requestRef = doc(db, 'rideRequests', id);
    await updateDoc(requestRef, { status: 'Delivered' });
  };

  if (loading) return <p>Loading requests...</p>;

  return (
    <Wrapper>
      <Title>Driver Dashboard - Requests</Title>
      {requests.map((request) => (
        <RequestCard key={request.id}>
          <Info>
            <p>Pickup: {request.pickup}</p>
            <p>Dropoff: {request.dropoff}</p>
            <p>Car: {request.car}</p>
            <p>Price: ${request.price}</p>
            <p>Status: {request.status}</p>
          </Info>
          {request.status === 'Pending' && (
            <Buttons>
              <AcceptButton onClick={() => acceptRequest(request.id)}>
                Accept
              </AcceptButton>
              <RejectButton onClick={() => rejectRequest(request.id)}>
                Reject
              </RejectButton>
            </Buttons>
          )}
          {request.status === 'Accepted' && (
            <Buttons>
              <ActionButton onClick={() => markAsArrived(request.id)}>
                Arrived
              </ActionButton>
            </Buttons>
          )}
          {request.status === 'Arrived' && (
            <Buttons>
              <ActionButton onClick={() => startDelivery(request.id)}>
                Start Delivery
              </ActionButton>
            </Buttons>
          )}
          {request.status === 'Delivery in Progress' && (
            <Buttons>
              <ActionButton onClick={() => markAsDelivered(request.id)}>
                Delivered
              </ActionButton>
            </Buttons>
          )}
        </RequestCard>
      ))}
    </Wrapper>
  );
};

export default DriverDashboard;

// Styled components
const Wrapper = tw.div`
  flex flex-col p-4 h-screen bg-gray-100
`;

const Title = tw.h1`
  text-xl font-bold mb-4
`;

const RequestCard = tw.div`
  bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between
`;

const Info = tw.div`
  flex-1
`;

const Buttons = tw.div`
  flex space-x-4
`;

const AcceptButton = tw.button`
  bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600
`;

const RejectButton = tw.button`
  bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600
`;

const ActionButton = tw.button`
  bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600
`;


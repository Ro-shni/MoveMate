// pages/tracking.js

import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
import { db } from '../firebase'; // Adjust the path based on your structure
import { doc, onSnapshot } from "firebase/firestore"; // Import Firestore functions
import Map from "./Index_Page_Components/Map"; // Ensure you import the Map component
import Link from 'next/link'; // Import Link for navigation

const Tracking = () => {
  const router = useRouter();
  const { requestId } = router.query; // Get the requestId from the URL
  const [driverLocation, setDriverLocation] = useState({ latitude: 0, longitude: 0 });
  const [trackingId, setTrackingId] = useState('');

  // Display a message when the component mounts
  useEffect(() => {
    if (requestId) {
      setTrackingId(requestId); // Set the tracking ID
    }
  }, [requestId]);

  useEffect(() => {
    // Set up a listener to fetch driver location from Firestore
    if (requestId) {
      const unsub = onSnapshot(doc(db, 'rideRequests', requestId), (doc) => {
        const data = doc.data();
        if (data) {
          setDriverLocation(data.driverLocation || { latitude: 0, longitude: 0 });
        }
      });
      return () => unsub(); // Clean up the listener on component unmount
    }
  }, [requestId]);

  return (
    <Wrapper>
      <ButtonContainer>
        <Link href="/confirm">
          <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
        </Link>
      </ButtonContainer>
      <Title>Tracking Your Ride</Title>
      <TrackingMessage>
        This is your tracking ID: <strong>{trackingId}</strong>. Go to the <Link href="/status">status page</Link> to view updates Please Copy your ID.
      </TrackingMessage>
      <MapContainer>
        <Map driverLocation={driverLocation} />
      </MapContainer>
    </Wrapper>
  );
};

export default Tracking;

// Styled components
const Wrapper = tw.div`
  flex flex-col p-4 h-screen bg-gray-100
`;

const Title = tw.h1`
  text-2xl font-bold mb-4 text-center // Added text-center for centering the text
`;

const TrackingMessage = tw.p`
  mb-4 text-gray-700
`;

const MapContainer = tw.div`
  flex-1
`;

const ButtonContainer = tw.div`
  rounded-full absolute top-4 left-4 z-10 bg-white shadow-md cursor-pointer
`;

const BackButton = tw.img`
  h-full object-contain
`;







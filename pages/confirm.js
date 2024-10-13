// Import necessary modules
import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Map from "./Index_Page_Components/Map";
import { useRouter } from "next/router";
import RideSelector from "./Index_Page_Components/RideSelector";
import Link from "next/link";
import { db } from '../firebase'; // Adjust the path based on your structure
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import { getAnalytics, logEvent } from "firebase/analytics"; // Import Analytics functions

const Confirm = () => {
  const router = useRouter();
  const { pickup, dropoff } = router.query;

  const [pickupcoord, setPickupCoord] = useState([0, 0]);
  const [dropoffcoord, setDropoffCoord] = useState([0, 0]);
  const [chosenCar, setChosenCar] = useState(null);
  const [rideDuration, setRideDuration] = useState(null); // Add rideDuration state

  // Initialize Firebase Analytics
  const analytics = getAnalytics();

  // Fetch pickup coordinates
  const getPickupCoord = (pickup) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoiMjJiMDFhNDU3MSIsImEiOiJjbTI1bXp6ejMwdGpyMmtxczE3YjdkMWdrIn0.vR3Jo3g42sq164srmV-4Qg",
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.features.length > 0) {
          setPickupCoord(data.features[0].center);
        }
      })
      .catch((error) => console.error("Error fetching pickup coordinates:", error));
  };

  // Fetch dropoff coordinates
  const getDropoffCoord = (dropoff) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoiMjJiMDFhNDU3MSIsImEiOiJjbTI1bXp6ejMwdGpyMmtxczE3YjdkMWdrIn0.vR3Jo3g42sq164srmV-4Qg",
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.features.length > 0) {
          setDropoffCoord(data.features[0].center);
        }
      })
      .catch((error) => console.error("Error fetching dropoff coordinates:", error));
  };

  // Fetch ride duration from Mapbox Directions API
  const fetchRideDuration = () => {
    fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupcoord[0]},${pickupcoord[1]};${dropoffcoord[0]},${dropoffcoord[1]}?access_token=pk.eyJ1IjoiMjJiMDFhNDU3MSIsImEiOiJjbTI1bXp6ejMwdGpyMmtxczE3YjdkMWdrIn0.vR3Jo3g42sq164srmV-4Qg`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.routes && data.routes.length > 0) {
          setRideDuration(data.routes[0].duration / 60); // Convert seconds to minutes
        }
      })
      .catch((error) => {
        console.error("Error fetching ride duration:", error);
      });
  };

  useEffect(() => {
    if (pickup) getPickupCoord(pickup);
    if (dropoff) getDropoffCoord(dropoff);
  }, [pickup, dropoff]);

  useEffect(() => {
    if (pickupcoord && dropoffcoord) {
      fetchRideDuration(); // Fetch ride duration after coordinates are set
    }
  }, [pickupcoord, dropoffcoord]);

  const handleConfirm = async () => {
    if (chosenCar && rideDuration) {
      try {
        // Save the ride request to Firestore
        const rideRequest = {
          pickup: pickup,
          dropoff: dropoff,
          car: chosenCar.service,
          price: (rideDuration * chosenCar.multiplier).toFixed(2),
          status: "Pending", // Default status
        };

        // Add the document to Firestore
        const docRef = await addDoc(collection(db, "rideRequests"), rideRequest);

        // Log a custom event to Firebase Analytics
        logEvent(analytics, 'ride_requested', {
          pickup: pickup,
          dropoff: dropoff,
          car: chosenCar.service,
          price: (rideDuration * chosenCar.multiplier).toFixed(2),
        });

        // Redirect to tracking page with the request ID
        router.push(`/tracking?requestId=${docRef.id}`);
      } catch (error) {
        console.error("Error creating ride request:", error);
      }
    } else if (!chosenCar) {
      alert("Please select a car first!");
    } else {
      alert("Unable to calculate ride duration.");
    }
  };

  return (
    <Wrapper>
      <ButtonContainer>
        <Link href="/search">
          <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
        </Link>
      </ButtonContainer>
      <Map pickupcoord={pickupcoord} dropoffcoord={dropoffcoord} />
      <RideContainer>
        <RideSelector
          pickupcoord={pickupcoord}
          dropoffcoord={dropoffcoord}
          setChosenCar={setChosenCar}
        />
        <ConfirmButtonContainer>
          <ConfirmButton onClick={handleConfirm}>Confirm Truck</ConfirmButton>
        </ConfirmButtonContainer>
      </RideContainer>
    </Wrapper>
  );
};

export default Confirm;

// Styled components
const ConfirmButton = tw.div`
  bg-black text-white my-4 mx-4 py-4 text-center text-xl
`;

const ConfirmButtonContainer = tw.div`
  border-t-2
`;

const RideContainer = tw.div`
  flex-1 flex flex-col h-1/2
`;

const Wrapper = tw.div`
  flex
  flex-col
  h-screen
`;

const ButtonContainer = tw.div`
  rounded-full absolute top-4 left-4 z-10 bg-white shadow-md cursor-pointer
`;

const BackButton = tw.img`
  h-full object-contain
`;

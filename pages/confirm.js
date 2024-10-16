import React, { useEffect, useState, useCallback } from "react";
import tw from "tailwind-styled-components";
import Map from "./Index_Page_Components/Map";
import { useRouter } from "next/router";
import RideSelector from "./Index_Page_Components/RideSelector";
import Link from "next/link";
import { db } from '../firebase';
import { collection, addDoc, doc } from "firebase/firestore"; // Ensure 'doc' is imported
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase Auth
import { getAnalytics, logEvent } from "firebase/analytics"; 

const Confirm = () => {
  const router = useRouter();
  const { pickup, dropoff } = router.query;

  const [pickupcoord, setPickupCoord] = useState([0, 0]);
  const [dropoffcoord, setDropoffCoord] = useState([0, 0]);
  const [chosenCar, setChosenCar] = useState(null);
  const [rideDuration, setRideDuration] = useState(null);
  const [user, setUser] = useState(null); // Add state for user
  const [analytics, setAnalytics] = useState(null); 

  // Fetch pickup coordinates
  const getPickupCoord = useCallback((pickup) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
      new URLSearchParams({
        access_token: "pk.eyJ1IjoiMjJiMDFhNDU3MSIsImEiOiJjbTI1bXp6ejMwdGpyMmtxczE3YjdkMWdrIn0.vR3Jo3g42sq164srmV-4Qg",
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
  }, []);

  // Fetch dropoff coordinates
  const getDropoffCoord = useCallback((dropoff) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` +
      new URLSearchParams({
        access_token: "pk.eyJ1IjoiMjJiMDFhNDU3MSIsImEiOiJjbTI1bXp6ejMwdGpyMmtxczE3YjdkMWdrIn0.vR3Jo3g42sq164srmV-4Qg",
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
  }, []);

  // Fetch ride duration from Mapbox Directions API
  const fetchRideDuration = useCallback(() => {
    fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupcoord[0]},${pickupcoord[1]};${dropoffcoord[0]},${dropoffcoord[1]}?access_token=pk.eyJ1IjoiMjJiMDFhNDU3MSIsImEiOiJjbTI1bXp6ejMwdGpyMmtxczE3YjdkMWdrIn0.vR3Jo3g42sq164srmV-4Qg`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.routes && data.routes.length > 0) {
          setRideDuration(data.routes[0].duration / 60); 
        }
      })
      .catch((error) => {
        console.error("Error fetching ride duration:", error);
      });
  }, [pickupcoord, dropoffcoord]);

  // Monitor pickup and dropoff changes
  useEffect(() => {
    if (pickup) getPickupCoord(pickup);
    if (dropoff) getDropoffCoord(dropoff);
  }, [pickup, dropoff, getPickupCoord, getDropoffCoord]);

  // Fetch ride duration when coordinates are available
  useEffect(() => {
    if (pickupcoord && dropoffcoord) {
      fetchRideDuration();
    }
  }, [pickupcoord, dropoffcoord, fetchRideDuration]);

  // Set up Firebase Analytics
  useEffect(() => {
    const analyticsInstance = getAnalytics();
    setAnalytics(analyticsInstance);
  }, []);

  // Listen for user authentication state
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        router.push('/login'); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Handle the confirm button click
  const handleConfirm = async () => {
    if (chosenCar && rideDuration) {
      try {
        const rideRequest = {
          pickup: pickup,
          dropoff: dropoff,
          car: chosenCar.service,
          price: (rideDuration * chosenCar.multiplier).toFixed(2),
          status: "Pending", // Status of the ride
        };

        // Store ride request in Firestore
        const docRef = await addDoc(collection(db, "rideRequests"), rideRequest);

        // Add trackingId to user's document under trackingIds subcollection
        if (user) {
          const userDocRef = doc(db, "users", user.email);
          await addDoc(collection(userDocRef, "trackingIds"), {
            requestId: docRef.id,
            ...rideRequest,
          });

          // Log ride request event in analytics
          if (analytics) {
            logEvent(analytics, 'ride_requested', {
              pickup: pickup,
              dropoff: dropoff,
              car: chosenCar.service,
              price: (rideDuration * chosenCar.multiplier).toFixed(2),
            });
          }

          // Redirect to tracking page
          router.push(`/tracking?requestId=${docRef.id}`);
        } else {
          alert("User is not authenticated.");
        }
      } catch (error) {
        console.error("Error creating ride request:", error);
      }
    } else {
      alert("Please select a car first!");
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


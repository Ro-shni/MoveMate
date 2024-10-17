import { useEffect, useState } from "react";
import { db } from "../firebase"; // Your Firebase config
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, getDocs } from "firebase/firestore";
import tw from 'tailwind-styled-components';

const UserDashboard = () => {
  const [user, setUser] = useState(null); // User state
  const [trackingIds, setTrackingIds] = useState([]);

  useEffect(() => {
    const auth = getAuth(); // Initialize Firebase Auth
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchTrackingIds = async () => {
        try {
          // Reference to user's trackingIds subcollection
          const userDocRef = collection(db, "users", user.email, "trackingIds");
          const q = query(userDocRef);
          const querySnapshot = await getDocs(q);

          // Get all the tracking data
          const trackingData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setTrackingIds(trackingData);
        } catch (error) {
          console.error("Error fetching tracking IDs:", error);
        }
      };

      fetchTrackingIds();
    }
  }, [user]);

  if (!user) {
    return (
      <Wrapper>
        <Card>
          <Title>Please log in to access your dashboard</Title>
        </Card>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Title>{user.displayName} Dashboard</Title>
      <Subtitle>Your Tracking IDs</Subtitle>
      {trackingIds.length > 0 ? (
        <ul>
          {trackingIds.map((tracking) => (
            <TrackingCard key={tracking.id}>
              <Info>
                <p><strong>Tracking ID:</strong> {tracking.requestId}</p>
                <p><strong>Pickup:</strong> {tracking.pickup}</p>
                <p><strong>Dropoff:</strong> {tracking.dropoff}</p>
                <p><strong>Status:</strong> {tracking.status}</p>
              </Info>
              <StatusLabel status={tracking.status}>{tracking.status}</StatusLabel>
            </TrackingCard>
          ))}
        </ul>
      ) : (
        <Card>No tracking IDs found</Card>
      )}
    </Wrapper>
  );
};

export default UserDashboard;

// Tailwind styled components
const Wrapper = tw.div`
  flex flex-col p-6 min-h-screen bg-gray-100
`;

const Title = tw.h1`
  text-2xl font-bold text-gray-900 mb-6
`;

const Subtitle = tw.h2`
  text-lg font-semibold text-gray-700 mb-4
`;

const TrackingCard = tw.li`
  bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center
`;

const Info = tw.div`
  flex-1
`;

const StatusLabel = tw.span`
  ${(props) => props.status === 'Completed' 
    ? 'bg-green-100 text-green-800' 
    : 'bg-yellow-100 text-yellow-800'}
  px-3 py-1 rounded-full text-sm font-semibold
`;

const Card = tw.div`
  bg-white p-4 rounded-lg shadow-md text-center
`;




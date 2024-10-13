import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API route
    const fetchRequests = async () => {
      try {
        const response = await fetch('/api/admin'); // Calling the API route
        const data = await response.json();
        setRequests(data.requests);
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) return <LoadingMessage>Loading...</LoadingMessage>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <Wrapper>
      <Title>Admin Dashboard</Title>
      <RequestList>
        {requests.map((request, index) => (
          <RequestCard key={index}>
            <RequestInfo>
              <strong>Pickup:</strong> {request.pickup} <br />
              <strong>Dropoff:</strong> {request.dropoff} <br />
              <strong>Car:</strong> {request.car} <br />
              <strong>Price:</strong> ${request.price} <br />
              <strong>Status:</strong> {request.status}
            </RequestInfo>
          </RequestCard>
        ))}
      </RequestList>
    </Wrapper>
  );
};

export default AdminDashboard;

// Styled components using tailwind
const Wrapper = tw.div`
  flex flex-col items-center justify-center p-6 h-screen bg-gray-100
`;

const Title = tw.h1`
  text-3xl font-bold text-gray-800 mb-6
`;

const RequestList = tw.div`
  w-full max-w-4xl space-y-4
`;

const RequestCard = tw.div`
  bg-white p-6 rounded-lg shadow-md
`;

const RequestInfo = tw.div`
  text-gray-700
`;

const LoadingMessage = tw.p`
  text-lg text-blue-500
`;

const ErrorMessage = tw.p`
  text-lg text-red-500
`;


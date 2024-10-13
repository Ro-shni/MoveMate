// pages/drivers.js

import React from 'react';
import DriverDashboard from './Index_Page_Components/DriverDashboard'; // Adjust the path as needed

const DriversPage = () => {
  return <DriverDashboard />;
};

export default DriversPage;




/*import React, { useState, useEffect } from 'react';
import tw from 'tailwind-styled-components';

const DriverDashboard = () => {
  // Hardcoded list of requests (In a real scenario, you'd fetch this from a server)
  const [requests, setRequests] = useState([
    {
      id: 1,
      pickup: 'Tanuku',
      dropoff: 'Tenali',
      car: 'BoxTruck',
      price: 209.25,
      status: 'Pending',
    },
    {
      id: 2,
      pickup: 'Vijayawada',
      dropoff: 'Guntur',
      car: 'CargoVan',
      price: 150.75,
      status: 'Pending',
    },
  ]);

  // Function to accept a request
  const acceptRequest = (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === id ? { ...req, status: 'Accepted' } : req
      )
    );
  };

  // Function to reject a request
  const rejectRequest = (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === id ? { ...req, status: 'Rejected' } : req
      )
    );
  };

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

*/

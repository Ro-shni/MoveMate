// pages/api/getRideRequests.js
export default function handler(req, res) {
    // Simulate ride requests
    const rideRequests = [
      { id: 1, pickup: "Location A", dropoff: "Location B" },
      { id: 2, pickup: "Location C", dropoff: "Location D" },
    ];
    
    res.status(200).json(rideRequests);
  }
  
  
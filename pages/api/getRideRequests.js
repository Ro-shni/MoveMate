// pages/api/getRideRequests.js
export default function handler(req, res) {
    // Simulate ride requests
    const rideRequests = [
      { id: 1, pickup: "Location A", dropoff: "Location B" },
      { id: 2, pickup: "Location C", dropoff: "Location D" },
    ];
    
    res.status(200).json(rideRequests);
  }
  
  // pages/api/acceptRequest/[id].js
  export default function handler(req, res) {
    const { id } = req.query;
    // Here, you would normally update the request status in your database
  
    res.status(200).json({ message: `Request ${id} accepted` });
  }
  
  // pages/api/rejectRequest/[id].js
  export default function handler(req, res) {
    const { id } = req.query;
    // Here, you would normally update the request status in your database
  
    res.status(200).json({ message: `Request ${id} rejected` });
  }
  
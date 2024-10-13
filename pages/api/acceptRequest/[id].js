// pages/api/acceptRequest/[id].js
export default function handler(req, res) {
    const { id } = req.query;
    // Here, you would normally update the request status in your database
  
    res.status(200).json({ message: `Request ${id} accepted` });
  }
  

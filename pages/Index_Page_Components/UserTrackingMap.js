// components/UserTrackingMap.js

import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import tw from "tailwind-styled-components";

// Initialize the Mapbox access token
mapboxgl.accessToken = "pk.eyJ1IjoiMjJiMDFhNDU3MSIsImEiOiJjbTI1bXp6ejMwdGpyMmtxczE3YjdkMWdrIn0.vR3Jo3g42sq164srmV-4Qg";

const UserTrackingMap = ({ pickupcoord, driverLocation }) => {
useEffect(() => {
const map = new mapboxgl.Map({
container: "user-map", // Ensure this matches your map container ID
style: "mapbox://styles/mapbox/streets-v11",
center: pickupcoord || [-99.29011, 39.39172], // Default center if no pickup
zoom: 10,
});

    // Add markers for pickup and driver locations
    if (pickupcoord && pickupcoord[0] !== 0 && pickupcoord[1] !== 0) {
      addMarkerToMap(map, pickupcoord, "Pickup", "blue");
    }

    if (driverLocation && driverLocation.longitude !== 0 && driverLocation.latitude !== 0) {
      addMarkerToMap(map, [driverLocation.longitude, driverLocation.latitude], "Driver", "red");
    }

// Adjust map bounds to include all markers
const bounds = new mapboxgl.LngLatBounds();
if (pickupcoord) bounds.extend(pickupcoord);
if (driverLocation) bounds.extend([driverLocation.longitude, driverLocation.latitude]);

if (!bounds.isEmpty()) {
map.fitBounds(bounds, {
padding: 60,
maxZoom: 15,
duration: 1000,
});
}

return () => map.remove(); // Clean up the map
  }, [pickupcoord, driverLocation]); // Dependencies

const addMarkerToMap = (map, coordinates, label, color) => {
if (Array.isArray(coordinates) && coordinates.length === 2) {
new mapboxgl.Marker({ color })
.setLngLat(coordinates)
.setPopup(new mapboxgl.Popup().setText(label)) // Show label in popup
.addTo(map);
}
};

return <div id="user-map" style={{ width: '100%', height: '500px' }}></div>; // Ensure height for the map
};

export default UserTrackingMap;

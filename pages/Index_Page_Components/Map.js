import { useEffect } from "react";
import mapboxgl from "!mapbox-gl"; // Ensure the path to mapbox-gl is correct
import tw from "tailwind-styled-components";

// Initialize the Mapbox access token
mapboxgl.accessToken = "pk.eyJ1IjoiMjJiMDFhNDU3MSIsImEiOiJjbTI1bXp6ejMwdGpyMmtxczE3YjdkMWdrIn0.vR3Jo3g42sq164srmV-4Qg";

const Map = ({ pickupcoord, dropoffcoord, driverLocation }) => {
  useEffect(() => {
    // Create a new map instance
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-99.29011, 39.39172], // Default center coordinates
      zoom: 3,
    });

    // Add markers for pickup, dropoff, and driver
    if (pickupcoord) addToMap(map, pickupcoord, "Pickup", "blue");
    if (dropoffcoord) addToMap(map, dropoffcoord, "Dropoff", "green");
    if (driverLocation) addToMap(map, driverLocation, "Driver", "red");

    // Adjust map zoom to fit all points
    const bounds = new mapboxgl.LngLatBounds();
    if (pickupcoord) bounds.extend(pickupcoord);
    if (dropoffcoord) bounds.extend(dropoffcoord);
    if (driverLocation) bounds.extend([driverLocation.longitude, driverLocation.latitude]);

    if (bounds.isEmpty() === false) {
      map.fitBounds(bounds, {
        padding: 60,
        maxZoom: 15,
        duration: 1000,
      });
    }
  }, [pickupcoord, dropoffcoord, driverLocation]);

  const addToMap = (map, coordinates, label, color) => {
    // Check if coordinates are valid
    if (coordinates && Array.isArray(coordinates) && coordinates.length === 2) {
      new mapboxgl.Marker({ color: color })
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.Popup().setText(label)) // Show label in popup
        .addTo(map);
    } else if (coordinates && coordinates.latitude && coordinates.longitude) {
      // Handle driver location which might be in object form
      new mapboxgl.Marker({ color: color })
        .setLngLat([coordinates.longitude, coordinates.latitude])
        .setPopup(new mapboxgl.Popup().setText(label))
        .addTo(map);
    } else {
      console.error("Invalid coordinates:", coordinates);
    }
  };

  return <Wrapper id="map"></Wrapper>;
};

// Styled component for map container
const Wrapper = tw.div`
  flex-1 h-full
`;

export default Map;


import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { carList } from "../../public/carList"; // Ensure the path is correct

const RideSelector = ({ pickupcoord, dropoffcoord, setChosenCar }) => {
    const [rideDuration, setRideDuration] = useState(0); // State to hold ride duration
    const [selectedCar, setSelectedCar] = useState(null); // State to track selected car

    useEffect(() => {
        // Ensure pickupcoord and dropoffcoord are defined before fetching
        if (pickupcoord && dropoffcoord) {
            // Fetch ride duration from Mapbox API
            fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${pickupcoord[0]},${pickupcoord[1]};${dropoffcoord[0]},${dropoffcoord[1]}?access_token=pk.eyJ1IjoiMjJiMDFhNDU3MSIsImEiOiJjbTI1bXp6ejMwdGpyMmtxczE3YjdkMWdrIn0.vR3Jo3g42sq164srmV-4Qg`)
                .then((res) => res.json())
                .then((data) => {
                    setRideDuration(data.routes[0].duration / 60); // Convert seconds to minutes
                })
                .catch((error) => {
                    console.error("Error fetching ride duration:", error);
                });
        }
    }, [pickupcoord, dropoffcoord]); // Dependency array to rerun effect when coordinates change

    const handleCarSelect = (car) => {
        setSelectedCar(car.service); // Set the selected car
        setChosenCar(car); // Pass the selected car to the parent component (Confirm page)
    };

    return (
        <Wrapper>
            <Title>Choose a ride, or swipe for more</Title>
            <CarList>
                {carList.map((car, index) => (
                    <Car
                        key={index}
                        onClick={() => handleCarSelect(car)} // Handle car selection on click
                        style={{
                            border: selectedCar === car.service ? "2px solid black" : "none", // Highlight selected car
                        }}
                    >
                        <CarImage src={car.imgUrl} />
                        <CarDetails>
                            <Service>{car.service}</Service>
                            <Time>{rideDuration ? `${rideDuration.toFixed(0)} min away` : "Loading..."}</Time>
                        </CarDetails>
                        <Price>{`$${(rideDuration * car.multiplier).toFixed(2)}`}</Price> {/* Calculate price */}
                    </Car>
                ))}
            </CarList>
        </Wrapper>
    );
};

export default RideSelector;

// Styled components
const CarDetails = tw.div`
  flex-1
`;
const Service = tw.div`
  font-medium
`;
const Time = tw.div`
  text-xs text-blue-500
`;
const Price = tw.div`
  text-sm
`;
const CarImage = tw.img`
  h-14 mr-4
`;
const Car = tw.div`
  flex p-4 items-center bg-white rounded-lg shadow-md my-2 cursor-pointer
`;
const Title = tw.div`
  text-gray-500 text-center text-xs py-2 border-b
`;
const CarList = tw.div`
  overflow-y-scroll
`;
const Wrapper = tw.div`
  flex-1 overflow-y-scroll flex flex-col
`;


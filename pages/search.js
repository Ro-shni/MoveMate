import React, { useState } from "react";
import tw from "tailwind-styled-components";
import Link from "next/link";

const Search = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  return (
    <Wrapper>
      <ButtonContainer>
        <Link href="/user">
          <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
        </Link>
      </ButtonContainer>
      <InputContainer>
        <FormRow>
          <FormToIcons>
            <Circle src="https://img.icons8.com/ios-filled/50/9CA3AF/filled-circle.png" />
            <Line src="https://img.icons8.com/ios/50/9CA3AF/vertical-line.png" />
            <Square src="https://img.icons8.com/windows/50/000000/square-full.png" />
          </FormToIcons>
          <InputBoxes>
            <Input
              placeholder="Enter Pickup location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />
            <Input
              placeholder="Where to?"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
            />
          </InputBoxes>
        </FormRow>
        <PlusIcon src="https://img.icons8.com/ios/50/000000/plus-math.png" />
      </InputContainer>
      <SavedPlaces>
        <StarIcon src="https://img.icons8.com/ios-filled/50/ffffff/star--v1.png" />
        Saved Places
      </SavedPlaces>
      <Link
        href={{
          pathname: "/confirm",
          query: {
            pickup: pickup,
            dropoff: dropoff,
          },
        }}
      >
        <ConfirmButtonContainer>Confirm Location</ConfirmButtonContainer>
      </Link>
    </Wrapper>
  );
};

const Wrapper = tw.div`
    bg-gray-200
    h-screen
    p-4
    flex
    flex-col
    justify-between
`;

const ButtonContainer = tw.div`
  hover:cursor-pointer
  h-12
`;

const BackButton = tw.img`
  h-12
`;

const SavedPlaces = tw.div`
  flex
  items-center
  bg-white
  p-4
  rounded-lg
  shadow-lg
  mb-4
  transition
  duration-300
  hover:shadow-xl
`;

const InputContainer = tw.div`
  flex
  flex-col
  justify-center
  items-center
  mt-4
`;

const FormRow = tw.div`
  flex
  items-center
  w-full
`;

const Circle = tw.img`
  h-3
  w-3
`;

const Line = tw.img``;

const Square = tw.img`
  h-3.5
  w-3.5
`;

const StarIcon = tw.img`
  h-5
`;

const FormToIcons = tw.div`
  w-10 flex flex-col items-center mr-2 // Added margin-right for spacing
`;

const InputBoxes = tw.div`
  flex flex-col flex-1 w-full
  mt-2
`;

const Input = tw.input`
  h-12 
  bg-white 
  rounded-lg 
  p-2 
  outline-none 
  border 
  border-gray-300
  shadow-sm
  transition 
  duration-300 
  focus:border-blue-500
  focus:shadow-lg
  mb-2
`;

const PlusIcon = tw.img`
  w-10 
  h-10 
  bg-gray-200 
  rounded-full 
  ml-3
  mb-4
`;

const ConfirmButtonContainer = tw.div`
    bg-black
    rounded-lg
    text-white
    flex-1
    flex
    font-medium
    justify-center
    h-12
    items-center
    hover:text-black
    hover:shadow-inner
    hover:bg-white
    hover:cursor-pointer
    duration-300
    border
    border-gray-800
    transition
    ease-in-out
`;

export default Search;


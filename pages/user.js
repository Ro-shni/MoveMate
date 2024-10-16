import Head from "next/head";
import React from "react"; 
import tw from "tailwind-styled-components";
import Map from "./Index_Page_Components/Map";
import Header from "./Index_Page_Components/Header";
import Link from "next/link"; // Import Link from next/link

const User = () => {
  return (
    <Wrapper>
      <Header />
      <MapWrapper>
        <Map />
      </MapWrapper>
      <ActionItems>
        <ActionButtons>
          <Link href="/search">  
            <ActionButtonContainer>
              <ActionButtonStyled
                src="/images/box-truck.jpg"
                type="Book"
              />
              <ActionLabel>Book</ActionLabel>
            </ActionButtonContainer>
          </Link>

          <Link href="/status"> 
            <ActionButtonContainer>
              <ActionButtonStyled
                src="/images/statusimg.jpeg"
                type="Status"
              />
              <ActionLabel>Status</ActionLabel>
            </ActionButtonContainer>
          </Link>

          <Link href="/search"> 
            <ActionButtonContainer>
              <ActionButtonStyled
                src="/images/reserveimg.jpeg"
                type="Reserve"
              />
              <ActionLabel>Reserve</ActionLabel>
            </ActionButtonContainer>
          </Link>
        </ActionButtons>
      </ActionItems>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex 
  flex-col  
  h-screen
`;

const MapWrapper = tw.div`
  flex-1
`;

const ActionItems = tw.div`
  p-5
  flex 
  justify-center 
  items-end
  pb-6  // adds a little gap at the bottom
`;

const ActionButtons = tw.div`
  flex
  justify-between
  gap-4
  w-full
  max-w-md  // limits the width of the buttons to look clean
`;

const ActionButtonContainer = tw.div`
  flex flex-col items-center
  p-3
  bg-gray-100
  rounded-xl
  border-gray-300
  shadow-md
  hover:shadow-lg
  transition
  cursor-pointer
  w-full
`;

const ActionButtonStyled = tw.img`
  w-full
  h-24
  rounded-2xl
`;

const ActionLabel = tw.p`
  mt-2 text-gray-700 text-sm font-medium
`;

export default User;


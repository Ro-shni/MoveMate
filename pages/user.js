import Head from "next/head";
import React from "react"; 
import tw from "tailwind-styled-components";
import Map from "./Index_Page_Components/Map";
import Header from "./Index_Page_Components/Header";
import ActionButton from "./Index_Page_Components/ActionButton";
import WhereToButton from "./Index_Page_Components/WhereToButton";

const User = () => {
  return (
    <Wrapper>
      <Map />
      <ActionItems>
        <Header />
        <ActionButtons>
          <ActionButtonContainer>
            <ActionButton
              src="/images/box-truck.jpg"
              type="Book"

            />
            <ActionLabel>Book</ActionLabel>
          </ActionButtonContainer>

          <ActionButtonContainer>
            <ActionButton
              src="/images/statusimg.jpeg"
              type="Status"

            />
            <ActionLabel>Status</ActionLabel>
          </ActionButtonContainer>

          <ActionButtonContainer>
            <ActionButton
              src="/images/reserveimg.jpeg"
              type="Reserve"

            />
            <ActionLabel>Reserve</ActionLabel>
          </ActionButtonContainer>
        </ActionButtons>

        <WhereToButton />
      </ActionItems>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex 
  flex-col  
  h-screen
`;

const ActionItems = tw.div`
  flex-1
  p-5
`;

const ActionButtons = tw.div`
  flex
  justify-between
  gap-4
`;

const ActionButtonContainer = tw.div`
  flex flex-col items-center
`;

const ActionLabel = tw.p`
  mt-2 text-gray-600 text-lg font-medium
`;

export default User;


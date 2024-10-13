// pages/index.js

import Head from "next/head";
import React from "react";
import tw from "tailwind-styled-components";
import Link from "next/link"; // Import Link from next/router for navigation

const Home = () => {
  return (
    <Wrapper>
      <Head>
        <title>Welcome to MoveMate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Content>
        <Title>Welcome to MoveMate</Title>
        <Description>
          Please choose your role to continue:
        </Description>
        
        <ButtonContainer>
          <Link href="/UserLogin">
            <LoginButton>User Login</LoginButton>
          </Link>
          <Link href="/DriverLogin">
            <LoginButton>Driver Login</LoginButton>
          </Link>
          <Link href="/AdminLogin">
            <LoginButton>Admin Login</LoginButton>
          </Link>
        </ButtonContainer>
      </Content>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex 
  flex-col  
  h-screen
  bg-gray-200
  justify-center
  items-center
`;

const Content = tw.div`
  flex flex-col items-center
`;

const Title = tw.h1`
  text-4xl font-bold mb-4
`;

const Description = tw.p`
  text-lg mb-6
`;

const ButtonContainer = tw.div`
  flex flex-col space-y-4
`;

const LoginButton = tw.button`
  bg-black
  text-white
  rounded
  py-3
  px-6
  text-lg
  hover:bg-gray-800
  transition duration-300
  w-60
`;

export default Home;

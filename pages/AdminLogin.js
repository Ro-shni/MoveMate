import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../firebase";

const AdminLogin = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Check if the user is an admin (you may want to fetch this from Firestore)
        if (user.email === "roshni.nekkanti@gmail.com") { // Replace with your admin email check
          router.push('/admin'); // Redirect to admin dashboard if authenticated
        } else {
          alert("You do not have admin access.");
        }
      }
    });
    return () => unsubscribe(); // Cleanup subscription
  }, [router]);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Admin info:", result.user);
    } catch (error) {
      console.error("Error during sign-in:", error);
      alert("Error: " + error.message); // Alert for better visibility
    }
  };

  return (
    <Wrapper>
      <UberLogo>
        <Logo src="/images/logo.png" />
      </UberLogo>
      <LoginPrompt>Log in as Admin to access your dashboard</LoginPrompt>
      <LoginImg>
        <Img src="/images/loginimg.png" />
      </LoginImg>
      <SignInWithGoogle onClick={handleLogin}>
        <SignIn>Sign in with Google</SignIn>
      </SignInWithGoogle>
    </Wrapper>
  );
};

const Wrapper = tw.div`flex flex-col bg-gray-200 p-4 h-screen`;
const UberLogo = tw.div`p-2 mb-4`;
const Logo = tw.img`h-9`;
const LoginPrompt = tw.div`text-5xl text-gray-500`;
const LoginImg = tw.div`flex justify-center items-center mb-4`;
const Img = tw.img`object-contain self-start h-80 w-auto`;
const SignInWithGoogle = tw.div`flex justify-center bg-black text-white items-center h-11 w-auto rounded mt-6 hover:cursor-pointer`;
const SignIn = tw.div``;

export default AdminLogin;

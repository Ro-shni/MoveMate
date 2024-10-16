// pages/DriverLogin.js

import tw from "tailwind-styled-components";
import { useEffect } from "react";
import { useRouter } from 'next/router';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { auth, provider } from "../firebase";

const DriverLogin = () => {
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push('/drivers'); // Redirect to driver dashboard if authenticated
            }
        });
        return () => unsubscribe(); // Cleanup subscription
    }, [router]);

    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log("Driver info:", result.user);
        } catch (error) {
            console.error("Error during sign-in:", error);
            alert("Error: " + error.message); // Alert for better visibility
        }
    };

    return (
        <Wrapper>
            <UberLogo>
                <Logo src="/images/logo.jpeg" />
            </UberLogo>
            <LoginPrompt>
                Driver Login: Log in to access your dashboard
            </LoginPrompt>
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

export default DriverLogin;

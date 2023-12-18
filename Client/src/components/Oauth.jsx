import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";

const Oauth = () => {
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
    } catch (error) {
      console.log("couldnot sign in with google", error);
    }
  };
  return (
    <button
      type="button"
      className="bg-red-500 rounded"
      onClick={handleGoogleClick}
    >
      Sign In with Google
    </button>
  );
};

export default Oauth;

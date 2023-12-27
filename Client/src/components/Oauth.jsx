import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { signInSucess } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

const Oauth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/v1/google", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSucess(data));
      navigate("/");
    } catch (error) {
      console.log("Could not sign in with Google", error);
    }
  };

  return (
    <button
      type="button"
      className="flex items-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-md transition duration-300 hover:border-gray-400 hover:shadow-lg focus:outline-none focus:shadow-outline-blue active:border-gray-500"
      onClick={handleGoogleClick}
    >
      <FaGoogle className="text-xl text-red-500 mr-2" />
      <span className="font-semibold">Sign in with Google</span>
    </button>
  );
};

export default Oauth;

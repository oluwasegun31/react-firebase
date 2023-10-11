import { useState } from "react";
import { auth, googleProvider } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // sigin func
  const signIn = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("signed in successfully");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err.message);
    }
  };
  const googleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("signed in successfully");
    } catch (err) {
      console.error(err.message);
    }
  };
  const logoutLogic = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      console.log("signed out successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="flex gap-3">
      <input
        type="email"
        placeholder="email..."
        className="border border-black text-lg font-medium p-1"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password..."
        className="border border-black text-lg font-medium p-1"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="button"
        className="bg-black text-white px-3 py-1 cursor-pointer"
        onClick={(e) => signIn(e)}
      >
        Sign In
      </button>
      <button
        className="bg-yellow-400 text-black px-3 py-1 "
        onClick={(e) => googleSignIn(e)}
      >
        Google
      </button>
      <button
        className="bg-red-500 text-white px-3 py-1 cursor-pointer"
        onClick={(e) => logoutLogic(e)}
      >
        LogOut
      </button>
    </div>
  );
};

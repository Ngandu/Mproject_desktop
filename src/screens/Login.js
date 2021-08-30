import React, { useEffect, useState } from "react";
import "./../index.css";
import { observer } from "mobx-react-lite";
// import { signIn } from "./../sdk/FirebaseMethods";

import firebase from "firebase/app";
import "firebase/auth";

const Login = observer(({ userstore }) => {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("pnganu@yahoo.com");
  const [password, setPassword] = useState("pass@word1");

  useEffect(() => {
    console.log(userstore);
  }, []);

  async function signIn(email, password) {
    try {
      console.log(email);
      await firebase.auth().signInWithEmailAndPassword(email, password);
      return true;
    } catch (err) {
      alert("There is something wrong!", err.message);
    }
  }

  const emptyState = () => {
    setEmail("");
    setPassword("");
  };

  const handleSignin = async () => {
    setLoading(true);
    if (!email) {
      alert("Email field is required.");
      setLoading(false);
      return;
    } else if (!password) {
      alert("Password field is required.");
      setLoading(false);
      return;
    }

    const db = firebase.firestore();
    const userDetails = await db
      .collection("users")
      .where("email", "==", email)
      .get();

    userDetails.forEach((doc) => {
      let dd = doc.data();
      console.log(dd);

      if (dd.type !== "admin") {
        alert("user not permitted");
        return;
      } else {
        signIn(email, password);
      }
    });
  };

  firebase.auth().onAuthStateChanged((user) => {
    //setLoading(false);
    console.log("user -", user);
    if (user) {
      emptyState();
      // Update Mobx User and Login
      console.log("setUser");
      userstore.setUser(user);
      userstore.setLoggedIn(true);
      //navigation.replace("Home");
    }
  });

  return (
    <>
      <div className="w-screen bg-gray-100">
        <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 w-11/12 max-w-xl sm:mx-auto">
            <div className="relative p-8 bg-white shadow-sm sm:rounded-xl">
              <h1 className="text-center p-4">Please Login</h1>
              <div className="w-full">
                <div className="mb-5 relative">
                  <input
                    type="email"
                    id="email"
                    className="peer pt-8 border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-16 placeholder-transparent"
                    placeholder="name@example.com"
                    autoComplete="off"
                    value={email}
                    onChange={(text) => setEmail(text.target.value)}
                  />
                  <label
                    htmlFor="email"
                    className="peer-placeholder-shown:opacity-100   opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out"
                  >
                    Email address
                  </label>
                </div>
                <div className="mb-5 relative">
                  <input
                    type="password"
                    id="password"
                    className="peer pt-8 border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-16 placeholder-transparent"
                    placeholder="password"
                    autoComplete="off"
                    value={password}
                    onChange={(text) => setPassword(text.target.value)}
                  />
                  <label
                    htmlFor="password"
                    className="peer-placeholder-shown:opacity-100   opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out"
                  >
                    Password
                  </label>
                </div>
                <button
                  onClick={handleSignin}
                  type="button"
                  className="w-full bg-blue-600 text-white p-3 rounded-md"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Login;

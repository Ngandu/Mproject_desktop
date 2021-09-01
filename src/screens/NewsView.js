import React, { useState, useEffect } from "react";
import "./../index.css";
import { observer } from "mobx-react-lite";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import Subnav from "../components/subnav";

const NewsView = observer(({ userstore, commonstore }) => {
  const Appointment = commonstore.selectedAppointment;
  const [User, setUser] = useState();
  console.log(Appointment);

  async function getUser() {
    try {
      const db = firebase.firestore();
      const querySnapshot = await db
        .collection("users")
        // .where("ApplicationId", "==", "bo3DkIU8KzhNzn7fNLig")
        .where("userid", "==", `${Appointment.userid}`)
        .get();
      let uuers = [];
      querySnapshot.forEach((doc) => {
        uuers.push(doc.data());
      });
      setUser(uuers);
      // return await db.collection("applications").get(id);
    } catch (err) {
      alert("There is something wrong!!!!");
      console.log(err.message);
    }
  }

  useEffect(() => {
    console.log("Application View");
    // getUser();
  }, []);

  // console.log(User[0]);

  return (
    <>
      <Subnav />
      <div classNameName="container mx-auto">
        {/* <div classNameName="box-border h-32 w-32 p-4 border-4">
          <p>Users</p>
        </div> */}

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              News
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Details.</p>
          </div>
        </div>
      </div>
    </>
  );
});

export default NewsView;

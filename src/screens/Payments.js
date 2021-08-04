import React, { useState, useEffect } from "react";
import "./../index.css";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const Payments = observer(({ userstore, commonstore }) => {
  const [Payment, setPayment] = useState();
  let history = useHistory();
  const Application = commonstore.selectedApplication;
  // Get all the users
  async function getPayment() {
    try {
      const db = firebase.firestore();
      const querySnapshot = await db
        .collection("payments")
        // .where("ApplicationId", "==", "bo3DkIU8KzhNzn7fNLig")
        .where("ApplicationId", "==", `${Application.id}`)
        .get();
      let uuers = [];
      querySnapshot.forEach((doc) => {
        uuers.push(doc.data());
      });
      setPayment(uuers);
      // return await db.collection("applications").get(id);
    } catch (err) {
      alert("There is something wrong!!!!");
      console.log(err.message);
    }
  }

  //   const ddate = new Date(schedule.appointmentDate.seconds * 1000);

  //   const time_ = "" + ddate.getHours() + ":" + ddate.getMinutes() + "";
  //   const date_ =
  //     "" +
  //     ddate.getDate() +
  //     " / " +
  //     ddate.getMonth() +
  //     " / " +
  //     ddate.getFullYear() +
  //     "";

  useEffect(() => {
    console.log("Appointment");
    getPayment();
  }, []);

  console.log(Payment);
  console.log(Application.id);

  function selectPayment(n) {
    commonstore.setSelectedPayment(n);
    history.push("/Payment");
  }

  return (
    <>
      <div classNameName="container mx-auto">
        {/* <div classNameName="box-border h-32 w-32 p-4 border-4">
          <p>Users</p>
        </div> */}
        <h2>Payment</h2>
        {Payment.length === 0 ? (
          <div class="alert flex flex-row items-center bg-red-200 p-5 rounded border-b-2 border-red-300">
            <div class="alert-icon flex items-center bg-red-100 border-2 border-red-500 justify-center h-10 w-10 flex-shrink-0 rounded-full">
              <span class="text-red-500">
                <svg fill="currentColor" viewBox="0 0 20 20" class="h-6 w-6">
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
            </div>
            <div class="alert-content ml-4">
              <div class="alert-title font-semibold text-lg text-red-800">
                Error
              </div>
              <div class="alert-description text-sm text-red-600">
                This is an alert message, alert message goes here..!
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
});

export default Payments;

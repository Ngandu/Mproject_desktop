import React, { useState, useEffect } from "react";
import "./../index.css";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import axios from "axios";

import Subnav from "../components/subnav";

import VisaView from "./../components/visaView";
import PassportView from "./../components/passportView";
import BirthView from "./../components/birthView";

const ApplicationView = observer(({ userstore, commonstore }) => {
  const Application = commonstore.selectedApplication;
  const [Payment, setPayment] = useState();
  const [photoUrl, setPhotoUrl] = useState(null);

  let history = useHistory();
  console.log(Application);

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

  const getPhoto = async (id) => {
    console.log("getPhoto()");
    const token = await axios.get(
      `https://firebasestorage.googleapis.com/v0/b/mproject-802df.appspot.com/o/photos%2F${id}`
    );

    let finalUrl = `https://firebasestorage.googleapis.com/v0/b/mproject-802df.appspot.com/o/photos%2F${id}?alt=media&token=${token.data.downloadTokens}`;
    // console.log("finalUrl", finalUrl);
    setPhotoUrl(finalUrl);
  };

  useEffect(() => {
    console.log("Application View");
    getPayment();
    getPhoto(Application.id);
  }, []);

  const sendNotification = async (notice) => {
    const db = firebase.firestore();
    await db.collection("userNotifications").add(notice);
    console.log("Update Notification sent.");
  };

  const updateApplication = async () => {
    let newStatus = "";
    if (Application.status == "New") newStatus = "In Process";
    if (Application.status == "In Process") newStatus = "Complete";
    if (Application.status == "Complete") newStatus = "Collected";
    if (Application.status == "Collected")
      return alert("Application cannot be updated");

    // Comfirm updating of application

    // eslint-disable-next-line no-restricted-globals
    let conf = confirm(`Are sure to update Application to ${newStatus}?`);
    if (!conf) return;

    let appli = Application;
    let docId = appli.id;
    appli.status = newStatus;

    try {
      const db = firebase.firestore();
      const querySnapshot = await db
        .collection("applications")
        .doc(docId)
        .update(appli);
      console.log(querySnapshot);
      let notice = {
        userid: appli.userid,
        message: `Your Application has been updated to ${newStatus}`,
        read: "unread",
        noticedate: new Date(),
      };

      sendNotification(notice);
      alert("Updated successfully!");
    } catch (err) {
      alert("There is something wrong!!!!");
      console.log(err);
    }

    // const update = updateApplication(docId, appli);

    // console.log(update);
  };

  return (
    <>
      <Subnav />
      <div classNameName="container mx-auto">
        {/* <div classNameName="box-border h-32 w-32 p-4 border-4">
          <p>Users</p>
        </div> */}
        {/* <div class="bg-white w-screen overflow-auto whitespace-no-wrap py-3 px-4 text-center">
          <button
            class="inline-block border border-teal-500 text-teal-500 rounded-full px-6 py-2 mr-4"
            onClick={() => history.push("/Payments")}
          >
            View Payment
          </button>
          <button class="inline-block border border-teal-500 text-teal-500 rounded-full px-6 py-2 mr-4">
            View Profile
          </button>
          <button class="inline-block border border-teal-500 text-teal-500 rounded-full px-6 py-2 mr-4">
            View Appointment
          </button>
        </div> */}

        {Payment && Payment.length === 0 ? (
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
                No Payment
              </div>
              <div class="alert-description text-sm text-red-600">
                There is no payment for this application
              </div>
            </div>
          </div>
        ) : (
          <div class="alert flex flex-row items-center bg-green-200 p-5 rounded border-b-2 border-green-300">
            <div class="alert-icon flex items-center bg-green-100 border-2 border-green-500 justify-center h-10 w-10 flex-shrink-0 rounded-full">
              <span class="text-green-500">
                <svg fill="currentColor" viewBox="0 0 20 20" class="h-6 w-6">
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
            </div>
            <div class="alert-content ml-4">
              <div class="alert-title font-semibold text-lg text-green-800">
                Payment completed
              </div>
              <div class="alert-description text-sm text-green-600">
                Applicant has already paid for this Application.
              </div>
            </div>
          </div>
        )}

        {Application.applicationType === "Birth"
          ? BirthView(Application, photoUrl)
          : null}
        {Application.applicationType === "Visa"
          ? VisaView(Application, photoUrl)
          : null}
        {Application.applicationType === "Passport"
          ? PassportView(Application, photoUrl)
          : null}
      </div>
      <button
        className="z-30 fixed m-2 right-6 bottom-6 shadow-md bg-blue-500 text-white p-5 rounded-full"
        onClick={() => updateApplication()}
      >
        Update Application
      </button>
    </>
  );
});

export default ApplicationView;

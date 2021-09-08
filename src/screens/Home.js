import React, { useEffect, useState } from "react";
import "./../index.css";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faFile,
  faClock,
  faBell,
  faNewspaper,
} from "@fortawesome/fontawesome-free-solid";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const Home = observer(({ userstore }) => {
  let history = useHistory();
  const [UUsers, setUsers] = useState([]);
  const [Applications, setApplications] = useState([]);
  const [Appointment, setAppointment] = useState([]);
  const [Notifications, setNotifications] = useState([]);
  const today = new Date();

  async function getUsers() {
    try {
      const db = firebase.firestore();
      const querySnapshot = await db.collection("users").get();
      //let u = querySnapshot.data();
      //console.log(querySnapshot.docs());
      let uuers = [];
      querySnapshot.forEach((doc) => {
        uuers.push(doc.data());
      });
      setUsers(uuers);
      // return await db.collection("applications").get(id);
    } catch (err) {
      alert("There is something wrong!!!!");
      console.log(err.message);
    }
  }

  // Get all the Applications
  async function getApplications() {
    try {
      const db = firebase.firestore();
      const querySnapshot = await db.collection("applications").get();
      let uuers = [];
      querySnapshot.forEach((doc) => {
        //console.log(doc.id);
        uuers.push({ id: doc.id, ...doc.data() });
      });
      setApplications(uuers);
      // return await db.collection("applications").get(id);
    } catch (err) {
      alert("There is something wrong!!!!");
      console.log(err.message);
    }
  }

  async function getAppointment() {
    try {
      const db = firebase.firestore();
      const querySnapshot = await db.collection("appointment").get();
      let uuers = [];
      querySnapshot.forEach((doc) => {
        let dd = doc.data();
        console.log(dd.appointmentDate.toDate());
        let ddate = new Date(dd.appointmentDate.toDate());
        if (today.getTime() < ddate) {
          uuers.push({ id: doc.id, status: "Overdue", ...doc.data() });
        } else if (
          today.getDate() === ddate.getDate() &&
          today.getMonth() === ddate.getMonth()
        ) {
          uuers.push({ id: doc.id, status: "Today", ...doc.data() });
        } else {
          uuers.push({ id: doc.id, status: "Future", ...doc.data() });
        }
      });
      setAppointment(uuers);
      // return await db.collection("applications").get(id);
    } catch (err) {
      alert("There is something wrong!!!!");
      console.log(err.message);
    }
  }

  // Get all the users
  async function getNotifications() {
    console.log("getNotifications()");
    try {
      const db = firebase.firestore();
      const querySnapshot = await db.collection("notifications").get();
      let uuers = [];
      querySnapshot.forEach((doc) => {
        // let dd = doc.data();
        // console.log(dd);
        uuers.push({ id: doc.id, ...doc.data() });
      });
      setNotifications(uuers);
      console.log(uuers);
    } catch (err) {
      alert("There is something wrong!!!!");
      console.log(err.message);
    }
  }

  useEffect(() => {
    console.log(userstore);

    // get the collections counts
    getUsers();
    getApplications();
    getAppointment();
    getNotifications();
  }, []);

  console.log(today.toISOString().split("T")[0]);

  return (
    <>
      <div className="container mx-auto my-2.5 flex  flex-col  md:flex-row justify-center  flex-wrap gap-3 mt-10">
        <div className="bg-white max-w-xs shadow-lg   mx-auto border-b-4 border-blue-600 rounded-2xl overflow-hidden  hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer">
          <div className="bg-blue-600  flex h-20  items-center ">
            <h1 className="text-white ml-4 border-2 py-2 px-4 rounded-full">
              <FontAwesomeIcon icon={faUsers} />
            </h1>
            <p className="ml-4 text-white uppercase">Users</p>
          </div>
          <p className="py-6 px-6 text-4xl tracking-wide text-center text-blue-600">
            {UUsers.length}
          </p>
          <p className="py-6 px-6 text-lg tracking-wide text-center">
            Users in the system
          </p>

          <div className="flex justify-center px-5 mb-2 text-sm ">
            <button
              type="button"
              className="border w-full border-blue-600 text-blue-600 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-blue-600 focus:outline-none focus:shadow-outline"
              onClick={() => {
                history.push("/users");
              }}
            >
              View
            </button>
          </div>
        </div>

        <div className="bg-white max-w-xs shadow-lg   mx-auto border-b-4 border-indigo-600 rounded-2xl overflow-hidden  hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer">
          <div className="bg-indigo-600  flex h-20  items-center">
            <h1 className="text-white ml-4 border-2 py-2 px-4 rounded-full">
              <FontAwesomeIcon icon={faFile} />
            </h1>
            <p className="ml-4 text-white uppercase">Applications</p>
          </div>
          <p className="py-6 px-6 text-4xl tracking-wide text-center text-blue-600">
            {Applications.length}
          </p>
          <p className="py-6 px-6 text-lg tracking-wide text-center">
            All Applications to date
          </p>

          <div className="flex justify-center px-5 mb-2 text-sm ">
            <button
              type="button"
              className="border w-full border-indigo-600 text-indigo-600 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
              onClick={() => {
                history.push("/Applications");
              }}
            >
              View
            </button>
          </div>
        </div>

        <div className="bg-white max-w-xs shadow-lg   mx-auto border-b-4 border-green-600 rounded-2xl overflow-hidden  hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer">
          <div className="bg-green-600  flex h-20  items-center">
            <h1 className="text-white ml-4 border-2 py-2 px-4 rounded-full">
              <FontAwesomeIcon icon={faClock} />
            </h1>
            <p className="ml-4 text-white uppercase">Appointment</p>
          </div>
          <p className="py-6 px-6 text-4xl tracking-wide text-center text-blue-600">
            {Appointment.length}
          </p>
          <p className="py-6 px-6 text-lg tracking-wide text-center">
            All Appointments to date
          </p>

          <div className="flex justify-center px-5 mb-2 text-sm ">
            <button
              type="button"
              className="border w-full border-green-600 text-green-600 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-green-600 focus:outline-none focus:shadow-outline"
              onClick={() => {
                history.push("/Appointment");
              }}
            >
              View
            </button>
          </div>
        </div>

        <div className="bg-white max-w-xs shadow-lg   mx-auto border-b-4 border-red-600 rounded-2xl overflow-hidden  hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer">
          <div className="bg-red-600  flex h-20  items-center">
            <h1 className="text-white ml-4 border-2 py-2 px-4 rounded-full">
              <FontAwesomeIcon icon={faBell} />
            </h1>
            <p className="ml-4 text-white uppercase">Notifications</p>
          </div>
          <p className="py-6 px-6 text-4xl tracking-wide text-center text-blue-600">
            {Notifications.length}
          </p>
          <p className="py-6 px-6 text-lg tracking-wide text-center">
            All Notifications sent out
          </p>

          <div className="flex justify-center px-5 mb-2 text-sm ">
            <button
              type="button"
              className="border w-full border-red-600 text-red-600 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-red-600 focus:outline-none focus:shadow-outline"
              onClick={() => {
                history.push("/Notifications");
              }}
            >
              View
            </button>
          </div>
        </div>
        <div className="row">
          <p className="z-30 fixed m-2 left-6 bottom-6 shadow-md bg-green-500 text-white p-5 rounded-full">
            Date: {today.toISOString().split("T")[0]}
          </p>
        </div>
      </div>
    </>
  );
});

export default Home;

import React, { useState, useEffect } from "react";
import "./../index.css";
import { observer } from "mobx-react-lite";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const AppointmentView = observer(({ userstore, commonstore }) => {
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
    getUser();
  }, []);

  console.log(User[0]);

  return (
    <>
      <div classNameName="container mx-auto">
        {/* <div classNameName="box-border h-32 w-32 p-4 border-4">
          <p>Users</p>
        </div> */}

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Appointment Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Details.</p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {Appointment.fullname}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Category</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {Appointment.category}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Appointment Date & Time
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {Date(Appointment.appointmentDate)}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Message</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {Appointment.message}
                </dd>
              </div>
            </dl>
          </div>
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Appointee Contact Details
            </h3>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Cellphone</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {User && User[0].cellphone}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {User && User[0].email}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
});

export default AppointmentView;

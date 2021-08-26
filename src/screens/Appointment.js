import React, { useState, useEffect } from "react";
import "./../index.css";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const Appointment = observer(({ userstore, commonstore, props }) => {
  const [Appointment, setAppointment] = useState();
  const [showStatus, setShowStatus] = useState("Overdue");

  let history = useHistory();
  const today = new Date();
  // Get all the users
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

  useEffect(() => {
    console.log("Appointment");
    getAppointment();
    // console.log(Appointment);
    // console.log(today.getTime());
  }, []);

  // console.log(Appointment);

  function selectAppointment(n) {
    commonstore.setSelectedAppointment(n);
    history.push("/AppointmentView");
  }

  return (
    <>
      <nav className="bg-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">Appointments</div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <div
                    className="text-gray-700 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                    onClick={() => setShowStatus("Today")}
                  >
                    Today
                  </div>
                  <div
                    className="text-gray-700 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                    onClick={() => setShowStatus("Future")}
                  >
                    Future
                  </div>
                  <div
                    className="text-gray-700 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                    onClick={() => setShowStatus("Overdue")}
                  >
                    Overdue
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div classNameName="container mx-auto">
        {/* <div classNameName="box-border h-32 w-32 p-4 border-4">
          <p>Users</p>
        </div> */}
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Fullname
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Appointment Subject
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date & Time
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Message
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Appointment &&
                      Appointment.map((appli, key) => {
                        // console.log(showStatus, appli.status);
                        if (appli.status === showStatus) {
                          let ddate = new Date(appli.appointmentDate * 1000);
                          // let status = "";
                          // console.log(ddate);

                          const minutes =
                            ddate.getMinutes() === 0
                              ? "00"
                              : ddate.getMinutes();

                          const time_ =
                            "" + ddate.getHours() + ":" + minutes + "";
                          const date_ =
                            "" +
                            ddate.getDate() +
                            " / " +
                            ddate.getMonth() +
                            "";

                          return (
                            <tr key={key}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {appli.fullname}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {appli.category}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-400">
                                  {appli.status === "Overdue" ? (
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                      {date_ + " - " + time_}
                                    </span>
                                  ) : (
                                    date_ + " - " + time_
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-400">
                                  {appli.message}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                  onClick={() => selectAppointment(appli)}
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                          );
                        }
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Appointment;

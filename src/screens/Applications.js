import React, { useState, useEffect } from "react";
import "./../index.css";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const Applications = observer(({ userstore, commonstore, props }) => {
  const [Applications, setApplications] = useState();
  let history = useHistory();
  // Get all the users
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

  useEffect(() => {
    console.log("Applications");
    getApplications();
  }, []);

  console.log(Applications);

  function selectApplication(n) {
    commonstore.setSelectedApplication(n);
    history.push("/ApplicationView");
  }

  return (
    <>
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
                        Application Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Applications &&
                      Applications.map((appli, key) => {
                        return (
                          <tr key={key}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {appli.firstName + " " + appli.surname}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {appli.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {appli.applicationType}
                              </div>
                              <div className="text-sm text-gray-500">
                                {appli.nationelite}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {appli.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => selectApplication(appli)}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        );
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

export default Applications;

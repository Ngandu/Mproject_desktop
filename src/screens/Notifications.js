import React, { useState, useEffect } from "react";
import "./../index.css";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const Notifications = observer(({ userstore, commonstore, props }) => {
  const [Notifications, setNotifications] = useState([]);
  let history = useHistory();
  // Get all the users
  async function getNotifications() {
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
      //console.log(uuers);
    } catch (err) {
      alert("There is something wrong!!!!");
      console.log(err.message);
    }
  }

  useEffect(() => {
    console.log("Notifications");
    getNotifications();
  }, []);

  //console.log(Notifications);

  function selectNotification(n) {
    commonstore.setSelectedApplication(n);
    history.push("/ApplicationView");
  }

  const renderList = () => {
    // Notifications.map((notice, key) => {
    //   return <p>Boom</p>;
    // });
    // for (let notice in Notifications) {
    //   console.log(notice);
    //   return <p>{notice.title}</p>;
    // }

    console.log(Notifications.length);

    for (let i = 0; i < Notifications.length; i++) {
      console.log(i);
      return <p>{Notifications[i].title}</p>;
    }
  };

  return (
    <>
      <div classNameName="container mx-auto">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                {/* <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Notifications
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200"></tbody>
                </table> */}
                {renderList()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Notifications;

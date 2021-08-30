import React, { useState, useEffect } from "react";
import "./../index.css";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/fontawesome-free-solid";

const Notifications = observer(({ userstore, commonstore, props }) => {
  const [Notifications, setNotifications] = useState([]);
  let history = useHistory();
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
    console.log("Notifications");
    getNotifications();
  }, []);

  //console.log(Notifications);

  function addNotification() {
    history.push("/NotificationNew");
  }

  async function deleteNotice(id) {
    // alert(id);
    try {
      const db = firebase.firestore();
      db.collection("notifications").doc(id).delete();
      alert("Notification deleted");
      getNotifications();
    } catch (err) {
      alert("There is something wrong!!!!");
      console.log(err.message);
    }
  }

  return (
    <>
      <div className="container mx-auto">
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
                        Sent Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Notifications &&
                      Notifications.map((notice, key) => {
                        let dd = notice.notedate.toDate().toDateString();
                        return (
                          <tr key={key}>
                            <td
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                            >
                              <div className="text-sm text-gray-900">
                                {notice.title}
                              </div>
                            </td>
                            <td
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-small text-gray-500 tracking-wider"
                            >
                              <div className="text-sm text-gray-900">
                                {notice.notice}
                              </div>
                            </td>
                            <td
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-small text-gray-500 tracking-wider"
                            >
                              <div className="text-sm text-gray-900">{dd}</div>
                            </td>
                            <td
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-small text-gray-500 tracking-wider"
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                color="red"
                                className="pointer"
                                onClick={() => deleteNotice(notice.id)}
                              />
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
      <button
        className="z-30 fixed m-2 right-6 bottom-6 shadow-md bg-blue-500 text-white p-5 rounded-full"
        onClick={() => addNotification()}
      >
        <FontAwesomeIcon icon={faPlus} /> New Notification
      </button>
    </>
  );
});

export default Notifications;

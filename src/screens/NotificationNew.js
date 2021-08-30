import React, { useState, useEffect } from "react";
import "./../index.css";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const NotificationNew = observer(({ userstore, commonstore, props }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  let history = useHistory();
  // Get all the users

  useEffect(() => {
    console.log("Notification New");
  }, []);

  //console.log(Notifications);

  async function addNotification() {
    let notData = {
      title: title,
      notice: message,
      notedate: new Date(),
    };

    try {
      const db = firebase.firestore();
      const querySnapshot = await db.collection("notifications").add(notData);
      console.log(querySnapshot);
      setTitle("");
      setMessage("");
      history.push("/Notifications");
      //console.log(uuers);
    } catch (err) {
      alert("There is something wrong!!!!");
      console.log(err.message);
    }

    console.log(notData);
  }

  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <div className="relative p-8 bg-white shadow-sm sm:rounded-xl">
                  <h1 className="text-center p-4">New Notification</h1>
                  <div className="w-full">
                    <div className="mb-5 relative">
                      <input
                        type="text"
                        id="title"
                        className="peer pt-8 border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-16 placeholder-transparent"
                        placeholder="Title"
                        autoComplete="off"
                        defaultValue={title}
                        onChange={(text) => setTitle(text.target.value)}
                      />
                      <label
                        htmlFor="title"
                        className="peer-placeholder-shown:opacity-100   opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out"
                      >
                        Title
                      </label>
                    </div>
                    <div className="mb-5 relative">
                      <input
                        type="text"
                        id="message"
                        className="peer pt-8 border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-16 placeholder-transparent"
                        placeholder="Message"
                        autoComplete="off"
                        defaultValue={message}
                        onChange={(text) => setMessage(text.target.value)}
                      />
                      <label
                        htmlFor="message"
                        className="peer-placeholder-shown:opacity-100   opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out"
                      >
                        Message
                      </label>
                    </div>
                    <button
                      onClick={addNotification}
                      type="button"
                      className="w-full bg-blue-600 text-white p-3 rounded-md"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default NotificationNew;

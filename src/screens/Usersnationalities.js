import React, { useState, useEffect } from "react";
import "./../index.css";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const Usersnationalities = observer(({ userstore, commonstore, props }) => {
  const [UUsers, setUsers] = useState([]);
  const [stats, setStats] = useState([]);
  let history = useHistory();
  // Get all the users
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

  useEffect(() => {
    console.log("Users");
    getUsers();
  }, []);

  useEffect(() => {
    let result = UUsers.reduce(function (r, a) {
      r[a.nationality] = r[a.nationality] || [];
      r[a.nationality].push(a);
      return r;
    }, Object.create(null));

    console.log(result);
    setStats(Object.entries(result));

    // console.log(UUsers);
  }, [UUsers]);

  return (
    <>
      <nav className="bg-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">Users</div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <div
                    className="text-gray-700 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                    onClick={() => history.push("/users")}
                  >
                    List
                  </div>
                  <div
                    className="text-gray-700 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                    onClick={() => history.push("/usersnationalities")}
                  >
                    Nationalities
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="container mx-auto">
        {/* <div className="box-border h-32 w-32 p-4 border-4">
          <p>Users</p>
        </div> */}
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <div className="border-t border-gray-200">
                  {stats &&
                    stats.map((stt, i) => {
                      return (
                        <div
                          key={i}
                          className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                        >
                          <dt className="text-sm font-medium text-gray-500">
                            {stt[0]}
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {stt[1].length}
                          </dd>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Usersnationalities;

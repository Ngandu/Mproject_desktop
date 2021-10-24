import React, { useState, useEffect } from "react";
import "./../index.css";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const Users = observer(({ userstore, commonstore, props }) => {
  const [UUsers, setUsers] = useState([]);
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
    // console.log(UUsers);
  }, [UUsers]);

  //console.log(UUsers);

  function selectuser(user) {
    //console.log(user);
    commonstore.setSelectedUser(user);
    history.push("/usersview");
  }

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
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Contact
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">View</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {UUsers &&
                      UUsers.map((usr, key) => {
                        return (
                          <tr key={key}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {usr.firstName + " " + usr.lastName}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {usr.email}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-400">
                                {usr.cellphone}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-400">
                                <button
                                  className="bg-blue-500 p-2 text-white rounded-lg"
                                  onClick={() => selectuser(usr)}
                                  // onClick={selectuser(usr)}
                                >
                                  View
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                        // console.log(usr.email);
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

export default Users;

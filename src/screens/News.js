import React, { useState, useEffect } from "react";
import "./../index.css";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/fontawesome-free-solid";

const News = observer(({ userstore, commonstore, props }) => {
  const [News, setNews] = useState();
  let history = useHistory();
  // Get all the users
  async function getNews() {
    try {
      const db = firebase.firestore();
      const querySnapshot = await db.collection("news").get();
      let uuers = [];
      querySnapshot.forEach((doc) => {
        //console.log(doc.id);
        uuers.push({ id: doc.id, ...doc.data() });
      });
      setNews(uuers);
      // return await db.collection("applications").get(id);
    } catch (err) {
      alert("There is something wrong!!!!");
      console.log(err.message);
    }
  }

  useEffect(() => {
    console.log("News");
    getNews();
  }, []);

  console.log(News);

  function addNews() {
    history.push("/NewsNew");
  }

  function deleteNews(n) {
    try {
      const db = firebase.firestore();
      db.collection("news").doc(n).delete();
      alert("News deleted");
      getNews();
    } catch (err) {
      alert("There is something wrong!!!!");
      console.log(err.message);
    }
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
                        Title
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
                    {News &&
                      News.map((notice, key) => {
                        let dd = notice.newsDate.toDate().toDateString();
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
                                onClick={() => deleteNews(notice.id)}
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
        onClick={() => addNews()}
      >
        <FontAwesomeIcon icon={faPlus} /> Add News
      </button>
    </>
  );
});

export default News;

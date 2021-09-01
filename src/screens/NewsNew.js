import React, { useState, useEffect } from "react";
import "./../index.css";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const NewsNew = observer(({ userstore, commonstore }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  let history = useHistory();

  useEffect(() => {
    console.log("New News");
    // getUser();
  }, []);

  async function addNews() {
    alert("news");
    let nw = {
      title: title,
      content: content,
      imageUrl: imageUrl,
      newsDate: new Date(),
    };

    try {
      const db = firebase.firestore();
      const querySnapshot = await db.collection("news").add(nw);
      console.log(querySnapshot);
      setTitle("");
      setContent("");
      setImageUrl("");
      history.push("/News");
      //console.log(uuers);
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

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Add News
            </h3>
          </div>
          <div className="w-full p-20">
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
              <textarea
                type="text"
                id="message"
                className="peer pt-8 border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-16 placeholder-transparent"
                placeholder="Message"
                autoComplete="off"
                defaultValue={content}
                onChange={(text) => setContent(text.target.value)}
              ></textarea>
              <label
                htmlFor="message"
                className="peer-placeholder-shown:opacity-100   opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out"
              >
                Message
              </label>
            </div>
            <div className="mb-5 relative">
              <input
                type="text"
                id="title"
                className="peer pt-8 border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-16 placeholder-transparent"
                placeholder="Title"
                autoComplete="off"
                defaultValue={imageUrl}
                onChange={(text) => setImageUrl(text.target.value)}
              />
              <label
                htmlFor="title"
                className="peer-placeholder-shown:opacity-100   opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out"
              >
                Image Url
              </label>
            </div>
            <button
              onClick={addNews}
              type="button"
              className="w-full bg-blue-600 text-white p-3 rounded-md"
            >
              Add News
            </button>
          </div>
        </div>
      </div>
    </>
  );
});

export default NewsNew;

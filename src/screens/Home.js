import React, { useEffect } from "react";
import "./../index.css";
import { observer } from "mobx-react-lite";

const Home = observer(({ userstore }) => {
  useEffect(() => {
    console.log(userstore);
  }, []);

  return (
    <>
      <div className="container mx-auto my-2.5">
        <div className="inline-block m-2 box-border h-32 w-32 p-4 bg-blue-600 shadow-lg">
          <p className="text-center text-white font-bold">Dashboard</p>
        </div>
        <div className="inline-block m-2 box-border h-32 w-32 p-4 bg-blue-600 shadow-lg">
          <p className="text-center text-white font-bold">Users</p>
        </div>
        <div className="inline-block m-2 box-border h-32 w-32 p-4 bg-blue-600 shadow-lg">
          <p className="text-center text-white font-bold">Applications</p>
        </div>
        <div className="inline-block m-2 box-border h-32 w-32 p-4 bg-blue-600 shadow-lg">
          <p className="text-center text-white font-bold">Appointments</p>
        </div>
        <div className="inline-block m-2 box-border h-32 w-32 p-4 bg-blue-600 shadow-lg">
          <p className="text-center text-white font-bold">Notications</p>
        </div>
      </div>
    </>
  );
});

export default Home;

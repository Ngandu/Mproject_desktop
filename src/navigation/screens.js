import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import logo from "./../img/icon.png";

// Mobx Stores
import UserStore from "./../stores/UserStore";
import CommonStore from "./../stores/CommonStore";

// Screens
import Home from "../screens/Home";
import Users from "../screens/Users";
import UserView from "../screens/UsersView";
import Login from "../screens/Login";
import Applications from "../screens/Applications";
import ApplicationView from "../screens/ApplicationView";
import Appointment from "../screens/Appointment";
import AppointmentView from "../screens/AppointmentView";
import Payments from "../screens/Payments";

// Mobx Screens
const MHome = () => <Home userstore={UserStore}></Home>;
const MLogin = () => <Login userstore={UserStore}></Login>;
const MUsers = () => (
  <Users userstore={UserStore} commonstore={CommonStore}></Users>
);
const MUserView = () => (
  <UserView userstore={UserStore} commonstore={CommonStore}></UserView>
);
const MApplications = () => (
  <Applications userstore={UserStore} commonstore={CommonStore}></Applications>
);
const MApplicationView = () => (
  <ApplicationView
    userstore={UserStore}
    commonstore={CommonStore}
  ></ApplicationView>
);
const MAppointment = () => (
  <Appointment userstore={UserStore} commonstore={CommonStore}></Appointment>
);
const MAppointmentView = () => (
  <AppointmentView
    userstore={UserStore}
    commonstore={CommonStore}
  ></AppointmentView>
);
const MPayments = () => (
  <Payments userstore={UserStore} commonstore={CommonStore}></Payments>
);

const Screens = observer(() => {
  const [userState, setUserState] = useState();

  useEffect(() => {
    setUserState(UserStore.loggedIn);
  }, []);

  useEffect(() => {
    setUserState(UserStore.loggedIn);
  }, [UserStore.loggedIn]);

  async function signOut() {
    firebase
      .auth()
      .signOut()
      .then(
        function () {
          console.log("Signed Out");
          UserStore.setUser({});
          UserStore.setLoggedIn(false);
        },
        function (error) {
          console.error("Sign Out Error", error);
        }
      );
  }

  const screenRender = (loginState) => {
    if (loginState === true) {
      return (
        <Router>
          <>
            <nav className="bg-blue-600">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8"
                        src={logo}
                        alt="DRC Embassy"
                      ></img>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        <Link
                          to="/"
                          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                          Dashboard
                        </Link>
                        <Link
                          to="/users"
                          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                          Users
                        </Link>
                        <Link
                          to="/Applications"
                          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                          Applications
                        </Link>
                        <Link
                          to="/Appointment"
                          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                          Appointments
                        </Link>
                        <Link
                          to=""
                          onClick={signOut}
                          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                          Logout
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
            <Switch>
              <Route path="/" exact component={MHome} />
              <Route path="/users" component={MUsers} />
              <Route path="/usersview" component={MUserView} />
              <Route path="/Applications" component={MApplications} />
              <Route path="/ApplicationView" component={MApplicationView} />
              <Route path="/Appointment" component={MAppointment} />
              <Route path="/AppointmentView" component={MAppointmentView} />
              <Route path="/Payments" component={MPayments} />
            </Switch>
          </>
        </Router>
      );
    } else {
      return (
        <>
          <MLogin />
        </>
      );
    }
  };

  return screenRender(userState);
});

export default Screens;

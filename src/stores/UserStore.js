import { makeAutoObservable } from "mobx";

class UserStore {
  //observables
  user = {};
  loggedIn = false;

  constructor() {
    makeAutoObservable(this);
  }

  // actions
  setUser(user) {
    this.user = user;
    this.loggedIn = true;
  }

  setLoggedIn(loggedIn) {
    this.loggedIn = loggedIn;
  }

  setLogout() {
    this.user = {};
    this.loggedIn = false;
  }

  // computed's
  get getUserID() {
    return this.user.username;
  }
}

export default new UserStore();

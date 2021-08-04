import { makeAutoObservable } from "mobx";

class CommonStore {
  //observables
  selectedUser = {};
  selectedApplication = {};
  selectedAppointment = {};
  selectedPayment = {};

  constructor() {
    makeAutoObservable(this);
  }

  // actions
  setSelectedUser(user) {
    this.selectedUser = user;
  }
  // actions
  setSelectedApplication(application) {
    this.selectedApplication = application;
  }
  // actions
  setSelectedAppointment(appointment) {
    this.selectedAppointment = appointment;
  }
  // actions
  setselectedPayment(pay) {
    this.selectedPayment = pay;
  }
}

export default new CommonStore();

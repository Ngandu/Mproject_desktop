import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

export async function registration(
  email,
  password,
  lastName,
  firstName,
  cellphone,
  dob,
  occupation
) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;

    const db = firebase.firestore();

    db.collection("users").doc(currentUser.uid).set({
      email: currentUser.email,
      lastName: lastName,
      firstName: firstName,
      cellphone: cellphone,
      dob: dob,
      occupation: occupation,
      userid: currentUser.uid,
    });
  } catch (err) {
    alert("There is something wrong!!!!", err.message);
  }
}

export async function signIn(email, password) {
  try {
    console.log(email);
    await firebase.auth().signInWithEmailAndPassword(email, password);
    return true;
  } catch (err) {
    alert("There is something wrong!", err.message);
  }
}

export async function loggingOut() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    alert("There is something wrong!", err.message);
  }
}

export async function updateProfile(
  firstName,
  lastName,
  dob,
  cellphone,
  email,
  userid,
  occupation
) {
  let updateData = {
    firstName,
    lastName,
    dob,
    cellphone,
    email,
    userid,
    occupation,
  };
  console.log(updateData);
  try {
    const db = firebase.firestore();
    await db.collection("users").doc(userid).update(updateData);
    return true;
  } catch (err) {
    alert("There is something wrong!", err.message);
  }
}

export async function registerWithGoogle() {
  console.log("google");
  //return;
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithRedirect(provider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log("Error: ", error);
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
}

export async function passwordReset(email) {
  try {
    console.log("running....");
    // const send = await firebase.auth().sendPasswordResetEmail(email);
    await firebase.auth().sendPasswordResetEmail(email);
    return true;
  } catch (error) {
    console.log(error);
    alert("There is something wrong!", error.message);
  }
}

/* Applications */

// Load application for the user on the db
export async function loadApplication(application) {
  try {
    const db = firebase.firestore();

    // db.collection("applications")
    //   .add(application)
    //   .then((docRef) => {
    //     console.log(docRef.id);
    //     return docRef.id;
    //   });
    let ret = await db.collection("applications").add(application);
    return ret;
  } catch (err) {
    alert("There is something wrong!!!!", err.message);
    return 0;
  }
}

// get Application
export async function getApplication(id) {
  try {
    const db = firebase.firestore();
    const querySnapshot = await db.collection("applications").doc(id).get();
    return querySnapshot.data();
    // return await db.collection("applications").get(id);
  } catch (err) {
    alert("There is something wrong!!!!", err.message);
  }
}

/* Appointment */

//Add appointment
export async function loadAppointment(appointment) {
  try {
    const db = firebase.firestore();
    let noon = db.collection("appointment").doc().set(appointment);
    console.log(noon);
  } catch (err) {
    alert("There is something wrong!!!!", err.message);
  }
}

// Load payment
export async function loadPayment(info) {
  try {
    const db = firebase.firestore();
    let noon = db.collection("payments").add(info);
    return noon;
  } catch (err) {
    alert("There is something wrong!!!!", err.message);
    return 1;
  }
}

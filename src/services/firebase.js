import firebase from "firebase/app";
import "firebase/messaging";
import "firebase/database";
import "firebase/analytics";
import { store } from "../state/redux/store";
import { setNotificationToken, setNotifications, addTemp } from "../state/redux/notification/action";
import { usersActions } from "../state/redux/users/actions";
import { usersService } from "./users-service";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyC1k0_qfrWXft0nZBS0O96yqnHHX2S1nMA",
  authDomain: "zeedas-e4e53.firebaseapp.com",
  databaseURL: "https://zeedas-e4e53.firebaseio.com",
  projectId: "zeedas-e4e53",
  storageBucket: "zeedas-e4e53.appspot.com",
  messagingSenderId: "1029425544408",
  appId: "1:1029425544408:web:6db8ea5b035f23c523abad",
  measurementId: "G-W02JSPCRWP",
};

firebase.initializeApp(FIREBASE_CONFIG);
firebase.analytics();

const messaging = firebase.messaging();
const database = firebase.database();
firebase.database.enableLogging((message) => console.log("[FIREBASE]:", message));

async function getToken() {
  return messaging.getToken({ vapidKey: process.env.REACT_APP_FCM_MESSAGING_KEY })
    .then((currentToken) => {
      if (currentToken) {
        // console.log("[NOTIFICATION]: TOKEN:", currentToken);
        const setTokenPayload = {
          update: {
            firebaseToken: currentToken,
          },
        };
        usersService
          .setFirebaseToken(setTokenPayload)
          .then(() => {
            // console.log("[NOTIFICATION]: TOKEN:", currentToken);
            store.dispatch(setNotificationToken(currentToken));
            store.dispatch(usersActions.fetchAccountInfo());
          });
      } else {
        // console.log("No registration token available. Request permission to generate one.");
      }
    })
    .catch((err) => {
      // console.log("An error occurred while retrieving token. ", err);
    });
}

async function initializeFirebase() {
  await Notification.requestPermission()
    .then((permission) => {
      if (permission === "granted") {
        return getToken();
      }
    });

  messaging.onMessage((payload) => {
    store.dispatch(addTemp(payload));
    // console.log("[NOTIFICATION]: NOTIFICATION RECEIVED:", payload);
    return Promise.resolve(payload);
  });

  return Promise.resolve();
}

async function listenForFirebaseNotification(userId) {
  //
  await database.ref(`notifications/${userId}`)
    .on("value", (snapshot) => {
      const allSnapshots = [];
      snapshot.forEach((childSnapshot) => {
        allSnapshots.push({ ...childSnapshot.val(), snapshotKey: childSnapshot.key });
      });
      allSnapshots.sort((a, b) => (a.date > b.date ? -1 : 1));
      store.dispatch(setNotifications(allSnapshots));
    });

  return Promise.resolve();
}

async function markNotificationAsSeen(userId, snapshotKey, payload) {
  //
  await database.ref(`notifications/${userId}/${snapshotKey}`)
    .set({
      ...payload,
      seen: true,
    });

  return Promise.resolve();
}

/* CALLED IN app-layout.jsx */
function setupFirebase() {
  let userId;
  const setupUser = () => (
    store.dispatch(usersActions.fetchAccountInfo())
      .then((userData) => {
        if (userData) {
          userId = userData.user._id;
          if (!userData.user.firebaseToken) {
            return initializeFirebase()
              .then(() => setupUser());
          }
          store.dispatch(setNotificationToken(userData.user.firebaseToken));
        }
      })
  );

  setupUser()
    .finally(() => {
      listenForFirebaseNotification(userId);
    });
}

export const firebaseActions = {
  initializeFirebase,
  listenForFirebaseNotification,
  markNotificationAsSeen,
  setupFirebase,
};

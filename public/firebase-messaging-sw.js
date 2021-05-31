/* eslint-disable no-restricted-globals */
/** @type {ServiceWorkerGlobalScope} */

importScripts("https://www.gstatic.com/firebasejs/8.2.3/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.3/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyC1k0_qfrWXft0nZBS0O96yqnHHX2S1nMA",
  authDomain: "zeedas-e4e53.firebaseapp.com",
  databaseURL: "https://zeedas-e4e53.firebaseio.com",
  projectId: "zeedas-e4e53",
  storageBucket: "zeedas-e4e53.appspot.com",
  messagingSenderId: "1029425544408",
  appId: "1:1029425544408:web:6db8ea5b035f23c523abad",
  measurementId: "G-W02JSPCRWP",
};

//
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[NOTIFICATION]: NOTIFICATION RECEIVED:", payload);

  const title = payload.data.title || payload.notification.title || "Notification";
  const options = {
    // body: payload,
    body: payload.data.body || payload.notification.title || "Activity performed",
    icon: "./apple-touch-icon.png",
  };

  return self.registration.showNotification(title, options);
});

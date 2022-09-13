import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC547EcqoKvSuqvYGJrAFZoQ_zxNdGE4lM',
  authDomain: 'ec-0831.firebaseapp.com',
  projectId: 'ec-0831',
  storageBucket: 'ec-0831.appspot.com',
  messagingSenderId: '192255450040',
  appId: '1:192255450040:web:40a5a1fc3698f5202d0d4d',
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const storage = app.storage();

export { db, storage, firebase };

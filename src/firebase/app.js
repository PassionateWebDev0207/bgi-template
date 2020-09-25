import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDV21sK_lHuQLsWK-wGdpjJj-1HLmg10hs",
  authDomain: "bg-link-v2.firebaseapp.com",
  databaseURL: "https://bg-link-v2.firebaseio.com",
  projectId: "bg-link-v2",
  storageBucket: "bg-link-v2.appspot.com",
  messagingSenderId: "385308412918",
  appId: "1:385308412918:web:742ab8ffdb98b596b755d7",
  measurementId: "G-FWLBDHRBYF"
}

export default firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig)

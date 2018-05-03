import firebase from 'firebase'
import firestore from 'firebase/firestore'

var config = {
  apiKey: "AIzaSyCy8FjhrYWRax0Zn0DYa3ad8w_L5TnjznY",
  authDomain: "vue-ninja-smoothies.firebaseapp.com",
  databaseURL: "https://vue-ninja-smoothies.firebaseio.com",
  projectId: "vue-ninja-smoothies",
  storageBucket: "vue-ninja-smoothies.appspot.com",
  messagingSenderId: "1043596181968"
};

const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

export default firebaseApp.firestore()

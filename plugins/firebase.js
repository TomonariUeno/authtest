import Vue from 'vue'
import firebase from 'firebase'
import 'firebase/auth';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAhINdHE-nScbjgpV1h_C42XAGA1RlSMNg",
    authDomain: "jnjlinebot.firebaseapp.com",
    databaseURL: "https://jnjlinebot.firebaseio.com",
    projectId: "jnjlinebot",
    storageBucket: "jnjlinebot.appspot.com",
    messagingSenderId: "789503826153",
    appId: "1:789503826153:web:a62456ddd3461de8f0b878",
    measurementId: "G-F0J7HTDRKN"
  };

firebase.initializeApp(firebaseConfig);

export default function(app,inject){
    inject('firebase',firebase)
}
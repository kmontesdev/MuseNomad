import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
 import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js"
import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js"




 const firebaseConfig = {
    apiKey: "AIzaSyAhUtDWalOCCci48zptlNimpU0d5HWYT-0",
    authDomain: "musenomad-cce48.firebaseapp.com",
    projectId: "musenomad-cce48",
    storageBucket: "musenomad-cce48.firebasestorage.app",
    messagingSenderId: "816855456981",
    appId: "1:816855456981:web:946e6f2b140ad1d33c565c",
    measurementId: "G-VTDLNGWKNJ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

const signUp=document.getElementById("submit");
signUp.addEventListener("click", (event) =>{
event.preventDefault();
// alert("clicked");
const email=document.getElementById("email").value;
const password=document.getElementById("password").value;  
const fullname=document.getElementById("fullname").value;

const auth=getAuth();
const db=getFirestore();

createUserWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
    const user = userCredential.user;
    const userData = {
        email: email,
        fullname: fullname,
    };
    const docRef = doc(db, "users", user.uid);
    setDoc(docRef, userData)
    .then(() => {
        window.location.href = "index.html";
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
})
.catch((error) => {
    console.error("Error creating user: ", error);
}); // <-- This closes the .then() chain

}); // <-- This closes the addEventListener function


import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyAhUtDWalOCCci48zptlNimpU0d5HWYT-0",
  authDomain: "musenomad-cce48.firebaseapp.com",
  projectId: "musenomad-cce48",
  storageBucket: "musenomad-cce48.firebasestorage.app",
  messagingSenderId: "816855456981",
  appId: "1:816855456981:web:946e6f2b140ad1d33c565c",
  measurementId: "G-VTDLNGWKNJ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const signIn = document.getElementById("submit");
signIn.addEventListener("click", async (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const auth = getAuth();

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Check if user is admin
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists() && userSnap.data().isAdmin) {
      window.location.href = "admin-dashboard.html";
    } else {
      window.location.href = "dashboard.html";
    }
  } catch (error) {
    console.error("Error signing in: ", error);
  }
});
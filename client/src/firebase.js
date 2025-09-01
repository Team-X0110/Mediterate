
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBD9Gx5_fyTaw-UPEWSCInT9jIx64pJLx4",
  authDomain: "mediterate-team-x.firebaseapp.com",
  projectId: "mediterate-team-x",
  storageBucket: "mediterate-team-x.firebasestorage.app",
  messagingSenderId: "276014166115",
  appId: "1:276014166115:web:c3f19e5d1d48e06d244856"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;


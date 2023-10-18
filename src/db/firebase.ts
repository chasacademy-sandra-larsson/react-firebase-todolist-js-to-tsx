import { initializeApp } from 'firebase/app';

import {
  getFirestore
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBRzSbBK2g69-ob3PqJuD06SpzmYh0Sajk",
  authDomain: "test-todolist-1f5c2.firebaseapp.com",
  projectId: "test-todolist-1f5c2",
  storageBucket: "test-todolist-1f5c2.appspot.com",
  messagingSenderId: "817831755276",
  appId: "1:817831755276:web:407f146db9d0802259b829"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db


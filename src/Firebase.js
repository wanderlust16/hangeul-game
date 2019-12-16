import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAkHP6r0bk9wGTFBtvvI-3ejTK90C8FjNk",
    authDomain: "hangeul-game.firebaseapp.com",
    databaseURL: "https://hangeul-game.firebaseio.com",
    projectId: "hangeul-game",
    storageBucket: "hangeul-game.appspot.com",
    messagingSenderId: "93768313134",
    appId: "1:93768313134:web:1bda22e43fd32f1c02f2bf"
  };

firebase.initializeApp(firebaseConfig);
const firestore = new firebase.firestore();

export { firestore }
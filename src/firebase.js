
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC9gB6oO3m5gtaw0tDdPMFqXyklM5tR4nk",
    authDomain: "mindfire-auth.firebaseapp.com",
    projectId: "mindfire-auth",
    storageBucket: "mindfire-auth.appspot.com",
    messagingSenderId: "51558801694",
    appId: "1:51558801694:web:3b58c7602391dd4829a90f"
  };

  firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

const twitterProvider = new firebase.auth.TwitterAuthProvider();

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const signInWithTwitter = () => {
    auth.signInWithPopup(twitterProvider).catch(err => {
        console.log(29,err)
    });
  };


export const generateUserDocument = async (user, additionalData) => {
    if (!user) return;
  
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
  
    if (!snapshot.exists) {
      const { email, displayName, photoURL } = user;
      try {
        await userRef.set({
          displayName,
          email,
          photoURL,
          ...additionalData
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
    }
    return getUserDocument(user.uid);
  };

  const getUserDocument = async uid => {
    if (!uid) return null;
    try {
      const userDocument = await firestore.doc(`users/${uid}`).get();
  
      return {
        uid,
        ...userDocument.data()
      };
    } catch (error) {
      console.error("Error fetching user", error);
    }
  };
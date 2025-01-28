/* eslint-disable no-unused-vars */
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  getIdToken,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import firebaseInitialize from "../firebase/firebase.initialize"

firebaseInitialize()
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      saveUser(user)
      setLoading(false);
      if(user){
        getIdToken(user)
        .then(idToken=>localStorage.setItem("idToken",idToken))
      }
    });
    return unsubscribe;
  }, []);

  // google SignIn
  async function googleSignIn(){
    const auth=getAuth()
    const provider = new GoogleAuthProvider();
    try{
      const result =await signInWithPopup(auth, provider)
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      const user= result.user 
      console.log(user);
    }catch{
      console.log("failed to google");
    }
  }

  // signup function
  // signup function
  async function signup(email, password, username) {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);

    // update profile
    await updateProfile(auth.currentUser, {
      displayName: username,
    });

    const user = auth.currentUser;
    setCurrentUser({
      ...user,
    });
  }

  // login function
  function login(email, password) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  }

  const saveUser=(user)=>{
    fetch(`${import.meta.env.VITE_ROOT_API}/addUser`,{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({email:user?.email, name:user?.displayName, uid:user?.uid})
    })
  }

  // logout function
  function logout() {
    const auth = getAuth();
    return signOut(auth);
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
    googleSignIn
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
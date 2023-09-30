import React, { createContext, useEffect, useState } from 'react';
 import { app } from '../firebase.config';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, } from 'firebase/auth'
export const Context = createContext()


const AuthContext = ({ children }) => {

    const auth = getAuth(app)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const signup = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)

    }

    const profile = (user, name, photo, number) => {
        return updateProfile(user, { displayName: name, photoURL: photo })
    }

    const signin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signout = () => {
        return signOut(auth)
    }

    const googleProvider = new GoogleAuthProvider();
    const signinGoogle = () => {
        //setLoading(false)
        return signInWithPopup(auth, googleProvider)

    }

    useEffect(() => {
        const subscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoading(false)
        })

        return () => {
            subscribe()
        }
    }, [auth])




    const authentications = { signup, profile, user, loading, signout, signin, signinGoogle }


    return (
        <Context.Provider value={authentications}>
            {children}
        </Context.Provider>
    )






};

export default AuthContext;
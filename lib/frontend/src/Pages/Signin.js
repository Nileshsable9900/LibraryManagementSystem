import React, { useState } from 'react';
import './Signin.css';
import firebase from 'firebase/compat/app'; // Modify import here
import 'firebase/compat/auth'; // Modify import here

function Signin() {
    const [error, setError] = useState('');

    // Initialize Firebase with your Firebase configuration
    if (!firebase.apps.length) {
        firebase.initializeApp({
            apiKey: "AIzaSyDIfW0CR-9Ymsr3e_ZUQi-OxduXRi4OgXU",
            authDomain: "library-77305.firebaseapp.com",
            projectId: "library-77305",
            storageBucket: "library-77305.appspot.com",
            messagingSenderId: "441793160096",
            appId: "1:441793160096:web:b96a2072fea6c45955fac5"
        });
    }

    const handleFirebaseSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                // You can access the user's information here via result.user
                // You can also perform additional actions like storing user data in your database
            })
            .catch((error) => {
                setError('Firebase sign-in failed. Please try again.');
            });
    };

    return (
        <div className='signin-container'>
            <div className="signin-card">
                <h2 className="signin-title">Log in</h2>
                <p className="line"></p>
                <div className="error-message"><p>{error}</p></div>
                <button className="signin-button" onClick={handleFirebaseSignIn}>Sign In with Google</button>
                <a className="forget-pass" href="#home">Forgot password?</a>
            </div>
        </div>
    );
}

export default Signin;

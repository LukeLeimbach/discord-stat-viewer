import React, { useEffect, useState } from 'react';
import { auth, db } from './firebase-config';
import { signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import './App.css';
import Divider from './components/Divider';
import RotatingText from './components/RotatingText';
import { SignInButton } from './components/CustomButton';
import Header from './components/Header';
import CardList from './components/CardList';


function App() {
  const [user, setUser] = useState(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        console.log('User is logged in:', currentUser);
        // Optionally fetch more user data here
      }
    });

    // Clean up subscription
    return () => unsubscribe();
  }, []);

  // Handle custom token sign-in
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      signInWithCustomToken(auth, token).catch((error) => {
        console.error('Error signing in with custom token:', error);
      });
    }
  }, []);

  return (
    <div>
      <Header />
      <section className='section'>
        <RotatingText />
        {user ? (
          <h2>Welcome {user.displayName || user.email}</h2>
        ) : (
          <SignInButton />
        )}
      </section>

      {user && (
        <>
          <Divider />
          <CardList friends={friends} />
        </>
      )}
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { auth } from './firebase-config';
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
      <Header user={user} />
      <section className='section'>
        <RotatingText />
        {user ? (
          <h2>Welcome <span>{user.displayName || user.email}</span></h2>
        ) : (
          <SignInButton />
        )}
      </section>

      {user && (
        <>
          <Divider />
          <CardList friends={user} />
        </>
      )}
    </div>
  );
}

export default App;

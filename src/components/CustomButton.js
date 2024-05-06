import React from 'react';
import { useState } from 'react';

export const SignInButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    const loginUrl = 'https://us-central1-htmx-app.cloudfunctions.net/login';
    window.location.href = loginUrl;
  };

  return (
    <button
      className={'custom-button btn-padding'}
      onClick={handleLogin}
    >
      {isLoading ? 'Logging in...' : 'Login with Discord'}
    </button>
  );
};

export const SignOutButton = ({ isLoading, handleLogout }) => {
  return (
    <button
      className={'custom-button sign-out'}
      onClick={handleLogout}
    >
      {isLoading ? 'Signing Out...' : 'Sign Out'}
    </button>
  );
};
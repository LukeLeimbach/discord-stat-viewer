import React from 'react';
import { useState } from 'react';

export const SignInButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    const loginUrl = 'https://us-central1-htmx-app.cloudfunctions.net/login';
    window.location.href = loginUrl;
  };

  return (
    <button
      className={'custom-button'}
      onClick={handleClick}
    >
      {isLoading ? 'Logging in...' : 'Login with Discord'}
    </button>
  );
};

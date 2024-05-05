import React from 'react';

export const SignInButton = () => {
  const handleClick = () => {
    const loginUrl = 'https://us-central1-htmx-app.cloudfunctions.net/login';
    window.location.href = loginUrl;
  };

  return (
    <button
      className={'custom-button'}
      onClick={handleClick}
    >
      Login with Discord
    </button>
  );
};

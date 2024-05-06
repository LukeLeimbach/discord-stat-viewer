import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { personCircle, personCircleOutline } from 'ionicons/icons';
import { auth } from '../firebase-config';
import { SignOutButton } from './CustomButton';

const Header = ({ user }) => {
  const [mouseOver, setMouseOver] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log('User IN hEADER:', user);

  const handleMouseEnter = () => setMouseOver(true);
  const handleMouseLeave = () => setMouseOver(false);

  var prevScrollPos = window.scrollX;
  window.onscroll = function() {
    var currentScrollPos = window.scrollY;
    if (prevScrollPos > currentScrollPos) {
      document.getElementById("header").style.top = "0";
    } else {
      document.getElementById("header").style.top = "-96px";
    }
    prevScrollPos = currentScrollPos;
  }

  const handleClick = () => {
    if (auth.currentUser !== null) setShowDropdown(!showDropdown);
    console.log(JSON.stringify(auth.currentUser));
  };

  const handleLogout = async () => {
    setIsLoading(true);
    await auth.signOut();
    setIsLoading(false);
    console.log('User logged out');
    setShowDropdown(false);
  };

  return (
    <div className="header" id='header'>
      <h1>NOT HTMX Project (really no HTMX here)</h1>
      {showDropdown 
      ? (
        <SignOutButton isLoading={isLoading} handleLogout={handleLogout} />
      ) : user
      ? (
        <img
          className='icon'
          src={user.photoURL}
          alt='User profile'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        />
      ) : (
        <IonIcon
          className='icon' 
          icon={mouseOver ? personCircleOutline : personCircle} 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick} 
        />
      )}
    </div>
  );
};

export default Header;
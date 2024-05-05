import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { personCircle, personCircleOutline } from 'ionicons/icons';
import { auth } from '../firebase-config';

const Header = () => {
  const [mouseOver, setMouseOver] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseEnter = () => setMouseOver(true);
  const handleMouseLeave = () => setMouseOver(false);

  var prevScrollpos = window.scrollX;
  window.onscroll = function() {
    var currentScrollPos = window.scrollY;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById("header").style.top = "0";
    } else {
      document.getElementById("header").style.top = "-96px";
    }
    prevScrollpos = currentScrollPos;
  }

  const handleClick = () => {
    if (auth.currentUser !== null) setShowDropdown(!showDropdown);
    console.log(JSON.stringify(auth.currentUser));
  };

  const handleLogout = () => {
    auth.signOut();
    console.log('User logged out');
    setShowDropdown(false);
  };

  return (
    <div className="header" id='header'>
      <h1>HTMX Project</h1>
      {showDropdown 
      ? (
        <div className="dropdown">
          <button className='custom-button' onClick={handleLogout}>Logout</button>
        </div>
      )
      :
      (
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
import React from 'react';

const RotatingText = () => {
  return (
    <h1 className='rotating-text'>
      All your <span className='discord-text'>Discord</span> stats, 
      <div className="inner-headings">
        <span>
          Friends, <br />
          Servers, <br />
          Chats, <br />
          Voice, <br />
        </span>
      </div>
      <br />
      All right here.
    </h1>
  );
};

export default RotatingText;
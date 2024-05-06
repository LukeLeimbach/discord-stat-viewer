import React from 'react';

const Card = ({id, date, header, avatar}) => {
  return (
    <article className="card">
      <header className="card-header">
        <p>Friend made on <span>{date}</span></p>
        <h2>{header}</h2>
        <img id={id} src={avatar} alt="Friend's Avatar"></img>
      </header>
    </article>
  );
};

const CardList = ({ friends }) => {
  const handleCardClick = (event) => {
    console.log('User clicked on card with id:', event.target.id);
  };
  
  return (
    <>
      <section className="bg-gradient">
        <h1 className='subheading'>Your friends (I don't access your friends)</h1>
        <section className="card-list">
          {/* {friends.map((friend) => {
            let index = 0;
            return (
            <Card
              id={index++}
              header={friend.displayName}
              date="2021-09-20"
              avatar={friend.photoUrl}
            />
          )})} */}
          <Card
            id="0"
            header={friends.displayName}
            date="2021-09-20"
            avatar={friends.photoURL}
            onClick={handleCardClick}
          />
          <Card
            id="0"
            header={friends.displayName}
            date="2021-09-20"
            avatar={friends.photoURL}
          />
          <Card
            id="0"
            header={friends.displayName}
            date="2021-09-20"
            avatar={friends.photoURL}
          />
        </section>
      </section>
    </>
  );
};

export default CardList;
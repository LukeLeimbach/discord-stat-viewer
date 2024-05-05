import React from 'react';

const Card = ({id, date, header, avatar}) => {
  return (
    <article class="card">
      <header class="card-header">
        <p>Friend made on <span>{date}</span></p>
        <h1>{header}</h1>
        <img id={id} src={avatar} alt="Friend's Avatar"></img>
      </header>
    </article>
  );
};

const CardList = ({friends}) => {
  const handleCardClick = (event) => {
    console.log('User clicked on card with id:', event.target.id);
  };
  
  return (
    <section className="bg-gradient card-list" onClick={handleCardClick}>
      {friends.map((friend) => {
        let index = 0;
        (
        <Card
          id={index++}
          header={friend.displayName}
          date={friend.friendDate}
          avatar={friend.avatar}
        />
      )})}
    </section>
  );
};

export default CardList;
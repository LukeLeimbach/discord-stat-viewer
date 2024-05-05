import './App.css';
import Divider from './components/Divider';
import RotatingText from './components/RotatingText';
import { SignInButton } from './components/CustomButton';
import { auth, db } from './firebase-config';
import Header from './components/Header';
import CardList from './components/CardList';
import { useEffect, useState } from 'react'; 

const friends = [
  {
    displayName: 'John Doe',
    friendDate: '2021-08-01',
    avatar: 'https://ozgrozer.github.io/100k-faces/0/6/006083.jpg'
  },
  {
    displayName: 'Jane Doe',
    friendDate: '2021-08-02',
    avatar: 'https://ozgrozer.github.io/100k-faces/0/6/006083.jpg'
  },
  {
    displayName: 'John Smith',
    friendDate: '2021-08-03',
    avatar: 'https://ozgrozer.github.io/100k-faces/0/6/006083.jpg'
  },
  {
    displayName: 'Jane Smith',
    friendDate: '2021-08-04',
    avatar: 'https://ozgrozer.github.io/100k-faces/0/6/006083.jpg'
  }
];

function App() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (auth.currentUser) {
      db.collection('users')
        .doc(auth.currentUser.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setUsername(doc.data().username);
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        });
    }
  }, []);

  return (
    <div>
      <Header />
      <section className='section'>
        <RotatingText />
        {auth.currentUser === null ? (
          <SignInButton />
        ) : (
          <div>Welcome {username}</div>
        )}
      </section>

      {auth.currentUser !== null && (
        <>
          <Divider />
          <CardList friends={friends} />
        </>
      )}
    </div>
  );
}

export default App;

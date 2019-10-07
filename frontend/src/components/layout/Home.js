import React, { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);
  const { user, orders } = authContext;
  if (!user.email) {
    return (
      <div className='home'>
        <h3 className='heading-3'>Sign in to use tha app</h3>
        <button>Sign in</button>
      </div>
    );
  } else {
    return (
      <div className='home'>
        <h3 className='heading-3'>Hæ {user.name}</h3>
        <p className='center'>
          Það bíða þín <span className='green'>{orders.length}</span> sendingar
          til að fara yfir
        </p>
      </div>
    );
  }
};

export default Home;

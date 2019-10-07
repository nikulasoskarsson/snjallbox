import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import AuthContext from '../../context/auth/authContext';

const Navbar = () => {
  const [styles, setStyles] = useState({
    showNav: {
      height: '60px'
    },
    bar1: {},
    bar2: {},
    bar3: {},
    toggleList: {
      opacity: '0'
    }
  });
  useEffect(() => {
    auth.onAuthStateChanged(() => {
      getUser();
    });
  }, []);
  const toggleNav = () => {
    if (styles.showNav.height === '60px') {
      setStyles({
        ...styles,
        showNav: { height: '100vh' },
        bar1: {
          transform: 'rotate(-45deg) translate(-9px, 6px)',
          transform: 'rotate(-45deg) translate(-9px, 6px)'
        },
        bar2: {
          opacity: '0'
        },
        bar3: {
          transform: 'rotate(45deg) translate(-8px, -8px)',
          transform: 'rotate(45deg) translate(-8px, -8px)'
        },
        toggleList: {
          opacity: '1',
          display: 'block'
        }
      });
    } else {
      setStyles({
        ...styles,
        showNav: { height: '60px' },
        bar1: {},
        bar2: {},
        bar3: {},
        toggleList: { opacity: '0', display: 'none' }
      });
    }
  };

  const authContext = useContext(AuthContext);
  const { user, getUser } = authContext;
  const auth = firebase.auth();

  const signOut = () => {
    auth.signOut().then(() => {
      getUser();
      console.log(user);
    });
  };

  return (
    <Fragment>
      <div className='hamburger-icon' onClick={toggleNav}>
        <div className='bar1' style={styles.bar1}></div>
        <div className='bar2' style={styles.bar2}></div>
        <div className='bar3' style={styles.bar3}></div>
      </div>
      <Link to='/'>
        <div className='logo'>
          T<span className='higher'>h</span>e b<span className='lower'>o</span>x
        </div>
      </Link>
      <nav
        className='navbar'
        style={styles.showNav}
        onClick={() => {
          if (styles.showNav.height !== '60px') {
            toggleNav();
          }
        }}
      >
        <div className='navbar__content'>
          <ul className='navbar__list' style={styles.toggleList}>
            <li className='navbar__list-item'>
              <Link to='/' className='navbar__link'>
                Forsíða
              </Link>
            </li>
            {user.email ? (
              <li className='navbar__list-item'>
                <Link to='/orders' className='navbar__link'>
                  Sendingar
                </Link>
              </li>
            ) : (
              <Fragment></Fragment>
            )}

            {user.status === 'admin' ? (
              <Fragment>
                <li className='navbar__list-item'>
                  <Link to='/create-user' className='navbar__link'>
                    Nýr notandi
                  </Link>
                </li>
              </Fragment>
            ) : (
              <Fragment></Fragment>
            )}
            {!user.email ? (
              <li className='navbar__list-item'>
                <Link to='/sign-in' className='navbar__link'>
                  Innskráning
                </Link>
              </li>
            ) : (
              <Fragment />
            )}
            {user.email ? (
              <li className='navbar__list-item'>
                <Link to='/sign-in' onClick={signOut} className='navbar__link'>
                  Útskráning
                </Link>
              </li>
            ) : (
              <Fragment></Fragment>
            )}
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;

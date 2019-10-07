import React, { useReducer, useEffect } from 'react';
import AuthReducer from './authReducer';
import AuthContext from './authContext';

import firebase from 'firebase';

import { GET_USER, GET_ORDERS, GET_ORDER } from '../types';

const AuthState = props => {
  const initialState = {
    user: {},
    orders: [],
    order: {}
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const db = firebase.firestore();
  const auth = firebase.auth();

  const getUser = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        db.collection('users')
          .where('email', '==', user.email)
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              dispatch({
                type: GET_USER,
                payload: doc.data()
              });
            });
          });
      } else {
        dispatch({
          type: GET_USER,
          payload: {}
        });
      }
    });
  };
  const createUser = (currentUser, newUser) => {
    fetch('http://localhost:3001/new-user', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        currentUser: currentUser,
        newUser: newUser
      })
    });
  };

  let orderArray = [];
  const getOrders = () => {
    console.log('get orders is running');
    auth.onAuthStateChanged(user => {
      if (user) {
        orderArray = [];
        db.collection('orders')
          .where('sender.email', '==', user.email)
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              const data = doc.data();
              orderArray.push(data);
            });
            dispatch({
              type: GET_ORDERS,
              payload: orderArray
            });
          });
      } else {
        console.log('no email');
      }
    });
  };

  const getOrder = id => {
    db.collection('orders')
      .where('order', '==', id)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const data = doc.data();
          dispatch({
            type: GET_ORDER,
            payload: data
          });
        });
      });
  };

  useEffect(() => {
    getUser();
    getOrders();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        createUser: createUser,
        getUser: getUser,
        orders: state.orders,
        getOrders: getOrders,
        getOrder: getOrder,
        order: state.order
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;

import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import firebase from 'firebase';
import * as serviceWorker from './serviceWorker';

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyCC1ko7iTY_qYFoVgBL_SChrXpOFdiepwE',
  authDomain: 'snjallbox.firebaseapp.com',
  databaseURL: 'https://snjallbox.firebaseio.com',
  projectId: 'snjallbox',
  storageBucket: '',
  messagingSenderId: '150899630330',
  appId: '1:150899630330:web:50332757c266b2df1a6943'
};
firebase.initializeApp(firebaseConfig);

// Initialize Firebase

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();

import React, { useState } from 'react';
import firebase from 'firebase';

const SignIn = () => {
  const db = firebase.firestore();

  const signInWithGoogle = () => {
    let userExists = false;
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        const user = result.user;
        db.collection('users')
          .where('email', '==', user.email)
          .get()
          .then(snapshot => {
            snapshot.forEach(() => (userExists = true));
          })
          .then(() => {
            if (userExists === false) {
              db.collection('users').add({
                email: user.email,
                password: false,
                name: user.displayName,
                status: 'regluar-user'
              });
            }
          });
      })
      .catch(error => {
        console.log(error.message);
      });
  };
  const auth = firebase.auth();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const handleKeyDown = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    console.log(form.email, form.password);
    auth.signInWithEmailAndPassword(form.email, form.password).then(res => {
      console.log(res);
    });
  };
  return (
    <div>
      <div className='form-container'>
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <h3 className='heading-3'>Innskráning</h3>
          <div className='input-field sign-in'>
            <label htmlFor='email'>Netfang</label>
            <input type='email' name='email' onChange={handleKeyDown} />
          </div>

          <div className='input-field'>
            <label htmlFor='password'>Lykilorðs</label>
            <input type='password' name='password' onChange={handleKeyDown} />
          </div>

          <div className='button-container'>
            <button>Sign in</button>
            <button className='google-button' onClick={signInWithGoogle}>
              <img
                className='google-logo'
                src='/assets/img/google-logo.png'
                alt='Google logo'
              />
              nota Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

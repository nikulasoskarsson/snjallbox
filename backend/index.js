const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const firebase = require('firebase');
const secret = require('./secret.js');
const app = express();
app.use(cors());
app.use(bodyParser.json());

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyCC1ko7iTY_qYFoVgBL_SChrXpOFdiepwE',
    authDomain: 'snjallbox.firebaseapp.com',
    databaseURL: 'https://snjallbox.firebaseio.com',
    projectId: 'snjallbox',
    storageBucket: '',
    messagingSenderId: '150899630330',
    appId: '1:150899630330:web:50332757c266b2df1a6943'
  });
}

const db = firebase.firestore();
const auth = firebase.auth();

app.post('/new-user', (req, res) => {
  const { currentUser, newUser } = req.body;
  if (currentUser.status === 'admin') {
    console.log({
      identificationNumber: newUser.kennitala,
      name: newUser.name,
      street: newUser.street,
      email: newUser.email,
      phone: newUser.phone,
      contactName: newUser.name,
      contactEmail: newUser.email,
      contactPhone: newUser.phone
    });
    fetch('https://ssb-dev-fep-01.azurewebsites.net/api/Sender', {
      body: JSON.stringify({
        identificationNumber: newUser.kennitala,
        name: newUser.name,
        street: newUser.street,
        email: newUser.email,
        phone: newUser.phone,
        contactName: newUser.name,
        contactEmail: newUser.email,
        contactPhone: newUser.phone
      }),
      headers: {
        Accept: 'application/json',
        Authorization: 'Basic dmVmc2tvbGk6Q1l3YzZsNEkyZg==',
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
      .then(res => {
        console.log(res);
        auth
          .createUserWithEmailAndPassword(newUser.email, newUser.password)
          .then(() => {
            db.collection('users').add({
              email: newUser.email,
              password: newUser.password,
              name: newUser.name,
              status: 'employee',
              kennitala: newUser.kennitala,
              company: newUser.company
            });
          });
      })
      .catch(err => console.log(err));
  } else {
    alert('You are not an admin');
    console.log(newUser);
  }
});

app.post('/new-order', (req, res) => {
  let location = '';
  if (req.body.form.type === 'shelf') {
    location = 'hilla';
  } else {
    location = 'box';
  }

  if (req.body.user.email) {
    if (req.body.currentOrder === undefined) {
      console.log(req.body.currentOrder);
      fetch('https://ssb-dev-fep-01.azurewebsites.net/api/Delivery', {
        body: JSON.stringify({
          senderOrderID: '2357433',
          description: req.body.form.description,
          senderId: 18,
          numberOfPackages: req.body.form.amount,
          pickupAtDeliveryBranch: true,
          box: false,
          location: location,
          recipient: {
            email: req.body.form.name,
            phone: req.body.form.phone,
            name: req.body.form.email
          }
        }),
        headers: {
          Accept: 'application/json',
          Authorization: 'Basic dmVmc2tvbGk6Q1l3YzZsNEkyZg==',
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })
        .then(res => res.json())
        .then(json => {
          db.collection('orders')
            .doc(json)
            .set({
              name: req.body.form.name,
              email: req.body.form.email,
              phone: req.body.form.phone,
              amont: req.body.form.amount,
              order: json,
              description: req.body.form.description,
              status: 'Eftir að sækja',
              date: new Date(),
              type: req.body.form.type,
              size: req.body.form.size,
              sender: req.body.user
            })
            .then(() => res.send('Búið'));
        });
    } else {
      db.collection('orders')
        .doc(req.body.currentOrder.order)
        .set({
          name: req.body.form.name,
          email: req.body.form.email,
          phone: req.body.form.phone,
          amont: req.body.form.amount,
          order: req.body.currentOrder.order,
          description: req.body.form.description,
          status: 'Eftir að sækja',
          date: new Date(),
          type: req.body.form.type,
          size: req.body.form.size,
          sender: req.body.user
        })
        .then(() => res.send('Búið'));
    }
  }
});
app.post('/delete-order', (req, res) => {
  db.collection('orders')
    .doc(req.body.order)
    .delete()
    .then(() => res.send('Búið'));
});

app.listen(3001, () => console.log('listening on port 3001'));

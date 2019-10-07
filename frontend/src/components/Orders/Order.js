import React, { useState, Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import Barcode from 'react-barcode';
import AuthContext from '../../context/auth/authContext';

const Order = ({ order }) => {
  const authContext = useContext(AuthContext);
  const orderSeconds = order.date.seconds + 259200;
  const currentSeconds = new Date().getTime() / 1000;
  const secondsLeft = orderSeconds - currentSeconds;
  const [timer, setTimer] = useState(secondsLeft);
  setTimeout(() => {
    if (timer > 0) {
      setTimer(timer - 1);
    }
  }, 1000);

  String.prototype.toHHMMSS = function() {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - hours * 3600) / 60);
    var seconds = sec_num - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return hours + ':' + minutes + ':' + seconds;
  };

  const handleDelete = () => {
    fetch('http://localhost:3001/delete-order', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        order: order.order
      })
    }).then(() => authContext.getOrders());
  };
  return (
    <div className='order'>
      <h3 className='heading-3 order__heading'>{order.name}</h3>
      {order.type === 'smartbox' ? (
        <div className='order__barcode'>
          <Barcode value={order.order} />
        </div>
      ) : (
        <Fragment>
          <img className='shelf' src='/assets/img/shelf.svg' alt='' />
        </Fragment>
      )}

      <div className='order__reciver'>
        <p className='order__status'>
          Staða: <span>{order.status}</span>
        </p>
        <p className='order__email'>
          Netfang: <span>{order.email}</span>
        </p>
        <p className='order__phone'>
          Símanúmner: <span> {order.phone}</span>
        </p>
        <p className='order__timer'>
          Tími eftir:
          <span
            className={timer > 86400 ? 'green' : timer === 0 ? 'red' : 'orange'}
          >
            {timer.toString().toHHMMSS()}
          </span>
        </p>
        <p className='order__insmartbox'>
          Snjallboxi: <span>Já</span>
        </p>
      </div>
      <img className='order__img' src='/assets/img/preview.svg' alt='3d Cube' />
      <div className='button-container'>
        <button className='update'>
          <Link
            to={'/update-order/' + order.order}
            params={{ order: order.order }}
          >
            Uppdate
          </Link>
        </button>

        <button onClick={handleDelete} className='delete'>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Order;

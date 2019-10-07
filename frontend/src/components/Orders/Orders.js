import React, { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import Order from './Order';

const Orders = () => {
  const authContext = useContext(AuthContext);

  return (
    <div className='order-container'>
      {authContext.orders.map(order => (
        <Order key={order.order} order={order} />
      ))}
    </div>
  );
};

export default Orders;

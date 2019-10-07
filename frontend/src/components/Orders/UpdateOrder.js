import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import NewOrder from './NewOrder';

const UpdateOrder = ({ match }) => {
  const authContext = useContext(AuthContext);
  const { order } = authContext;

  useEffect(() => {
    authContext.getOrder(match.params.id);
  }, []);
  console.log(order);
  return (
    <div className='update-order'>
      <NewOrder order={order} />
    </div>
  );
};

export default UpdateOrder;

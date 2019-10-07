import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PlusIcon = () => {
  const authContext = useContext(AuthContext);
  const useTag = `<use xlink:href='#plus'><path
  id='plus'
  d='M256,50C142.229,50,50,142.229,50,256s92.229,206,206,206s206-92.229,206-206S369.771,50,256,50zM382.601,293.432h-89.17V382.6h-68.861v-89.168h-89.17v-68.862h89.17V135.4h68.861v89.169h89.17V293.432z'
/></use>`;
  if (authContext.user.email) {
    return (
      <div className='icon'>
        <Link to='/new-order'>
          <svg
            viewBox='0 0 512 512'
            dangerouslySetInnerHTML={{ __html: useTag }}
          ></svg>
        </Link>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default PlusIcon;

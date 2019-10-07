import React, { Fragment } from 'react';

const Darkmode = ({ showDarkMode }) => {
  return (
    <Fragment>
      <label className='check-label'>
        <input type='checkbox' id='input' onChange={showDarkMode} />
        <span className='check'></span>
      </label>
    </Fragment>
  );
};

export default Darkmode;

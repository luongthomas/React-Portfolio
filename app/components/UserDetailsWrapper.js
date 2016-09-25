import React, { PropTypes } from 'react';

function UserDetailsWrapper({ children }) {
  return (
    <div className='col-sm-6'>
      <p className='lead'>{props.header}</p>
      {children}
    </div>
  );
};

UserDetailsWrapper.propType = {
  header: PropTypes.string.isRequired,
};

export default UserDetailsWrapper;

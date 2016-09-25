// even though code doesn't use React, JSX uses React even with stateless functions
import React from 'react';
import { transparentBg } from '../styles';

function MainContainer({ children }) {
  return (
    <div className='jumbotron col-sm-12 text-center' style={transparentBg}>
      {children}
    </div>
  );
}

export default MainContainer;

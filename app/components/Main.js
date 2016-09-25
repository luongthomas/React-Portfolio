import React from 'react';
import ReactCSSTtransitionGroup from 'react-addons-css-transition-group';

// we can do this syntax because of webpack loaders
import '../main.css';

// Key from react router. CloneElement lets us attach a key to the "would-be component"
//  , aka new props
// React keeps track of keys (order) or a list of items and their orders
// ReactCSSTtransitionGroup needs its children to have keys
const Main = React.createClass({
  render() {
    return (
      <div className='main-container'>
        <ReactCSSTtransitionGroup
          transitionName="appear"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
            { React.cloneElement(this.props.children, { key: this.props.location.pathname })}
        </ReactCSSTtransitionGroup>
      </div>
    );
  },
});

export default Main;

var React = require('react');
var ReactCSSTtransitionGroup = require('react-addons-css-transition-group');

// we can do this through webpack loaders
require('../main.css');

// Key from react router. CloneElement lets us attach a key to the "would-be component"
//  , aka new props
// React keeps track of keys (order) or a list of items and their orders
// ReactCSSTtransitionGroup needs its children to have keys
var Main = React.createClass({
  render: function () {
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

module.exports = Main;

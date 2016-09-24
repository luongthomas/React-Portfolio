var React = require('react');
var PropTypes = React.PropTypes;
import container from '../styles';

var Navbar = React.createClass({

  render: function () {
    return (
      <div style={container}>
        <div className="">
          Clever Title
        </div>
        <div>
          <input type='text' placeholder='Portland, Oregon'></input>
          <button type='button' className='btn btn-sm btn-success'>Search</button>
        </div>
      </div>
    );
  },

});

module.exports = Navbar;

var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var PageThree = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Welcome to Page Three</h1>
        <p>Please navigate around.</p>
        <Link to='/'>
          <button type='button' className='btn btn-lg btn-info'>
            Go back to Home
          </button>
        </Link>
      </div>
    );
  },
});

module.exports = PageThree;

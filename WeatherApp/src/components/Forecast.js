var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Forecast = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Welcome to the Forecast Page</h1>
        <p>Please navigate around.</p>
        <Link to='/pagetwo'>
          <button type='button' className='btn btn-lg btn-danger'>
            Go to Page Two
          </button>
        </Link>
      </div>
    );
  },
});

module.exports = Forecast;

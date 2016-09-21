var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var PageTwo = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Welcome to Page Two</h1>
        <p>Please navigate around.</p>
        <Link to='/PageThree'>
          <button type='button' className='btn btn-lg btn-info'>
            Go to Page Three
          </button>
        </Link>
      </div>
    );
  },
});

module.exports = PageTwo;

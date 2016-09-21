var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var styles = require('../styles');
var weatherHelper = require('../utils/weatherHelper');

var Home = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Enter a City and State</h1>
        <Link to='/forecast/:city'>
          <input type='text' placeholder='Portland, Oregon' style={styles.space}></input><br />
          <button type='button' className='btn btn-md btn-success' style={styles.space} onClick={weatherHelper}>
            Get Weather
          </button>
        </Link>
      </div>
    );
  },
});

module.exports = Home;

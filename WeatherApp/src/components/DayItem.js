var React = require('react');
var PropTypes = React.PropTypes;
var utils = require('../utils/utils');
var getDate = utils.getDate;

var styles = {
  dayContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: 35,
  },

  subheader: {
    fontSize: 30,
    color: '#333',
    fontWeight: 100,
  },

  weather: {
    height: 130,
  },

};

function DayItem(props) {
  var date = getDate(props.day.dt);
  var icon = props.day.weather[0].icon;
  var picture = require('../images/weather-icons/' + icon + '.svg');
  return (
    <div style={styles.dayContainer} onClick={props.handleClick}>
      <img
        style={styles.weather}
        src={picture}
        alt='Weather' />
      <h2 style={styles.subheader}>{date}</h2>
    </div>
  );
}

DayItem.propTypes = {
  day: PropTypes.shape({
    dt: PropTypes.number.isRequired,
    weather: PropTypes.array.isRequired,
  }).isRequired,
  handleClick: PropTypes.func,
};

module.exports = DayItem;

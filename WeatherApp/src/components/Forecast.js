var React = require('react');
var PropTypes = React.PropTypes;
var utils = require('../utils/utils');
var getDate = utils.getDate;
var DayItem = require('./DayItem');

var styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: '1200',
    margin: '50px auto',
  },

  subheader: {
    fontSize: '30px',
    color: '#333',
    fontWeight: 100,
  },

  header: {
    fontSize: '65px',
    color: '#333',
    fontWeight: '100',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
};

function Forecast(props) {
  return (
    <div>
      {
        props.isLoading === true
        ? <h1 style={styles.header}> Loading </h1>
        : <ForecastUI
            city={props.city}
            handleClick={props.handleClick}
            forecast={props.forecastData} />
      }
    </div>
  );
}

function ForecastUI(props) {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={styles.header}>{props.city}</h1>
      <p style={styles.subheader}>Select a day</p>
      <div style={styles.container}>
        { props.forecast.list.map(function (listItem) {
            return (
              <DayItem
                key={listItem.dt}
                day={listItem}
                handleClick={props.handleClick.bind(null, listItem)} />
            );
          })
        }
      </div>
    </div>
  );
}

Forecast.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  city: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  forecastData: PropTypes.object.isRequired,
};

module.exports = Forecast;

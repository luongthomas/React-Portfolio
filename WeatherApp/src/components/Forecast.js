import React, { PropTypes } from 'react';
import DayItem from './DayItem';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: '1200px',
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

function Forecast({ isLoading, city, handleClick, forecastData }) {
  return (
    <div>
      {
        isLoading === true
        ? <h1 style={styles.header}> Loading </h1>
        : <ForecastUI
            city={city}
            handleClick={(forecastData) => handleClick(forecastData)}
            forecast={forecastData} />
      }
    </div>
  );
}

function ForecastUI({ city, forecast, handleClick }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={styles.header}>{city}</h1>
      <p style={styles.subheader}>Select a day</p>
      <div style={styles.container}>
        { forecast.list.map((listItem) => (
              <DayItem
                key={listItem.dt}
                day={listItem}
                handleClick={handleClick.bind(null, listItem)} />
            ))
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

export default Forecast;

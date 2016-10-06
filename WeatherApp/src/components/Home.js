import React from 'react';
import GetCityContainer from '../containers/GetCityContainer';
import background from '../images/bg.jpg';

const styles = {
  container: {
    backgroundSize: 'cover',
    backgroundImage: 'url(' + background + ')',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },

  header: {
    fontSize: '45px',
    color: '#000',
    fontWeight: 100,
  },

};

function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Enter a City and State</h1>
      <GetCityContainer />
    </div>
  );
}

export default Home;

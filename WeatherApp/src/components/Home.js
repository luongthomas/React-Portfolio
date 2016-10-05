var React = require('react');
var PropTypes = React.PropTypes;
var GetCityContainer = require('../containers/GetCityContainer');
var background = require('../images/bg.jpg');

var styles = {
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

function Home(props) {
  console.log('background', background);
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Enter a City and State</h1>
      <GetCityContainer />
    </div>
  );
}

module.exports = Home;

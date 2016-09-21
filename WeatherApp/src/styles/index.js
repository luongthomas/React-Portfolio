var bg = require('../img/bg.jpg');

var styles = {
  verticalAlign: {
    flex: '1 1 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '630px',
    backgroundImage: 'url(' + bg + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    color: 'lightgray',
  },

  space: {
    margin: '25px',
  },

  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '1%',
  },

};

module.exports = styles;
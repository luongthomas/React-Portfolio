var React = require('react');
var GetCityContainer = require('./GetCityContainer');

var styles = {
  container: {
    height: '92%',
    width: '100%',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'pink',
    color: '#FFF',
    padding: 5,
  },

};

var Main = React.createClass({

  render: function () {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={{ margin: 0 }}>Weather Lookup</h2>
            <GetCityContainer direction='row' />
        </div>
        {this.props.children}
      </div>
    );
  },

});

module.exports = Main;

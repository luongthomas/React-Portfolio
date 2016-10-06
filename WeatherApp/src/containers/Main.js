import React, { Component } from 'react';
import GetCityContainer from './GetCityContainer';

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

class Main extends Component {

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={{ margin: 0 }}>Weather Lookup</h2>
            <GetCityContainer direction='row' />
        </div>
        {this.props.children}
      </div>
    );
  }

};

export default Main;

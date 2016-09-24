var React = require('react');
import MainContainer from './MainContainer';
var Navbar = require('./Navbar');
var Main = React.createClass({
  render: function () {
    return (
      <div>
        <Navbar></Navbar>
        <MainContainer>

          {this.props.children}

        </MainContainer>
      </div>
    );
  },
});

module.exports = Main;

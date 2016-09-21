var React = require('react');
var MainContainer = require('./MainContainer');
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

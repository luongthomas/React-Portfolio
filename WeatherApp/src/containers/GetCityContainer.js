
var React = require('react');
var GetCity = require('../components/GetCity');
var PropTypes = React.PropTypes;

var GetCityContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired,
  },

  getDefaultProps: function () {
    return {
      direction: 'column',
    };
  },

  propTypes: {
    direction: PropTypes.string,
  },

  getInitialState: function () {
    return {
      city: '',
    };
  },

  handleSubmitCity: function (event) {
    event.preventDefault();
    
    // var city = this.state.city;
    this.context.router.push('/forecast/' + this.state.city);
  },

  handleUpdateCity: function (event) {
    this.setState({
      city: event.target.value,
    });
  },

  render: function () {
    return (
      <GetCity
        direction={this.props.direction}
        onSubmitCity={this.handleSubmitCity}
        onUpdateCity={this.handleUpdateCity}
        city={this.state.city} />
    );
  },

});

module.exports = GetCityContainer;

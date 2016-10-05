var React = require('react');
var api = require('../utils/api');
var Forecast = require('../components/Forecast');
var getForecast = require('../utils/api').getForecast;

var ForecastContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired,
  },

  getInitialState: function () {
    return {
      isLoading: true,
      forecastData: {},
    };
  },

  componentDidMount: function (props) {
    this.makeRequest(this.props.routeParams.city);
  },

  componentWillReceiveProps: function (nextProps) {
    this.makeRequest(nextProps.routeParams.city);
  },

  makeRequest: function (city) {
    getForecast(city)
      .then(function (forecastData) {
        this.setState({
          isLoading: false,
          forecastData: forecastData,
        });
      }.bind(this));
  },

  handleClick: function (weather) {
    this.context.router.push({
      pathname: '/detail/' + this.props.routeParams.city,
      state: {
        weather: weather,
      },
    });
  },

  render: function () {
    return (
      <Forecast
        city={this.props.routeParams.city}
        isLoading={this.state.isLoading}
        handleClick={this.handleClick}
        forecastData={this.state.forecastData}/>
    );
  },

});

module.exports = ForecastContainer;

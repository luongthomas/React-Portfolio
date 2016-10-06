import React, { Component } from 'react';
import Forecast from '../components/Forecast';
import { getForecast } from '../helpers/api';

class ForecastContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      forecastData: {},
    };
  }

  componentDidMount(props) {
    this.makeRequest(this.props.routeParams.city);
  }

  componentWillReceiveProps(nextProps) {
    this.makeRequest(nextProps.routeParams.city);
  }

  makeRequest(city) {
    getForecast(city)
      .then((forecastData) => {
        this.setState({
          isLoading: false,
          forecastData,
        });
      });
  }

  handleClick(weather) {
    this.context.router.push({
      pathname: `/detail/${this.props.routeParams.city}`,
      state: {
        weather,
      },
    });
  }

  render() {
    return (
      <Forecast
        city={this.props.routeParams.city}
        isLoading={this.state.isLoading}
        forecastData={this.state.forecastData}
        handleClick={(weather) => this.handleClick(weather)} />
    );
  }

};

ForecastContainer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default ForecastContainer;

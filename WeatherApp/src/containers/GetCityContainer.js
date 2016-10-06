import React, { PropTypes, Component } from 'react';
import GetCity from '../components/GetCity';

class GetCityContainer extends Component {

  constructor() {
    super();
    this.state = {
      city: '',
    };
  }

  handleSubmitCity(event) {
    event.preventDefault();
    this.context.router.push(`/forecast/${this.state.city}`);
  }

  handleUpdateCity(event) {
    this.setState({
      city: event.target.value,
    });
  }

  render() {
    return (
      <GetCity
        direction={this.props.direction}
        city={this.state.city}
        onSubmitCity={(event) => this.handleSubmitCity(event)}
        onUpdateCity={(event) => this.handleUpdateCity(event)} />
    );
  }

};

GetCityContainer.propTypes = {
  direction: PropTypes.string,
};

GetCityContainer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

GetCityContainer.defaultProps = {
    direction: 'column',
  };

export default GetCityContainer;

import React, { Component } from 'react';
import Results from '../components/Results';
import { battle } from '../utils/githubHelpers';

// Don't need to save playersInfo since it is being saved in our state from ConfirmBattleC
class ResultsContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      scores: [],
    };
  }

  async componentDidMount() {
    try {
      // given from router context
      const scores = await battle(this.props.location.state.playersInfo);
      this.setState({ scores, isLoading: false });
    } catch (error) {
      console.warn('Error in ResultsContainer', error);
    }

  }

  // When state changes from componentDidMount, <Results> rerenders with the new state
  render() {
    return (
      <Results
        isLoading={this.state.isLoading}
        scores={this.state.scores}
        playersInfo={this.props.location.state.playersInfo}/>
    );
  }

};

export default ResultsContainer;

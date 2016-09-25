import React from 'react';
import Results from '../components/Results';
import { battle } from '../utils/githubHelpers';

// Don't need to save playersInfo since it is being saved in our state from ConfirmBattleC
const ResultsContainer = React.createClass({
  getInitialState() {
    return {
      isLoading: true,
      scores: [],
    };
  },

  async componentDidMount() {
    const scores = await battle(this.props.location.state.playersInfo); // given from router context
    try {
      this.setState({ scores, isLoading: false });
    } catch (error) {
      console.warn('Error in ResultsContainer', error);
    }

  },

  // When state changes from componentDidMount, <Results> rerenders with the new state
  render() {
    return (
      <Results
        isLoading={false}
        scores={this.state.scores}
        playersInfo={this.props.location.state.playersInfo}/>
    );
  },

});

export default ResultsContainer;

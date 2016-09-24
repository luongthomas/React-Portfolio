import React from 'react';
import Results from '../components/Results';
import { battle } from '../utils/githubHelpers';

// Don't need to save playersInfo since it is being saved in our state from ConfirmBattleC
const ResultsContainer = React.createClass({
  getInitialState: function () {
    return {
      isLoading: true,
      scores: [],
    };
  },

  componentDidMount: function () {
    battle(this.props.location.state.playersInfo) // given from router context
      .then(function (scores) {
        this.setState({
          scores: scores,
          isLoading: false,
        });
      }.bind(this));  // because we're using 'this' inside a different function, bind the scope
  },

  // When state changes from componentDidMount, <Results> rerenders with the new state
  render: function () {
    return (
      <Results
        isLoading={false}
        scores={this.state.scores}
        playersInfo={this.props.location.state.playersInfo}/>
    );
  },

});

export default ResultsContainer;

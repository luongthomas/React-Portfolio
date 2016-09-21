var React = require('react');
var PropTypes = React.PropTypes;
var Results = require('../components/Results');
var githubHelpers = require('../utils/githubHelpers');

// Don't need to save playersInfo since it is being saved in our state from ConfirmBattleC
var ResultsContainer = React.createClass({
  getInitialState: function () {
    return {
      isLoading: true,
      scores: [],
    };
  },

  componentDidMount: function () {
    githubHelpers.battle(this.props.location.state.playersInfo) // given from router context
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
        isLoading={null}
        scores={null}
        playersInfo={this.props.location.state.playersInfo}/>
    );
  },

});

module.exports = ResultsContainer;

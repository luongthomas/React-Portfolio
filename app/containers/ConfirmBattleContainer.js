// Container will handle the logic, while components handle the UI

var React = require('react');
var PropTypes = React.PropTypes;
var ConfirmBattle = require('../components/ConfirmBattle');
var githubHelpers = require('../utils/githubHelpers');

var ConfirmBattleContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired,
  },
  getInitialState: function () {
    return {
      isLoading: true,
      playersInfo: [],
    };
  },

  componentDidMount: function () {
      var query = this.props.location.query;

      //  Fetch info from github then update state
      githubHelpers.getPlayersInfo([query.playerOne, query.playerTwo])
        .then(function (players) {
          this.setState({
            isLoading: false,
            playersInfo: [players[0], players[1]],
          });
        }.bind(this))   // binding this allows us to keep the context to query's 'this'
                        // without it, it tries to set state of githubHelpers (undesired)

        // if any errors are thrown prior, then gives err as error message
        .catch(function (err) {
          console.warn('Error in getPlayersInfo', err);
        });
    },

  handleInitiateBattle: function () {
    this.context.router.push({
      pathname: '/results',
      state: {
        playersInfo: this.state.playersInfo,
      },
    });
  },

  render: function () {
    return (
      <ConfirmBattle
        isLoading={this.state.isLoading}
        onInitiateBattle={this.handleInitiateBattle}
        playersInfo={this.state.playersInfo}/>
    );
  },

});

module.exports = ConfirmBattleContainer;

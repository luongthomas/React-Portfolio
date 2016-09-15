var React = require('react');
var Prompt = require('../components/Prompt');

var PromptContainer = React.createClass({
  // Don't have to pass router down to all children as a props, use context
  contextTypes: {
    router: React.PropTypes.object.isRequired,
  },

  getInitialState: function () {
    return {
      username: '',
    };
  },

  handleUpdateUser: function (event) {
    this.setState({
      username: event.target.value,
    });
  },

  handleSubmitUser: function (e) {
    e.preventDefault();
    var username = this.state.username;
    this.setState({
      username: '',
    });

    // go to battle
    // routeParams is in the URL appended by the else clause
    if (this.props.routeParams.playerOne) {
      this.context.router.push({
        pathname: '/battle',
        query: {
          playerOne: this.props.routeParams.playerOne,
          playerTwo: this.state.username,
        },
      });

    // go to playerTwo
    } else {
      this.context.router.push('/playerTwo/' + this.state.username);
    }
  },

  //  Passing functions use on prefix, the parameter itself has handle prefix
  render: function () {
    return (
      <Prompt
        onSubmitUser={this.handleSubmitUser}
        onUpdateUser={this.handleUpdateUser}
        header={this.props.route.header}
        username={this.state.username}  />

    );
  },

});

module.exports = PromptContainer;

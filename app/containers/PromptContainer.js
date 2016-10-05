import React, { Component } from 'react';
import Prompt from '../components/Prompt';

class PromptContainer extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
    };
  }

  handleUpdateUser (event) {
    this.setState({
      username: event.target.value,
    });
  }

  handleSubmitUser (event) {
    event.preventDefault();
    const { username } = this.state;
    this.setState({
      username: '',
    });

    // Concise objects: if key is exact same as value, just pass in key or value
    const { playerOne } = this.props.routeParams;

    // go to battle
    // routeParams is in the URL appended by the else clause
    // the way in which you route to a new path inside a function is this
    if (playerOne) {
      this.context.router.push({
        pathname: '/battle',
        query: {
          playerOne,
          playerTwo: username,
        },
      });

    // go to playerTwo
    } else {
      this.context.router.push(`/playerTwo/${username}`);
    }
  }

  //  Passing functions use on prefix, the parameter itself has handle prefix
  render() {
    return (
      <Prompt
        onSubmitUser={(event) => this.handleSubmitUser(event)}
        onUpdateUser={(event) => this.handleUpdateUser(event)}
        header={this.props.route.header}
        username={this.state.username}  />

    );
  }
};

// Don't have to pass router down to all children as a props, use context
PromptContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

export default PromptContainer;

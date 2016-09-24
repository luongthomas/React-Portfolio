import React, { PropTypes } from 'react';

// Const vs let vs var

// Centers component and text on the page
const styles = {
  container: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    fontSize: '55px',
  },

  content: {
    textAlign: 'center',
    position: 'absolute',
    width: '100%',
    marginTop: '30px',
  },

};

const Loading = React.createClass({
  // To control the proptypes we receive
  propTypes: {
    text: PropTypes.string,
    speed: PropTypes.number,
  },

  // Will use these props if none are passed in
  getDefaultProps: function () {
    return {
      text: 'Loading',
      speed: '300',
    };
  },

  // Initial state of text is the value of the prop passed in, after so we dont use prop
  //  This makes it not an anti pattern
  getInitialState: function () {
    this.originalText = this.props.text;
    return {
      text: this.originalText,
    };
  },

  // when the text becomes 'loading...', it will reset state back to 'loading'
  // use originalText variable to prevent repeating of manually typed words
  componentDidMount: function () {
    const stopper = this.originalText + '...';
    this.interval = setInterval(function () {
      if (this.state.text == stopper) {
        this.setState({
          text: this.originalText,
        });
      } else {
        this.setState({
          text: this.state.text + '.',
        });
      }
    }.bind(this), this.props.speed);
  },

  //  setInterval returns thing which clearInterval uses so setinterval wont run anymore
  //   aka removes the interval
  componentWillUnmount: function () {
    clearInterval(this.interval);
  },

  render: function () {
    return (
      <div style={styles.container}>
        <p style={styles.content}>{this.state.text}</p>
      </div>
    );
  },

});

export default Loading;

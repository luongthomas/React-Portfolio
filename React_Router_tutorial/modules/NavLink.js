// modules/NavLink.js
/*
  Link is the most used component in the app,
  identical to <a/> except  it's aware of the Router it was rendered in.
*/
import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
  render() {
    return <Link {...this.props} activeClassName="active"/>;
  },
});

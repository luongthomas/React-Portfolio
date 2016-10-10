import React, { PropTypes } from 'react'
import { Authenticate } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// created an object whose values are action creators
// can be used as first param in bindActionCreators to bind
//  this.props.dispatch to
import * as userActionCreators from 'redux/modules/users'


const AuthenticateContainer = React.createClass({
  propTypes: {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    fetchAndHandleAuthedUser: PropTypes.func.isRequired,
  },
  contextTypes: { // get access to react-router
    router: PropTypes.object.isRequired,
  },
  handleAuth (e) {
    e.preventDefault()
    this.props.fetchAndHandleAuthedUser()
      .then(() => this.context.router.replace('feed'))
  },
  render () {
    // console.log('isFetching', this.props.isFetching)
    return (
      <Authenticate
        isFetching={this.props.isFetching}
        error={this.props.error}
        onAuth={this.handleAuth}/>
    )
  },
})

function mapStateToProps(state) {
  // console.log('STATE', state)
  return {
    isFetching: state.isFetching,
    error: state.error,
  }
}

// Turns an object whose values are Action Creators,
//  into an object with the same keys, but with every AC wrapped
//  into a dispatch call so they can be invoked directly
function mapDispatchToProps (dispatch) {
  return bindActionCreators(userActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (AuthenticateContainer)

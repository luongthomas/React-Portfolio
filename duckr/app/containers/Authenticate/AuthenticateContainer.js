import React, { PropTypes } from 'react'
import { Authenticate } from 'components'
import auth from 'helpers/auth'
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
    authUser: PropTypes.func.isRequired,
    fetchingUser: PropTypes.func.isRequired,
    fetchingUserFailure: PropTypes.func.isRequired,
    fetchingUserSuccess: PropTypes.func.isRequired,
  },
  handleAuth () {
    this.props.fetchingUser()
    auth().then((user) => {
      console.log('USER', user)
      this.props.fetchingUserSuccess(user.uid, user, Date.now())
      this.props.authUser(user.uid)
    })
    .catch(() => this.props.fetchingUserFailure(error))
  },
  render () {
    console.log('isFetching', this.props.isFetching)
    return (
      <Authenticate
        isFetching={this.props.isFetching}
        error={this.props.error}
        onAuth={this.handleAuth}/>
    )
  },
})

function mapStateToProps(state) {
  console.log('STATE', state)
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

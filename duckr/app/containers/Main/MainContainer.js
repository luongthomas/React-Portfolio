import React, { PropTypes } from 'react'
import { Navigation } from 'components'
import { connect } from 'react-redux'
import { container, innerContainer } from './styles.css'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'
import * as usersLikesActionCreators from 'redux/modules/usersLikes'
import { formatUserInfo } from 'helpers/utils'
import { firebaseAuth } from 'config/constants'

const MainContainer = React.createClass({
  propTypes: {
    isAuthed: PropTypes.bool.isRequired,
    authUser: PropTypes.func.isRequired,
    fetchingUserSuccess: PropTypes.func.isRequired,
    removeFetchingUser: PropTypes.func.isRequired,
    children: PropTypes.object,
    isFetching: PropTypes.bool.isRequired,
    setUsersLikes: PropTypes.func.isRequired,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  componentDidMount () {
    // whenever auth changes, do auth check asynchronously.  slight lag before all of this runs
    console.log('props', this.props)
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        const userData = user.providerData[0]
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, userData.uid)
        console.log('maincontainer onAuthStateChanged userData.uid', userData.uid)
        this.props.authUser(user.uid)
        this.props.fetchingUserSuccess(user.uid, userInfo, Date.now())
        this.props.setUsersLikes()
        if (this.props.location.pathname === '/') {
          this.context.router.replace('feed')
        }
      } else {
        this.props.removeFetchingUser()
      }
    })
  },
  render () {
    // console.log('props', this.props)
    // while auth is still checking, render nothing
    // when it does, then show the container
    return this.props.isFetching === true
      ? <p>{`Fetching`}</p>
      : <div className={container}>
          <Navigation isAuthed={this.props.isAuthed} />
          <div className={innerContainer}>
            {this.props.children}
          </div>
        </div>
  },
})

export default connect(
  ({users}) => ({isAuthed: users.isAuthed, isFetching: users.isFetching}),
  (dispatch) => bindActionCreators({
    ...userActionCreators,
    ...usersLikesActionCreators,
  }, dispatch)
)(MainContainer)

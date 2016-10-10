import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Logout } from 'components'
import { logoutAndUnauth } from 'redux/modules/users'

const LogoutContainer = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
  },
  componentDidMount () {
    this.props.dispatch(logoutAndUnauth())
  },
  render () {
    return <Logout />
  },
})

// When we connect a component and have one thing we want to dispatch
// this component will get dispatch as a prop
// other examples do mapDispatchToProps because there are multiple ACs to dispatch, but here no need
export default connect()(LogoutContainer)

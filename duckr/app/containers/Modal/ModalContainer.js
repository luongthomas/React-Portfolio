
import { bindActionCreators } from 'redux'
import { Modal } from 'components'
import { connect } from 'react-redux'
import * as modalActionCreators from 'redux/modules/modal'
import * as ducksActionCreators from 'redux/modules/ducks'

// <Modal /> will receive all these as props
function mapStateToProps ({modal, users}) {
  const duckTextLength = modal.duckText.length
  return {
    // guard so that our user is never undefined when it goes to modal
    //  user is required by modal.  It may be undefined while authenticating
    user: users[users.authedId] ? users[users.authedId].info : {},
    duckText: modal.duckText,
    isOpen: modal.isOpen,
    isSubmitDisabled: duckTextLength <= 0 || duckTextLength > 140,
  }
}

// Modal will receive all of these as props
// the spread operator will combine them into one object, the first param only takes one object
function mapDispatchToProps (dispatch) {
  return bindActionCreators({...modalActionCreators, ...ducksActionCreators}, dispatch)
}

// since modalcontainer didn't have lifecycle events,
// we're passing props directly to Modal component
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Modal)

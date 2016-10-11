// Purpose of DuckContainer is to get all ducks information
// without passing it to feed and down to the Duck component, keeps it modular

import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Duck } from 'components'
import * as usersLikesActions from 'redux/modules/usersLikes'

const { func, object, bool, number } = PropTypes

const DuckContainer = React.createClass({
  propTypes: {
    duck: object.isRequired,
    numberOfLikes: number,
    isLiked: bool.isRequired,
    hideLikeCount: bool.isRequired,
    hideReplyBtn: bool.isRequired,
    handleDeleteLike: func.isRequired,
    addAndHandleLike: func.isRequired,
  },

  contextTypes: { // to enable redirects with the router
    router: PropTypes.object.isRequired,
  },
  getDefaultProps () {
    return {
      hideReplyBtn: false,
      hideLikeCount: true,
    }
  },

  goToProfile (e) {
    e.stopPropagation() // prevent default
    this.context.router.push('/' + this.props.duck.uid) // appends uid of person who created the duck
  },

  handleClick (e) {
    e.stopPropagation()
    this.context.router.push('/duckDetail/' + this.props.duck.duckId) // appends duck
  },

  render () {
    return (
      <Duck
        goToProfile={this.goToProfile}
        onClick={this.props.hideReplyBtn === true ? null : this.handleClick}
        // when on duckDetail page, there is no reply button, so stay on page
        {...this.props} />  // take all our props and spread them into the duck component


    )
  },
})

// DuckContainer invoked in Feed, {duckId} was passed in, we can pull it from the ducks array
function mapStateToProps ({ducks, likeCount, usersLikes}, props) {
  return {
    duck: ducks[props.duckId],
    hideLikeCount: props.hideLikeCount,
    hideReplyBtn: props.hideReplyBtn,
    isLiked: usersLikes[props.duckId] === true,
    numberOfLikes: likeCount[props.duckId],
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(usersLikesActions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DuckContainer)

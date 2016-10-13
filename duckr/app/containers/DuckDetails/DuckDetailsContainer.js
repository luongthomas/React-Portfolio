import React, { PropTypes } from 'react'
import { DuckDetails } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ducksActionCreators from 'redux/modules/ducks'
import * as likeCountActionCreators from 'redux/modules/likeCount'
import * as repliesActionCreators from 'redux/modules/replies'

const DuckDetailsContainer = React.createClass({
  propTypes: {
    authedUser: PropTypes.object.isRequired,
    duckId: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    duckAlreadyFetched: PropTypes.bool.isRequired,
    removeFetching: PropTypes.func.isRequired,
    initLikeFetch: PropTypes.func.isRequired,
    addAndHandleReply: PropTypes.func.isRequired,
  },
  // when refreshing on duckdetails, the store will dissapear, but if we see its undefined, then we grab duck specifically
  componentDidMount () {
    this.props.initLikeFetch(this.props.duckId)
    if (this.props.duckAlreadyFetched === false) {
      // fetch duck and save to store
      this.props.fetchAndHandleDuck(this.props.duckId)
    } else {
      // set isFetching to false since we already have the duck
      this.props.removeFetching()
    }
  },
  render () {
    console.log('DuckDetailsContainer props', this.props)
    return (
      <DuckDetails
        addAndHandleReply={this.props.addAndHandleReply}
        authedUser={this.props.authedUser}
        duckId={this.props.duckId}
        isFetching={this.props.isFetching}
        error={this.props.error} />
    )
  },
})

function mapStateToProps ({ducks, likeCount, users}, props) {
  return {
    isFetching: ducks.isFetching || likeCount.isFetching,
    error: ducks.error,
    authedUser: users[users.authedId].info,
    duckId: props.routeParams.duckId,
    duckAlreadyFetched: !!ducks[props.routeParams.duckId] // converting into bool
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...ducksActionCreators,
    ...likeCountActionCreators,
    ...repliesActionCreators,
  }, dispatch)
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DuckDetailsContainer)

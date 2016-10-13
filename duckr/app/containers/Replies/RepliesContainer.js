import React, { PropTypes } from 'react'
import { Replies } from 'components'
import { connect } from 'react-redux'

const RepliesContainer = React.createClass({
  propTypes: {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    lastUpdated: PropTypes.number.isRequired,
    replies: PropTypes.object.isRequired,
    duckId: PropTypes.string.isRequired, // from container

  },
  getDefaultProps () {
    return {
      lastUpdated: 0,
      replies: {},
    }
  },
  render () {
    return (
      <Replies
        isFetching={this.props.isFetching}
        error={this.props.error}
        lastUpdated={this.props.lastUpdated}
        replies={this.props.replies} />
    )
  },
})

function mapStateToProps (state, props) {
  const duckRepliesInfo = state.replies[props.duckId] || {} // if that duck doesn't have replies or we haven't fetched, then default it
  const { lastUpdated, replies } = duckRepliesInfo
  return {
    isFetching: state.replies.isFetching,
    error: state.replies.error,
    lastUpdated,
    replies,
  }
}

export default connect(
  mapStateToProps,
)(RepliesContainer)

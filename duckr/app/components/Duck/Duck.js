import React, { PropTypes } from 'react'
import { formatTimeStamp } from 'helpers/utils'
import Reply from 'react-icons/lib/fa/mail-reply' // reach into the folder for performance benefits
import Star from 'react-icons/lib/fa/star'

import {
  duckContainer, contentContainer, avatar, actionContainer,
  header, text, likeReplyContainer, icon, likedIcon, author,
} from './styles.css'

Duck.propTypes = {
  duck: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    duckId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    uid: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func,
  isLiked: PropTypes.bool.isRequired,
  addAndHandleLike: PropTypes.func.isRequired,
  handleDeleteLike: PropTypes.func.isRequired,
  numberOfLikes: PropTypes.number,
  hideReplyBtn: PropTypes.bool.isRequired,
  hideLikeCount: PropTypes.bool.isRequired,
  goToProfile: PropTypes.func.isRequired,
}

export default function Duck (props) {
  // adding className and handler on star icon
  const starIcon = props.isLiked === true ? likedIcon : icon
  const starFn = props.isLiked === true ? props.handleDeleteLike : props.addAndHandleLike
  // if no on duck page, (aka no reply button) then do default nonclick pointer
  return (
    <div
      className={duckContainer}
      style={{cursor: props.hideReplyBtn === true ? 'default' : 'pointer'}}
      onClick={props.onClick}>
        <img src={props.duck.avatar} className={avatar} />
        <div className={contentContainer}>
          <div className={header}>
            <div onClick={props.goToProfile} className={author}>{props.duck.name}</div>
            <div>{formatTimeStamp(props.duck.timestamp)}</div>
          </div>
          <div className={text}>{props.duck.text}</div>
          <div className={likeReplyContainer}>
            {props.hideReplyBtn === true
              ? null
              : <Reply className={icon} />}
            <div className={actionContainer}>
              <Star className={starIcon} onClick={(e) => starFn(props.duck.duckId, e)} />
              {props.hideLikeCount === true ? null : <div>{props.numberOfLikes}</div>}
            </div>
          </div>
        </div>
    </div>
  )
}

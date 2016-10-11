import React, { PropTypes } from 'react'
import { default as ReactModal } from 'react-modal' // npm installed ReactModal by default
import {
  newDuckTop, pointer, newDuckInputContainer,
  newDuckInput, darkBtn, submitDuckBtn } from './styles.css'
import { formatDuck } from 'helpers/utils'

// modify the Reactmodal through content
const modalStyles = {
  content: {
    width: 350,
    margin: '0px auto',
    height: 220,
    borderRadius: 5,
    background: '#EBEBEB',
    padding: 0,
  },
}

const { object, string, bool, func } = PropTypes
Modal.propTypes = {
  duckText: string.isRequired,
  isOpen: bool.isRequired,
  user: object.isRequired,
  isSubmitDisabled: bool.isRequired,
  openModal: func.isRequired,
  closeModal: func.isRequired,
  updateDuckText: func.isRequired,
  duckFanOut: func.isRequired,
}

// go ahead and import this thing and call it ReactModal, to keep it separate from our modal
export default function Modal (props) {
  function submitDuck () {
    props.duckFanOut(formatDuck(props.duckText, props.user))
  }

  // onRequestClose will close the modal if clicked outside the modal
  return (
    <span className={darkBtn} onClick={props.openModal}>
      {`Duck`}
      <ReactModal style={modalStyles} isOpen={props.isOpen} onRequestClose={props.closeModal}>
        <div className={newDuckTop}>
          <span>{`Compose new Duck`}</span>
          <span onClick={props.closeModal} className={pointer}>{`X`}</span>
        </div>
        <div className={newDuckInputContainer}>
          <textarea
            onChange={(e) => props.updateDuckText(e.target.value)}
            value={props.duckText}
            maxLength={140}
            type='text'
            className={newDuckInput}
            placeholder="What's on your mind?" />
        </div>
        <button
          className={submitDuckBtn}
          disabled={props.isSubmitDisabled}
          onClick={submitDuck}>
          {`Duck`}
        </button>
      </ReactModal>
    </span>
  )
}

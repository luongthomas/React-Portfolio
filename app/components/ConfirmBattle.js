import React, { PropTypes } from 'react';

import { space } from '../styles';

// make a local var named Link, and set equal to react-router object's Link property
import { Link, Router, Route } from 'react-router';

import UserDetails from './UserDetails';
import UserDetailsWrapper from './UserDetailsWrapper';
import MainContainer from '../containers/MainContainer';
import Loading from './Loading';

// A trick to display object info in json format
function puke(object) {
  return <pre>{JSON.stringify(object, null, ' ')}</pre>;
}

// initially 'props' was passed in, now we are passing in the property as the parameter
function ConfirmBattle({ isLoading, playersInfo, onInitiateBattle }) {
  return isLoading === true
    ? <Loading speed={800} text={'Waiting'}/>
  :  (<MainContainer>
        <h1>Confirm Players</h1>
        <div className='col-sm-8 col-sm-offset-2'>
          <UserDetailsWrapper header='Player One'>
            <UserDetails info={playersInfo[0]} />

          </UserDetailsWrapper>
          <UserDetailsWrapper header='Player Two'>
            <UserDetails info={playersInfo[1]} />
          </UserDetailsWrapper>
        </div>
        <div className='col-sm-8 col-sm-offset-2'>
          <div className='col-sm-12' style={space}>
            <button type='button' className='btn btn-lg btn-success space'
                onClick={onInitiateBattle}>
              Initiate Battle!
            </button>
          </div>
          <div className='col-sm-12' style={space}>
            <Link to='/playerOne'>
              <button type='button' className='btn btn-lg btn-danger space'>
                Reselect Players
              </button>
            </Link>
          </div>
        </div>
      </MainContainer>);
}

ConfirmBattle.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  playersInfo: PropTypes.array.isRequired,
  onInitiateBattle: PropTypes.func.isRequired,
};

export default ConfirmBattle;

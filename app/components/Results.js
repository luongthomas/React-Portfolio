import React, { PropTypes } from 'react';
import { space } from '../styles';
import UserDetails from './UserDetails';
import UserDetailsWrapper from './UserDetailsWrapper';
import { Link } from 'react-router';
import MainContainer from '../containers/MainContainer';
import Loading from '../components/Loading';

// Private functional stateless component, is good to avoid repeating code
//  another benefit is there is no 'this' keyword
function StartOver() {
  return (
    <div className='col-sm-12' style={space}>
      <Link to='/playerOne'>
        <button type='button' className='btn btn-lg btn-danger'>Start Over</button>
      </Link>
    </div>
  );
}

function Results({ isLoading, scores, playersInfo }) {
  if (isLoading === true) {
    return (
      <Loading text={'One Moment'} speed={100}/>
    );
  };

  if (scores[0] === scores[1]) {
    return (
      <MainContainer>
        <h1> It is a tie! </h1>
        <StartOver />
      </MainContainer>
    );
  }

  const winningIndex = scores[0] > scores[1] ? 0 : 1;
  const losingIndex = winningIndex === 0 ? 1 : 0;
  return (
    <MainContainer>
      <h1>Results</h1>
      <div className='col-sm-8 col-sm-offset-2'>
        <UserDetailsWrapper header='Winner'>
          <UserDetails score={scores[winningIndex]} info={playersInfo[winningIndex]} />
        </UserDetailsWrapper>

        <UserDetailsWrapper header='Loser'>
          <UserDetails score={scores[losingIndex]} info={playersInfo[losingIndex]} />
        </UserDetailsWrapper>
      </div>
      <StartOver />
    </MainContainer>
  );
}

Results.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  playersInfo: PropTypes.array.isRequired,
  scores: PropTypes.array.isRequired,
};

export default Results;

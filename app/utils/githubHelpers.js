import axios from 'axios';
import logCustomMessage from './logCustomMessage';

//  Github allows free requests but rate limits quickly, so use api key credentials
const accessToken = 'f3f3f6a1152ba4e30f5dc23a7479cd6ec02c8e9b';
const sec = 'secret';
const clientID = 'CLIENT_ID';
const param = '?client_id=' + clientID + '&client_secret' + sec;

// Pass the GET request URL to get
// returns a promise, which .then() could be appended to (data modified) and resolved
function getUserInfo(username) {
  return axios.get('http://api.github.com/users/' + username, {
    params: {
      access_token: accessToken,
      client_secret: sec,
    },
  });
};

// returns a promise of the data that it gets, we can use .then() for a callback function
function getRepos(username) {
  return axios.get('http://api.github.com/users/' + username + '/repos' + param + '&per_page=100');
}

// calculate all the stars the user has
// uses reduce to start at zero and accumulate all stars in the data
function getTotalStars(repos) {
  return repos.data.reduce(function (prev, current) {
      return prev + current.stargazers_count;
    }, 0);
}

// use getRepos which returns a promise and returns the results into getTotalStars
// returns a promise
function getPlayersData(player) {
  return getRepos(player.login)
    .then(getTotalStars)
    .then(function (totalStars) {
      return {
        followers: player.followers,
        totalStars: totalStars,
      };
    });
}

// return an array, after doing some fancy algorithms to determin a winner
function calculateScores(players) {
  return [
    players[0].followers * 3 + players[0].totalStars,
    players[1].followers * 3 + players[1].totalStars,
  ];
}

// axios.all allows multiple requests in parallel, returning an array of response objects
//  in same order they were sent
//  axios.spread is same but doesn't use array indices, separates into multiple arguements

//  loops over an array, and returns a promise meaning the function-caller can do a .then()
export function getPlayersInfo(players) {
  // fetch some data from Github
  // map loops over all elements, creates a new array of promises (return from getUserInfo)
  return axios.all(players.map(function (username) {
    return getUserInfo(username);
  }))
  .then(function (info) {
    // return an array of user.data for each player.  obj.data holds user info
    return info.map(function (user) {
      return user.data;
    });
  })
  .catch(function (error) {
    return logCustomMessage(error.statusText, {
      players: players,
      error: error,
    });
  });
};

// find winner based on user data
// playerOneData and playerTwoData are promises since getPlayerData returns promises
// .all() means when all promises are resolved, then do.. then then()
export function battle(players) {
  const playerOneData = getPlayersData(players[0]);
  const playerTwoData = getPlayersData(players[1]);

  return axios.all([playerOneData, playerTwoData])
    .then(calculateScores)
    .catch(function (error) {
      return logCustomMessage(error.statusText, {
        players: players,
        error: error,
      });
    });
};

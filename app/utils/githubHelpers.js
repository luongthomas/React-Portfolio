import axios from 'axios';
import logCustomMessage from './logCustomMessage';

//  Github allows free requests but rate limits quickly, so use api key credentials
const accessToken = '2690e0187ed97803f9dff9853a3e91d30b955204';
const sec = 'secret';
const clientID = 'CLIENT_ID';
const param = `?client_id=${clientID}&client_secret=${sec}&access_token=${accessToken}`;

//http://api.github.com/users/luongthomas?client_id=clientID&client_secret=secret&access_token=2690e0187ed97803f9dff9853a3e91d30b955204
// Pass the GET request URL to get
// returns a promise, which .then() could be appended to (data modified) and resolved
// if username is returned to be undefined, the default value of luongthomas will be set
function getUserInfo(username = 'luongthomas') {
  return axios.get(`http://api.github.com/users/${username + param}`);
};

// returns a promise of the data that it gets, we can use .then() for a callback function
function getRepos(username = 'luongthomas') {
  return axios.get(`http://api.github.com/users/${username}/repos${param}&per_page=100`);
}

// calculate all the stars the user has
// uses reduce to start at zero and accumulate all stars in the data
function getTotalStars(repos) {
  return repos.data.reduce((prev, current) => prev + current.stargazers_count, 0);
}

// use getRepos which returns a promise and returns the results into getTotalStars
// returns a promise
async function getPlayersData(player) {
  try {
    const repos = await getRepos(player.login);
    const totalStars = await getTotalStars(repos);
    return {
          followers: player.followers,
          totalStars,
        };
  } catch (error) {
    console.warn('Error in githubHelpers', error);
  }
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
export async function getPlayersInfo(players) {
  // fetch some data from Github
  // map loops over all elements, creates a new array of promises (return from getUserInfo)
  try {
    const info = await Promise.all(players.map((username) => getUserInfo(username)));
    console.log(info);

    // return an array of user.data for each player.  obj.data holds user info
    return info.map((user) => user.data);
  } catch (error) {
    console.warn('Error in getPlayersInfo', error);
  };
};

// find winner based on user data
// playerOneData and playerTwoData are promises since getPlayerData returns promises
// .all() means when all promises are resolved, then do.. then then()
export async function battle(players) {
  try {
    const playerOneData = await getPlayersData(players[0]);
    const playerTwoData = await getPlayersData(players[1]);

    const playerData =  Promise.all([playerOneData, playerTwoData]);
    return await calculateScores(playerData);
  } catch (error) {
    console.warn('Error in battle', error);
  }
};

const axios = require('axios');




let getReposByUsername = (/* TODO */ username, callback) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let url = `https://api.github.com/users/${username}/repos`
  let options = {
    // url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',

      'Authorization': `token ${process.env.TOKEN}`
    },
  };
  axios.get(url, options).then((repos) => {
    console.log('axios get successful');
    // console.log('data is', repos.data);
    callback(null, repos.data);
  }).catch((err) => {
    console.log('axios github get failed', err);
    callback(err);
  })
}

module.exports.getReposByUsername = getReposByUsername;
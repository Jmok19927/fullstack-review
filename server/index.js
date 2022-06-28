const express = require('express');
const github = require('../helpers/github.js');
const db = require('../database/index.js');
const bodyParser = require('body-parser');
let app = express();


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  let username = req.body.username;
  console.log('TESTING SERVER POST LOG', username)
  github.getReposByUsername(username, (err, data) => {
    if (err) {
      console.error('error at server index,', err)
    } else {
      // db.Repo.remove({}, function(err) {
      //   console.log('collection removed')
      // })
      db.save(data);
    }
  });
  res.end();


});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.Repo.find().sort({starcount: -1}).limit(25).then((data) => {
    console.log('server index get data from DB', data);
    res.end(JSON.stringify(data));
  }
  )

});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


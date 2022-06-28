const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://username:p4ssword@cluster0.ji0dqfy.mongodb.net/?retryWrites=true&w=majority";


mongoose.connect(uri)
// if (process.env.PROD == true) {
//   mongoose.connect(uri)
// } else {
//   mongoose.connect('mongodb://localhost/fetcher');
// }




let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: {
    type: Number,
    unique: true,
  },
  repo_name: {
    type: String,
    unique: true,
  },
  repo_url: {
    type: String,
    unique: true,
  },
  starcount: Number,
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */ repos) => {
  // TODO: Your code here
// for each repo take out the ID, url, stars, and name
// put into a repo document
//put the document into the mongodb repos collection
  repos.forEach((repo) => {
    var currentRepoDoc = new Repo({
      id: repo.id,
      repo_name: repo.name,
      repo_url: repo.html_url,
      starcount: repo.stargazers_count,
    })
    currentRepoDoc.save((err, repo) => {
      if (err) {
        console.error('error at database index save', err)
      } else {
        console.log('saved:', repo)
      }
    })
  })
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;
module.exports.Repo = Repo;
import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    {props.repos.map((repo, index) => {
      return <li key={index}><a href={`${repo.repo_url}`}>{repo.repo_name}</a> Star Count: {repo.starcount}</li>
    })}
    {console.log('rendering list')}
  </div>
)

export default RepoList;
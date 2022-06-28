import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  componentDidMount() {
    $.ajax({
      type: "GET",
      url: "/repos",
      contentType: "application/json",
      success: (data) => {
        var dataArray = JSON.parse(data);
        this.setState({repos: dataArray});
      },
      error: (err) => {
        console.error('client index error', err)
      }
    })
  }

  search (term) {
    console.log(`${term} was searched`);
    var user = JSON.stringify({username: term});
    // TODO
    $.ajax({
      type: "POST",
      url: "/repos",
      data: user,
      contentType: "application/json",
      success: () => {
        console.log(`search has posted ${user}, now getting/updating repos`)
        //maybe refactor posting to the database later to take in a callback or something
        setTimeout(() => {
          $.ajax({
            type: "GET",
            url: "/repos",
            contentType: "application/json",
            success: (data) => {
              var dataArray = JSON.parse(data);
              this.setState({repos: dataArray});
            },
            error: (err) => {
              console.error('client index error', err)
            }
          })
        }, 1000)

      },
      error: () => {
        console.log(`post request of ${user} failed`);
      },
    })
    this.setState();
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
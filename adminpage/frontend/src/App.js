import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom'
class App extends Component {
  render() {
    return ( 
      <Router>
      <Route exact path="/adminpage" component={adminpage}/>
      </Router>  
    );
  }
}
function getCookie(name) {
	  var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
	    var result = regexp.exec(document.cookie);
	      return (result === null) ? null : result[1];
}
class adminpage extends Component 
{      
	constructor(props)
	{
		super(props);
		/*this.state=[{
			username:null,
		        is_active:false,
		        is_staff:false,
		}];*/
		this.getusers();
	}
	getusers()
	{
var myData={
sessionid:getCookie('sessionid')
};
		fetch('http://127.0.0.1:8000/steam/adminpageapi/',
{
    method: "post",
    credentials: "same-origin",
    headers: {
        "X-CSRFToken": getCookie("csrftoken"),
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(myData)
}
).then(function(response){
	return response.json();
	}).then(function(data){
	/*this.setState(data);*/
	console.log(data);
	})
	}
	render()
	{
		return(
		<div>welcome to admin page</div>);
	}
}
export default App;

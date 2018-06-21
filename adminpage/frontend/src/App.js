import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import './adminpage.css';

class App extends Component {
  render() {
    return ( 
      <Router>
     <div>
      <Route exact path="/adminpage" component={adminpage}/>
      <Route exact path="/becomehost" component={becomehost}/>
     </div> 
     </Router>  
    );
  }
}



function getCookie(name) 
{
	  var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
	  var result = regexp.exec(document.cookie);
	  return (result === null) ? null : result[1];
}



class adminpage extends Component 
{      
	constructor(props)
	{
		super(props);
		this.state={
			users:[],
		};
		this.getusers=this.getusers.bind(this);
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
                   ).then(response => response.json() )
		    .then(json => { 
			            this.setState({users:json});
		                  });
	}
        
       deleteuser(uname,e)
       {
	       e.preventDefault();
	       alert(uname);
               var myData={
                         uname:uname
                        };

              fetch('http://127.0.0.1:8000/steam/deleteuserapi/',
                             {
                                   method: "post",
                                   credentials: "same-origin",
                                   headers: {
                                                 "X-CSRFToken": getCookie("csrftoken"),
                                                 "Content-Type": "application/json"
                                            },
                                   body: JSON.stringify(myData)
                              }
                   ).then(
	                   response => { this.getusers() ;}
			 )
	            .then( json => {} );  

       }

       approveuser(uname,e)
       {
               e.preventDefault();
               alert(uname);
               var myData={
                         uname:uname
                        };

             fetch('http://127.0.0.1:8000/steam/approveuserapi/',
                             {
                                   method: "post",
                                   credentials: "same-origin",
                                   headers: {
                                                 "X-CSRFToken": getCookie("csrftoken"),
                                                 "Content-Type": "application/json"
                                            },
                                   body: JSON.stringify(myData)
                              }
                   ).then(response => {this.getusers();})
		    .then(json => {});  

       }


	render()
	{
		var list1=(Object.values(this.state.users)).map(
				(varia) => {
				if(varia['is_active']==false)	
				return <button onClick={(e)=>this.approveuser(varia['username'],e)}> {varia['username']}</button>;
				}
					);
	       var list2=(Object.values(this.state.users)).map(
                                (varia)=>{
                                if(varia['is_active']!=false)   
                                return <button onClick={(e)=>this.deleteuser(varia['username'],e)}> {varia['username']}</button>;
                                }
                                        );	
		return(
		<p>
		<div>Welcome to admin page</div>
		<br/>
		<div id="sdiv">
		<div>
		<p>Approve these users</p>
		{list1}
		</div>
		<br/>
		<div>
		<p>Delete these approved users </p>
                {list2}
		</div>
		</div>
		</p>
		);
	}


}


class becomehost extends Component
{
    constructor(props)
    {
	    super(props);
	    var tthis=this;
	    window.onbeforeunload=function(e){tthis.componentWillUnmount();};
            window.onunload=function(e){tthis.componentWillUnmount();};

    }
    componentDidMount()
    {
     var myData={
                         sessionid:getCookie('sessionid')
                        };
             
     fetch('http://127.0.0.1:8000/steam/makehost/',
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
                   );
 
    }
   componentWillUnmount()
    {
     var myData={        
                         sessionid:getCookie('sessionid')
                        };
             
     fetch('http://127.0.0.1:8000/steam/removehost/',
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
                   );

    }
 
    render()
    {
	    return (
			    <p>
			    you are a host now . if you close this window you will no longer remain a host .
			    </p>
			    );
    }
}

export default App;

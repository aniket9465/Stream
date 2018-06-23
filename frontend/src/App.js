import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import './adminpage.css';
import Websocket from 'react-websocket';
class App extends Component {
  render() {
    return ( 
      <Router>
     <p>
      <Route exact path="/adminpage" component={adminpage}/>
      <Route exact path="/becomehost" component={becomehost}/>
      <Route exact path="/onlinehosts" component={onlinehosts} />
     </p> 
     </Router>  
    );
  }
}




function getCookie(c_name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
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
	     fetch('http://127.0.0.1:8000/stream/adminpageapi/',
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

              fetch('http://127.0.0.1:8000/stream/deleteuserapi/',
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

             fetch('http://127.0.0.1:8000/stream/approveuserapi/',
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
	    var a=getCookie('sessionid');
	    console.log(a);
	    console.log("whay");
     var myData={
                         sessionid:getCookie("sessionid")
                        };
            console.log(myData); 
     fetch('http://127.0.0.1:8000/stream/makehost/',
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
     fetch('http://127.0.0.1:8000/stream/removehost/',
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

class onlinehosts extends Component
{
        constructor(props)
        {
                super(props);
                this.state={
                        users:[],
                };
                this.getusers=this.getusers.bind(this);
		this.handledata=this.handledata.bind(this);
                this.getusers();
        }



        getusers()
        {
             var myData={
                         sessionid:getCookie('sessionid')
                        };
             fetch('http://127.0.0.1:8000/stream/onlineusersapi/',
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
                    .then(json => { console.log(json);
                                    this.setState({users:json});
                                  });
        }
	
	handledata(data)
	{
                this.getusers();
	}
	render()
	{
                var list1=(Object.values(this.state.users)).map(
                                (varia) => {
                                return <button onClick={(e)=>this.approveuser(varia['uname'],e)}> {varia['uname']}</button>;
                                });
		var hdiv={ display:"none" };
		return (
				
				<p>
				<div style={hdiv}>
			        <Websocket url="ws://127.0.0.1:8000/stream/onlinehosts/" 
				onMessage={(data)=> {this.handledata(data)}}/>
				</div>
				{list1}
				</p>
				);
	}
}
export default App;

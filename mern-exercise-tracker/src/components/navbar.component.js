import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  constructor(props){
    super(props);

    this.state = {
      user:JSON.parse(localStorage.getItem("user"))
    };

  }
  componentDidMount(){
    window.addEventListener("storage",this.syncUser);
  }

  syncUser = ()=>{
    this.setState({user:JSON.parse(localStorage.getItem("user"))});
  }
  handleLogout = ()=>{
    // remove user item
    localStorage.removeItem("user");

    // setting the state of the user:
    this.setState({user:null});

    // refresh the window:
    window.location = '/';

  }

  render() {
    const {user} = this.state;
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand"> XTracker </Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
        
          {!user &&(
            <>
          <li className="navbar-item">
            <Link to="/login-user" className="nav-link">Log-In User</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Create User</Link>
          </li>
          </>
           )}
           {user &&(
            <>
            <li className="navbar-item">
            <button onClick={this.handleLogout} className="nav-link">Log-out</button>
          </li>
           <li className="navbar-item">
          <Link to="/Excercises" className="nav-link">Exercises</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Exercise Log</Link>
          </li>
            </>
           )}
        </ul>
        </div>
      </nav>
    );
  }
}
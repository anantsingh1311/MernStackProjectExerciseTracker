import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props){
        super(props);


//Binding "this" keyword to their respective methods to perform their action
//this -> represents the class name "CreateExercise"
        this.OnChangeUsername = this.OnChangeUsername.bind(this);
        this.OnChangePassword = this.OnChangePassword.bind(this);
        this.OnChangeCheckPassword = this.OnChangeCheckPassword.bind(this);
        this.OnSubmit = this.OnSubmit.bind(this);
        

        //The state is used to declare variables in react
        this.state = {
            username: '',
            password: '',
            checkPassword:''
        }
    }

    OnChangeUsername(e){
            this.setState({
                username: e.target.value
            })

        }
    OnChangePassword(e){
        this.setState({
            password: e.target.value
        })
    }
    OnChangeCheckPassword(e){
        this.setState({
            checkPassword: e.target.value
        })
    }

OnSubmit(e){
    e.preventDefault();

    if (this.state.password !== this.state.checkPassword) {
        alert("The passwords don't match, please re-enter your password");
        return;
    }

    console.log("SUBMIT TRIGGERED");

    const user = {
        username: this.state.username,
        password: this.state.password
    };

   axios.post('http://localhost:5000/user/add', user)
  .then(res => console.log(res.data))
  .catch(err => {
      if (err.response) {
          console.log("BACKEND ERROR:", err.response.data);
      } else {
          console.log(err);
      }
  });

    this.setState({
        username: '',
        password: '',
        checkPassword: ''
    });
}






render(){
    return(
        
        <div>
            <h3>Create New User</h3>
            <form onSubmit={this.OnSubmit}>
                <div className='form-group'>
                    <label>User Name</label>
                    <input type='text'
                    required
                    className='form-control'
                    value={this.state.username}
                    onChange={this.OnChangeUsername}/>
                     <label>Please Enter your password</label>
                    <input type='password'
                    required
                    minLength={6}
                    className='form-control'
                    value={this.state.password}
                    onChange={this.OnChangePassword}/>
                     <label>Please Re-Enter your Password</label>
                    <input type='password'
                    required
                    minLength={6}
                    className='form-control'
                    value={this.state.checkPassword}
                    onChange={this.OnChangeCheckPassword}/>
                </div>
                <div className='form-group'>
                    <input type='submit' value='Create User' className='btn btn-primary'/>
                </div>



            </form>

        </div>
    )
}
}
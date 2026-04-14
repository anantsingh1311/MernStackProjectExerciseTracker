import React, { Component } from 'react';
import axios from "axios";

export default class LoginUser extends Component {

    constructor(props){
        super(props);
         this.OnUserNameChanged = this.OnUserNameChanged.bind(this);
        this.OnChangePassword = this.OnChangePassword.bind(this);
        this.OnSubmit = this.OnSubmit.bind(this);

        this.state={
            username:'',
            password:''

        }
    }

    OnChangePassword(e){
        this.setState({
            password:e.target.value
        });
    }
    OnUserNameChanged(e){
    this.setState({
        username: e.target.value
    });
    }

    OnSubmit(e){
        e.preventDefault();  
        const logInUser = {
            username: this.state.username,
            password: this.state.password
        };

        axios.post("http://localhost:5000/api/login",logInUser)
          .then(res => {
            console.log(res.data);

            // success
            alert("Login successful");

            this.setState({
                username: "",
                password: ""
            });

            //store your logged-in user after login:-
            localStorage.setItem("user",JSON.stringify(res.data));
            console.log(res.data);
            window.location = "/create";
        })
        .catch(err => {
            console.error(err);
            alert("Invalid username or password");
            // alert(this.username.state,this.password.state)
        });
    }

    
    
    render() {
         return (
        <div className='Log-in-Form'>
            <h1>Log-in Page</h1>
            <form onSubmit={this.OnSubmit}>
                <div className='form-group'>
                    <h3><b>Please Enter your username below:</b></h3>
                    <input type='text' required className='form-control' value={this.state.username} onChange={this.OnUserNameChanged}/>
                    <br/>
                    <h3><b>Please Enter your Password below:</b></h3>
                    <input type='password' required className='form-control'value={this.state.password} onChange={this.OnChangePassword}/>
                </div>
                <div>
                    <input type='submit' value='log-in' className='btn-btn primary'/>
                </div>
            </form>

        </div>
        );
    
    }
}
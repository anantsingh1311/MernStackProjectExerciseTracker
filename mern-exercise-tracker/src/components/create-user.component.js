import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props){
        super(props);


//Binding "this" keyword to their respective methods to perform their action
//this -> represents the class name "CreateExercise"
        this.OnChangeUsername = this.OnChangeUsername.bind(this);
        this.OnSubmit = this.OnSubmit.bind(this);

        //The state is used to declare variables in react
        this.state = {
            username: '',
        }
    }

    OnChangeUsername(e){
            this.setState({
                username: e.target.value
            })

        }

        OnSubmit(e){
            //To prevent default form submission
            e.preventDefault();
            console.log("SUBMIT TRIGGERED");
            const user = {
                username: this.state.username

            }

            // console.log(user);

            axios.post('http://localhost:5000/user/add', user)
            .then(res => console.log(res.data));

            // // To reload the page after the onSubmit Button is clicked
            // window.location = "/"
            this.setState({
                username:''
            })

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
                </div>
                <div className='form-group'>
                    <input type='submit' value='Create User' className='btn btn-primary'/>
                </div>



            </form>

        </div>
    )
}
}
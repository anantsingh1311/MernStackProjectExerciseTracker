import React, { Component } from 'react';

import axios from 'axios';

//For dates
// npm install react-datepicker for date package
//Then import it like down below, with it's css styling
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

export default class EditExercise extends Component{

    constructor(props){
        super(props);


//Binding "this" keyword to their respective methods to perform their action
//this -> represents the class name "CreateExercise"
        this.OnChangeUsername = this.OnChangeUsername.bind(this);
        this.OnChangeDescription = this.OnChangeDescription.bind(this);
        this.OnChangeDate = this.OnChangeDate.bind(this);
        this.OnChangeDuration = this.OnChangeDuration.bind(this);
        this.OnSubmit = this.OnSubmit.bind(this);

        //The state is used to declare variables in react
        this.state = {
            username: '',
            description: '',
            duration:0,
            date: new Date(),
            users:[]
        }
    }

    //Declaring a react lifecycle method which would basically get the data from our MongoDB
    componentDidMount(){
        // for now hardcoding data for testing purposes
        // this.setState({
        //     users :["test1"],
        //     username:"test User"
        // })
        //creating an axios get request and then using the arrow function to get the user name in a drop down list in our form:
          axios.get('http://localhost:5000/user/').then(res=>{

               if(res.data.length > 0){

                    this.setState({

                        users :res.data.map(user=>user.username),
                         username:res.data[0].username
        })
      }
        })
    }

    // Creating methods to handle state changes
       OnChangeUsername(e){
            this.setState({
                username: e.target.value
            })

        }
        OnChangeDescription(e){
            this.setState({
                description:e.target.value
            })
        }
        OnChangeDuration(e){
            this.setState({
                duration: e.target.value
            })
        }
        OnChangeDate(date){
            this.setState({
                date: date

            }
            )
        }

        //On submit Method, meant to handle submission of data to the MongoDB
        OnSubmit(e){
            //To prevent default form submission
            e.preventDefault();
            console.log("SUBMIT TRIGGERED");
            const exercise = {
                username: this.state.username,
                description: this.state.description,
                duration: this.state.duration,
                date: this.state.date

            }

            // console.log(exercise);

            //An axios post request made to post exc data to the backend MongoDB
            axios.post('http://localhost:5000/exercise/add',exercise).then(res=>console.log("Exercise Created!"))


            // To reload the page after the onSubmit Button is clicked
            window.location = "/"

        }




    render(){
        return(
    <form onSubmit={this.OnSubmit}>
  <div className="form-group">
    <label>Username:</label>
    <select
      required
      className="form-control"
      value={this.state.username}
      onChange={this.OnChangeUsername}
    >
      {this.state.users.map(user => (
        <option key={user} value={user}>
          {user}
        </option>
      ))}
    </select>
  </div>

  <div className="form-group">
    <label>Description:</label>
    <input
      type="text"
      required
      className="form-control"
      value={this.state.description}
      onChange={this.OnChangeDescription}
    />
  </div>

  <div className="form-group">
    <label>Duration (in minutes):</label>
    <input
      type="number"
      className="form-control"
      value={this.state.duration}
      onChange={this.OnChangeDuration}
    />
  </div>

  <div className="form-group">
    <label>Date:</label>
    <DatePicker
      selected={this.state.date}
      onChange={this.OnChangeDate}
    />
  </div>

  <div className="form-group">
    <input
      type="submit"
      value="Create Exercise Log"
      className="btn btn-primary"
    />
  </div>
</form>

        )
    }
}
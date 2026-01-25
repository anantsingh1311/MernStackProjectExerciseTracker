import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Row component
const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link className = 'btn btn-primary' to={`/edit/${props.exercise._id}`}>edit</Link>{" "}
      |{" "}
      <button
        className="btn btn-secondary"
        onClick={() => props.deleteExercise(props.exercise._id)}
      >
        delete
      </button>
    </td>
  </tr>
);

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = {
      exercises: [],
    };
  }

  // ✅ FETCH exercises when component loads
  componentDidMount() {
    axios
      .get("http://localhost:5000/exercise/")
      .then((res) => {
        this.setState({ exercises: res.data });
      })
      .catch((err) => console.log(err));
  }

  // ✅ DELETE exercise
  deleteExercise(id) {
    axios
      .delete(`http://localhost:5000/exercise/${id}`)
      .then((res) => console.log(res.data));

    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id),
    });
  }

  // ✅ Render exercise rows
  exerciseList() {
    return this.state.exercises.map((currentExercise) => (
      <Exercise
        exercise={currentExercise}
        deleteExercise={this.deleteExercise}
        key={currentExercise._id}
      />
    ));
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}

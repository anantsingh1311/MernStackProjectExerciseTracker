// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import ExercisesList from "./components/excercises-list.component";
import EditExercise from "./components/edit-excercises-list.component";
import CreateExercise from "./components/create-excercises-list.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className='container'>

    <Navbar />
    <br/>
    <Routes>
    <Route path="/" exact Component={ExercisesList}/>
    <Route path="/edit/:id" exact Component={EditExercise}/>
    <Route path="/create" exact Component={CreateExercise}/>
    <Route path="/user" exact Component={CreateUser}/>
    </Routes>
    </div>
    </Router>
  );
}

export default App;

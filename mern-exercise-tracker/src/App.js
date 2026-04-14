// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import ExercisesList from "./components/excercises-list.component";
import Home from "./components/home.component"
import EditExercise from "./components/edit-excercises-list.component";
import CreateExercise from "./components/create-excercises-list.component";
import CreateUser from "./components/create-user.component";
import LoginUser from "./components/login-user.component";

function App() {
  return (
    <Router>
      <div className='container'>

    <Navbar />
    <br/>
    <Routes>
  <Route path="/" element={<Home/>} />
  <Route path="/Excercises" element={<ExercisesList/>} />
  <Route path="/login-user" element={<LoginUser />} />
  <Route path="/edit/:id" element={<EditExercise />} />
  <Route path="/create" element={<CreateExercise />} />
  <Route path="/user" element={<CreateUser />} />
</Routes>

    </div>
    </Router>
  );
}

export default App;

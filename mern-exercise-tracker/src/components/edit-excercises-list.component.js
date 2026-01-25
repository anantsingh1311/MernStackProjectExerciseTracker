import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { useParams, useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

export default function EditExercise() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  // Load exercise + users
  useEffect(() => {
    axios
      .get(`http://localhost:5000/exercise/${id}`)
      .then((res) => {
        setUsername(res.data.username);
        setDescription(res.data.description);
        setDuration(res.data.duration);
        setDate(new Date(res.data.date));
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:5000/user/")
      .then((res) => {
        setUsers(res.data.map((u) => u.username));
      })
      .catch((err) => console.log(err));
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username,
      description,
      duration,
      date,
    };

    axios
      .post(`http://localhost:5000/exercise/update/${id}`, exercise)
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h3>Edit Exercise Log</h3>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <select
            required
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          >
            {users.map((user) => (
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Duration (minutes):</label>
          <input
            type="number"
            className="form-control"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Date:</label>
          <DatePicker selected={date} onChange={(d) => setDate(d)} />
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

import { useState } from "react";
import axios from "axios";

function Dashboard() {
  const [score, setScore] = useState("");
  const [scores, setScores] = useState([]);
  const [draw, setDraw] = useState([]);

  const [charities, setCharities] = useState([]);
  const [selectedCharity, setSelectedCharity] = useState("");
  const [myCharity, setMyCharity] = useState("");

  const email = localStorage.getItem("email");

  // ------------------ SCORE ------------------
  const addScore = async () => {
    try {
      const res = await axios.post("http://localhost:5000/add-score", {
        email,
        score,
      });
      setScores(res.data.scores);
      setScore("");
    } catch (error) {
      alert("Error adding score");
    }
  };

  const getScores = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/scores/${email}`
      );
      setScores(res.data);
    } catch (error) {
      alert("Error fetching scores");
    }
  };

  // ------------------ DRAW ------------------
  const runDraw = async () => {
    try {
      const res = await axios.post("http://localhost:5000/draw");
      setDraw(res.data.winning_numbers);
    } catch (error) {
      alert("Error running draw");
    }
  };

  // ------------------ CHARITY ------------------
  const loadCharities = async () => {
    try {
      const res = await axios.get("http://localhost:5000/charities");
      setCharities(res.data);
    } catch (error) {
      alert("Error loading charities");
    }
  };

  const chooseCharity = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/select-charity",
        {
          email,
          charity: selectedCharity,
        }
      );

      setMyCharity(res.data.charity);
      alert(res.data.message);
    } catch (error) {
      alert("Error selecting charity");
    }
  };

  const getMyCharity = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/get-charity/${email}`
      );
      setMyCharity(res.data.charity);
    } catch (error) {
      alert("Error fetching charity");
    }
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <p style={{ color: "gray" }}>Logged in as: {email}</p>

      {/* -------- SCORE -------- */}
      <h3>Add Score</h3>
      <input
        type="number"
        placeholder="Enter Score (1-45)"
        value={score}
        onChange={(e) => setScore(e.target.value)}
      />

      <br /><br />

      <button onClick={addScore}>Add Score</button>
      <button onClick={getScores}>View Scores</button>

      <h3>Your Last 5 Scores</h3>
      <ul>
        {scores.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>

      <hr />

      {/* -------- DRAW -------- */}
      <h3>Monthly Draw</h3>
      <button onClick={runDraw}>Run Draw</button>

      <ul>
        {draw.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>

      <hr />

      {/* -------- CHARITY -------- */}
      <h3>Charity Selection</h3>

      <button onClick={loadCharities}>Load Charities</button>

      <br /><br />

      <select onChange={(e) => setSelectedCharity(e.target.value)}>
        <option>Select Charity</option>
        {charities.map((c, i) => (
          <option key={i}>{c}</option>
        ))}
      </select>

      <br /><br />

      <button onClick={chooseCharity}>Select Charity</button>
      <button onClick={getMyCharity}>View My Charity</button>

      <p>
        <b>Selected Charity:</b> {myCharity}
      </p>
    </div>
  );
}

export default Dashboard;
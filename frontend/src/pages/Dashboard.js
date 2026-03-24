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

  const BASE_URL = "https://golf-backend-u9kw.onrender.com";

  // -------- SCORE --------
  const addScore = async () => {
    const res = await axios.post(`${BASE_URL}/add-score`, {
      email,
      score,
    });
    setScores(res.data.scores);
    setScore("");
  };

  const getScores = async () => {
    const res = await axios.get(`${BASE_URL}/scores/${email}`);
    setScores(res.data);
  };

  // -------- DRAW --------
  const runDraw = async () => {
    const res = await axios.post(`${BASE_URL}/draw`);
    setDraw(res.data.winning_numbers);
  };

  // -------- CHARITY --------
  const loadCharities = async () => {
    const res = await axios.get(`${BASE_URL}/charities`);
    setCharities(res.data);
  };

  const chooseCharity = async () => {
    const res = await axios.post(`${BASE_URL}/select-charity`, {
      email,
      charity: selectedCharity,
    });

    setMyCharity(res.data.charity);
    alert(res.data.message);
  };

  const getMyCharity = async () => {
    const res = await axios.get(`${BASE_URL}/get-charity/${email}`);
    setMyCharity(res.data.charity);
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <p>Subscription Status: Active</p>
      <p style={{ color: "gray" }}>Logged in as: {email}</p>

      {/* SCORE */}
      <h3>Add Score</h3>
      <input
        type="number"
        placeholder="Enter Score"
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

      {/* DRAW */}
      <h3>Monthly Draw</h3>
      <button onClick={runDraw}>Run Draw</button>

      <ul>
        {draw.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>

      <hr />

      {/* CHARITY */}
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
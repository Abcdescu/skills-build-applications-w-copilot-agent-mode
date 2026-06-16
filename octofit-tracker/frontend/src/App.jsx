import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Workouts from './components/Workouts';
import Leaderboard from './components/Leaderboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            🐙 OctoFit Tracker
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">
                  Teams
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/activities">
                  Activities
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">
                  Workouts
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1 className="mb-4">🐙 OctoFit Tracker</h1>
          <p className="lead">
            Welcome to the OctoFit Tracker multi-tier application!
          </p>
          <p>
            Use the navigation menu above to explore:
          </p>
          <ul>
            <li><strong>Users</strong> - View registered users</li>
            <li><strong>Teams</strong> - Browse team information</li>
            <li><strong>Activities</strong> - Track activities and workouts</li>
            <li><strong>Workouts</strong> - Explore structured workout plans</li>
            <li><strong>Leaderboard</strong> - See competitive rankings</li>
          </ul>
          <div className="alert alert-info mt-4">
            <strong>Configuration:</strong> This app uses Vite environment variables.
            To enable Codespaces support, create a <code>.env.local</code> file with:
            <pre className="mt-2">VITE_CODESPACE_NAME=your-codespace-name</pre>
            Without this variable, the app will use <code>http://localhost:8000/api</code>.
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

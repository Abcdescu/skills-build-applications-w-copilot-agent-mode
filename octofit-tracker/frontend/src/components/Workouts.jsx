import { useState, useEffect } from 'react';
import { apiGet, extractDataFromResponse } from '../utils/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const response = await apiGet('/api/workouts/');
        const data = extractDataFromResponse(response, 'workouts');
        setWorkouts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) return <div className="container mt-5"><p>Loading workouts...</p></div>;
  if (error) return <div className="container mt-5"><p className="text-danger">Error: {error}</p></div>;

  return (
    <div className="container mt-5">
      <h2>Workouts</h2>
      {workouts.length === 0 ? (
        <p>No workouts found.</p>
      ) : (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout._id} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{workout.name}</h5>
                  <p className="card-text">User: {workout.user?.name || 'Unknown'}</p>
                  <p className="card-text">Exercises: {workout.exercises?.length || 0}</p>
                  {workout.exercises && workout.exercises.length > 0 && (
                    <ul className="small">
                      {workout.exercises.map((ex, idx) => (
                        <li key={idx}>
                          {ex.name}
                          {ex.sets && ` - ${ex.sets} sets`}
                          {ex.reps && ` x ${ex.reps} reps`}
                          {ex.durationSeconds && ` - ${ex.durationSeconds}s`}
                        </li>
                      ))}
                    </ul>
                  )}
                  <small className="text-muted">Date: {new Date(workout.date).toLocaleDateString()}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

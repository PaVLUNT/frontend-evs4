import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [health, setHealth] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/health`)
      .then((res) => res.json())
      .then((data) => setHealth(data))
      .catch(() => setHealth({ status: "error" }));

    fetch(`${API_URL}/api/mysql/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => setUsers([]));
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Evaluación Sumativa 4 — Frontend</h1>

      <h2>Estado del backend</h2>
      {health ? (
        <pre>{JSON.stringify(health, null, 2)}</pre>
      ) : (
        <p>Cargando...</p>
      )}

      <h2>Usuarios (MySQL)</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.username} - {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

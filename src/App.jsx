import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [health, setHealth] = useState(null);
  const [users, setUsers] = useState([]);
  const [usersError, setUsersError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/health`)
      .then((res) => res.json())
      .then((data) => setHealth(data))
      .catch((err) => setHealth({ status: "error", detalle: err.message }));

    fetch(`${API_URL}/api/mysql/users`)
      .then((res) => res.json())
      .then((data) => {
        // Si la API devuelve un objeto (ej: {error: "..."}) en vez de un
        // arreglo, no truena: solo mostramos el error.
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          setUsersError(JSON.stringify(data));
        }
      })
      .catch((err) => setUsersError(err.message));
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem", color: "#eee" }}>
      <h1>Evaluación Sumativa 4 — Frontend</h1>

      <h2>Estado del backend</h2>
      {health ? (
        <pre>{JSON.stringify(health, null, 2)}</pre>
      ) : (
        <p>Cargando...</p>
      )}

      <h2>Usuarios (MySQL)</h2>
      {usersError && <p style={{ color: "salmon" }}>Error: {usersError}</p>}
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

import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export default function UsersAdmin() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api
      .get("/api/users", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setUsers(res.data))
      .catch(() => alert("Only admin can view users"));
  }, [token]);

  const handleDelete = async (id) => {
    await api.delete(`/api/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(users.filter((u) => u._id !== id));
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Users (Admin)</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((u) => (
            <li key={u._id}>
              {u.name} — {u.email} ({u.role || "user"})
              <button onClick={() => handleDelete(u._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

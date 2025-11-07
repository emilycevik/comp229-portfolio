import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export default function ContactsAdmin() {
  const { token } = useAuth();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    api
      .get("/api/contact", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setContacts(res.data))
      .catch((err) => console.error("Error loading contacts:", err));
  }, [token]);

  const handleDelete = async (id) => {
    await api.delete(`/api/contact/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setContacts(contacts.filter((c) => c._id !== id));
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Contacts (Admin)</h2>
      {contacts.length === 0 ? (
        <p>No contact messages found.</p>
      ) : (
        <ul>
          {contacts.map((c) => (
            <li key={c._id}>
              <strong>{c.name}</strong> — {c.email}
              <br />
              {c.message}
              <button onClick={() => handleDelete(c._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

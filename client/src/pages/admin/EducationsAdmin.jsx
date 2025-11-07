import { useState, useEffect } from "react";
import { api } from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export default function EducationsAdmin() {
  const { token } = useAuth();
  const [educations, setEducations] = useState([]);
  const [form, setForm] = useState({
    title: "",
    institution: "",
    year: "",
  });

  useEffect(() => {
    api.get("/api/qualification").then((res) => setEducations(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/api/qualification", form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { data } = await api.get("/api/qualification");
    setEducations(data);
    setForm({ title: "", institution: "", year: "" });
  };

  const handleDelete = async (id) => {
    await api.delete(`/api/qualification/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEducations(educations.filter((e) => e._id !== id));
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Educations (Admin)</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Institution"
          value={form.institution}
          onChange={(e) => setForm({ ...form, institution: e.target.value })}
        />
        <input
          placeholder="Year"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
        />
        <button type="submit">Add</button>
      </form>

      {educations.length === 0 ? (
        <p>No education records found.</p>
      ) : (
        <ul>
          {educations.map((e) => (
            <li key={e._id}>
              {e.title} — {e.institution} ({e.year})
              <button onClick={() => handleDelete(e._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

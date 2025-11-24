import { useEffect, useState } from "react";

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    console.log("Fetching projects...");

    // 🔥 Lazy-load axios only when the admin page opens
    import("../../api/axios").then(({ api }) => {
      api
        .get("/api/project")
        .then((res) => {
          console.log("Projects:", res.data);
          setProjects(res.data);
        })
        .catch((err) => console.error("Error loading projects:", err));
    });
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Projects (Admin)</h2>

      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <ul>
          {projects.map((p) => (
            <li key={p._id}>
              <strong>{p.title}</strong> – {p.description || p.summary}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

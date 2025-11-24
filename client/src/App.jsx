import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React, { Suspense } from "react";

// 🔥 Lazy-loaded pages (performance optimization)
const SignIn = React.lazy(() => import("./pages/SignIn"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const ProjectsAdmin = React.lazy(() =>
  import("./pages/admin/ProjectsAdmin")
);
const ContactsAdmin = React.lazy(() =>
  import("./pages/admin/ContactsAdmin")
);
const EducationsAdmin = React.lazy(() =>
  import("./pages/admin/EducationsAdmin")
);
const UsersAdmin = React.lazy(() => import("./pages/admin/UsersAdmin"));

import { useAuth } from "./context/AuthContext";

// Home Component
function Home() {
  return (
    <div style={{ padding: "1rem" }}>
      <h1>Welcome to the Portfolio Admin Dashboard</h1>
      <p>Select a page from the navigation above. This text was updated for CI/CD demo.</p>
    </div>
  );
}

export default function App() {
  const { signout } = useAuth();

  return (
    <BrowserRouter>
      <nav style={{ padding: "1rem", background: "#eee" }}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/signin">Sign In</Link> |{" "}
        <Link to="/signup">Sign Up</Link> |{" "}
        <Link to="/admin/projects">Projects</Link> |{" "}
        <Link to="/admin/educations">Educations</Link> |{" "}
        <Link to="/admin/contacts">Contacts</Link> |{" "}
        <Link to="/admin/users">Users</Link> |{" "}
        <button
          onClick={signout}
          style={{
            background: "#e74c3c",
            color: "#fff",
            border: "none",
            padding: "5px 10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </nav>

      {/* 🔥 Suspense loading fallback for lazy components */}
      <Suspense fallback={<div style={{ padding: "1rem" }}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin/projects" element={<ProjectsAdmin />} />
          <Route path="/admin/educations" element={<EducationsAdmin />} />
          <Route path="/admin/contacts" element={<ContactsAdmin />} />
          <Route path="/admin/users" element={<UsersAdmin />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProjectsAdmin from "./pages/admin/ProjectsAdmin";
import ContactsAdmin from "./pages/admin/ContactsAdmin";
import EducationsAdmin from "./pages/admin/EducationsAdmin";
import UsersAdmin from "./pages/admin/UsersAdmin";
import { useAuth } from "./context/AuthContext";

function Home() {
  return (
    <div style={{ padding: "1rem" }}>
      <h1>Welcome to the Portfolio Admin Dashboard</h1>
      <p>Select a page from the navigation above.</p>
    </div>
  );
}

export default function App() {
  const { signout } = useAuth(); // ✅ enables logout

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

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin/projects" element={<ProjectsAdmin />} />
        <Route path="/admin/educations" element={<EducationsAdmin />} />
        <Route path="/admin/contacts" element={<ContactsAdmin />} />
        <Route path="/admin/users" element={<UsersAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

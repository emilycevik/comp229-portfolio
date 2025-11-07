import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function SignUp() {
  const { signup } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(form.name, form.email, form.password);
      setMsg(`Registration successful! Welcome, ${res.user.name || "User"}!`);
    } catch (err) {
      console.error(err);
      setMsg("Signup failed. Please try again.");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <br />
        <button type="submit">Sign Up</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}

import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const { signin } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signin(form.email, form.password);
      setMsg(`Welcome back, ${res.user.name || "User"}!`);
    } catch (err) {
      console.error(err);
      setMsg("Login failed. Check credentials.");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Sign In</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}

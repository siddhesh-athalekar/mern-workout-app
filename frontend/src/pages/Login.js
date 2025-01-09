import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isLoading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('entries = ', email, password);
    await login(email, password);
  };

  return (
    <div>
      <h3>Log In</h3>
      <form className="login" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>Log In</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Login;

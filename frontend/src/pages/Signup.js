import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isLoading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('entries = ', email, password);
    await signup(email, password);
  };

  return (
    <div>
      <h3>Signup</h3>
      <form className="signup" onSubmit={handleSubmit}>
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
        <button type="submit" disabled={isLoading}>Signup</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Signup;

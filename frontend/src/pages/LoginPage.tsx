import { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.access_token);
      setMessage("Logged in successfully.");
    } catch (error) {
      setMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-sm rounded-sm border border-gray-300 bg-white px-8 py-10 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-semibold">InstaClone</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-gray-500" htmlFor="username">
              Username
            </label>
            <input
              className="rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:border-gray-400 focus:outline-none"
              id="username"
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Username"
              required
              type="text"
              value={username}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-gray-500" htmlFor="password">
              Password
            </label>
            <input
              className="rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:border-gray-400 focus:outline-none"
              id="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              required
              type="password"
              value={password}
            />
          </div>
          <button
            className="w-full rounded-sm bg-[#0095f6] py-2 text-sm font-semibold text-white hover:bg-[#1877f2]"
            type="submit"
          >
            Log in
          </button>
        </form>
        {message && <p className="mt-4 text-center text-xs text-gray-500">{message}</p>}
      </div>
    </div>
  );
};

export default LoginPage;

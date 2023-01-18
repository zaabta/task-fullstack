import { useState } from "react";
import Box from "../../components/Box/Box";

const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: ""
  });

  const signup = async (data) => {
    const res = await fetch("http://localhost:3000/api/v1/users", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const json = await res.json();
    console.log(json);
  };

  return (
    <Box>
      <h1>Sign up</h1>
      <div
        className="input-btn"
        style={{
          margin: "10px 0"
        }}
      >
        <input
          type="text"
          id="todo-input"
          placeholder="Enter you username here..."
          value={userData.username}
          onChange={(e) => setUserData({
            ...userData,
            username: e.target.value
          })}
        />
        <input
          style={{ cursor: "auto" }}
          type="button"
          value="username"
          id="todo-btn"
        />
      </div>
      <div
        className="input-btn"
        style={{
          margin: "10px 0"
        }}
      >
        <input
          type="email"
          id="todo-input"
          placeholder="Enter you email here..."
          value={userData.email}
          onChange={(e) => setUserData({
            ...userData,
            email: e.target.value
          })}
        />
        <input
          style={{ cursor: "auto" }}
          type="button"
          value="email"
          id="todo-btn"
        />
      </div>
      <div
        className="input-btn"
        style={{
          margin: "10px 0"
        }}
      >
        <input
          type="password"
          id="todo-input"
          placeholder="Enter you password here..."
          value={userData.password}
          onChange={(e) => setUserData({
            ...userData,
            password: e.target.value
          })}
        />
        <input
          style={{ cursor: "auto" }}
          type="button"
          value="password"
          id="todo-btn"
        />
      </div>
      <div
        className="input-btn"
        style={{
          margin: "10px 0",
          height: "40px"
        }}
      >
        <input
          type="password"
          id="todo-input"
          placeholder="Enter you passwordConfirmation here..."
          value={userData.passwordConfirmation}
          onChange={(e) => setUserData({
            ...userData,
            passwordConfirmation: e.target.value
          })}
        />
        <input
          style={{
            cursor: "auto"
          }}
          type="button"
          value="password Confirmation"
          id="todo-btn"
        />
      </div>
      <div
        className="input-btn"
        style={{
          margin: "10px 0"
        }}
      >
        <input
          style={{
            cursor: "pointer",
            margin: "0 auto"
          }}
          type="button"
          value="register"
          id="todo-btn"
          onClick={()=> signup(userData)}
        />
      </div>
    </Box>
  );
};

export default Register;

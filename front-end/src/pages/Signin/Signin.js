import { useState } from "react";
import Box from "../../components/Box/Box";
import { useNavigate } from "react-router-dom";

const Signin = () => {
    const navigate = useNavigate()
  const [userData, setUserData] = useState({
    account: "",
    password: "",
  });
  const signup = async (data) => {
    const res = await fetch("http://localhost:3000/api/v1/users/login", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const json = await res.json();
    window.alert(json.messages)
    if(json.success){
        localStorage.setItem('user', JSON.stringify(json.data.user))
        localStorage.setItem('token', json.data.token)
        navigate("/home")
    }
    setUserData({
        account: "",
        password: "",
      })
  };

  return (
    <Box>
      <h1>Sign in</h1>
      <div
        className="input-btn"
        style={{
          margin: "10px 0"
        }}
      >
        <input
          type="email"
          id="todo-input"
          placeholder="Enter your username or email here..."
          value={userData.account}
          onChange={(e) => setUserData({
            ...userData,
            account: e.target.value 
          })}
        />
        <input
          style={{ cursor: "auto" }}
          type="button"
          value="account"
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
          margin: "10px 0"
        }}
      >
        <input
          style={{
            cursor: "pointer",
            margin: "0 auto"
          }}
          type="button"
          value="Sign in"
          id="todo-btn"
          onClick={()=> signup(userData)}
        />
      </div>
    </Box>
  );
};

export default Signin;

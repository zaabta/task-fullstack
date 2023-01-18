import { useState, useEffect, useContext } from "react";
import TodoList from "../../components/TodoList/TodoList";
import Box from "../../components/Box/Box";
import { DataCtx } from "../../context/Tasks";

const Home = () => {
  const [input, setInput] = useState({
    content: ""
  });

  const { notes, addTasks, addTask } = useContext(DataCtx)
  

  const getMyTasks = async () => {
    const res = await fetch("http://localhost:3000/api/v1/todoes", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || null}`
      }
    });
    const json = await res.json()
    if(json.success){
        addTasks(json.data)
    }
  };

  const createTask = async (data) => {
    const res = await fetch("http://localhost:3000/api/v1/todoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") || null}`
      },
      body: JSON.stringify(data)
    });
    const json = await res.json()
    alert(json.messages)
    if(json.success){
        addTask(json.data)
    }
  };

  useEffect(() => {
    getMyTasks();
  }, []);


  return (
    <Box>
      <h1 className="header">what's the plan for today ?</h1>
      <div className="input-btn">
        <input
          type="text"
          id="todo-input"
          placeholder="Enter you todo item here..."
          onChange={(e) => setInput({ content: e.target.value })}
          value={input.content}
        />
        <input
          type="button"
          value="add todo"
          id="todo-btn"
          onClick={() => createTask(input)}
        />
      </div>
      <TodoList items={notes} />
    </Box>
  );
};

export default Home;

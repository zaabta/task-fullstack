import "./Todo.css";
import React, { useContext } from "react";
import { DataCtx } from "../../context/Tasks";

const Todo = ({ id, text, color, isCompleted, handelonChekedFun }) => {

  const {removeTask} = useContext(DataCtx)
  const deleteTask = async(id) => {
    const res = await fetch(`http://localhost:3000/api/v1/todoes/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || null}`
      }
    }
    )
    const json = await res.json()
    alert(json.messages)
    if(json.success){
      removeTask(id)
    }
  }

  const isLight = (color) =>
    (color.red * 299 + color.green * 587 + color.blue * 114) / 1000 > 155;

  return (
    <div  key={id} className="todo"
    style={{
        backgroundColor: `rgb(${color.red},${color.green}, ${color.blue})`,
        color: `${isLight(color) ? "black" : "white"}`,
    }}
    >
      <p
      style={{
        textDecoration: `${isCompleted ? "line-through" : "none"}`
      }}
      >{text}</p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <span className="material-symbols-outlined" onClick={()=> handelonChekedFun(id)}>done</span>
        <span className="material-symbols-outlined" onClick={()=> deleteTask(id)}>delete</span>
      </div>
    </div>
  );
};

export default Todo;

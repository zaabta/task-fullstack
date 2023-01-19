import { createContext, useState } from "react";

export const DataCtx = createContext();

const TaskContext = ({ children }) => {
    const [notes, setNotes] = useState([])
  const addTask = (task) => {
    setNotes((prev) => [{...task, color:randomColor()} ,...prev])
  };
  const removeTask = (id) => {
    setNotes((prev) => prev.filter(note => note.id !== id))
  };


  const randomColor = () => {
    return {
      red: Math.random() * 256,
      green: Math.random() * 256,
      blue: Math.random() * 256
    };
  };

  const addTasks = (tasks) => {
    setNotes(tasks.map(task=>({...task, color: randomColor()})))
  }

  return (
    <DataCtx.Provider
      value={{
       notes,
       addTasks,
       addTask,
       removeTask,
       setNotes
      }}
    >
      {children}
    </DataCtx.Provider>
  );
};

export default  TaskContext;

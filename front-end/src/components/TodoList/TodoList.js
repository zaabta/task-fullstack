import "./TodoList.css";
import Todo from "../Todo/Todo";

const TodoList = ({items}) => {

  return (
    <div className="todo-list">
      {items?.length > 0 &&items?.map((item) => (
        <Todo 
        id={item.id} 
        text={item.content} 
        color={item.color}
        key={item.id}
        />
      ))}
    </div>
  );
};

export default TodoList;

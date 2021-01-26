import "./App.css";
import { useState } from "react";

function TodoList() {
  const [taskList, setTaskList] = useState([]);

  const handleInsert = (description) => {
    const newId =
      taskList.length === 0 ? 1 : taskList[taskList.length - 1].id + 1;

    const task = {
      id: newId,
      description,
    };

    setTaskList([...taskList, task]);
  };

  const handleRemove = (id) => {
    setTaskList(taskList.filter((task) => task.id !== id));
  };

  return (
    <div className="container">
      <Form insert={handleInsert} />
      <List list={taskList} remove={handleRemove} />
    </div>
  );
}

function Form({ insert }) {
  const [newTask, setNewTask] = useState("");

  const handleNewTask = (e) => {
    setNewTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    insert(newTask);

    setNewTask("");
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <input type="text" value={newTask} onChange={handleNewTask} required />
      <button>OK</button>
    </form>
  );
}

function List({ list, remove }) {
  return (
    <section>
      {list.length === 0 && "Você não tem tarefas"}
      {list.map((item) => (
        <Item task={item} remove={remove} />
      ))}
    </section>
  );
}

function Item({ task, remove }) {
  return (
    <article className="item">
      <p>
        {task.id} - {task.description}
      </p>
      <span onClick={() => remove(task.id)}>&times;</span>
    </article>
  );
}

function App() {
  return (
    <>
      <TodoList></TodoList>
    </>
  );
}

export default App;

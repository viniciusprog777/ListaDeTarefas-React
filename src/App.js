import "./App.css";
import { useState, useEffect } from "react";

function TodoList() {
  const [taskList, setTaskList] = useState([]);
  const [inputTask, setInputTask] = useState({ id: "", description: "" });

  window.addEventListener("beforeunload", () => {
    localStorage.setItem("lista", JSON.stringify(taskList));
  });

  useEffect(() => {
    setTaskList(JSON.parse(localStorage.getItem("lista")));
  }, []);

  const handleInsert = (description) => {
    const newId =
      taskList.length === 0 ? 1 : taskList[taskList.length - 1].id + 1;

    const task = {
      id: newId,
      description,
    };

    setTaskList([...taskList, task]);
  };

  const handleUpdate = (task) => {
    setInputTask(task);
  };
  const handleSaveEdit = () => {
    setTaskList(
      taskList.map((task) => (task.id === inputTask.id ? inputTask : task))
    );
  };

  const handleRemove = (id) => {
    setTaskList(taskList.filter((task) => task.id !== id));
  };

  return (
    <div className="container">
      <Form
        insert={handleInsert}
        newTask={inputTask}
        setNewTask={setInputTask}
        update={handleSaveEdit}
      />
      <List list={taskList} remove={handleRemove} update={handleUpdate} />
    </div>
  );
}

function Form({ insert, newTask, setNewTask, update }) {
  const handleNewTask = (e) => {
    setNewTask({ ...newTask, description: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newTask.id === "") {
      insert(newTask.description);
    } else {
      update();
    }

    setNewTask({ id: "", description: "" });
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTask.description}
        onChange={handleNewTask}
        required
      />
      <button>OK</button>
    </form>
  );
}

function List({ list, remove, update }) {
  return (
    <section>
      {list.length === 0 && "Você não tem tarefas"}
      {list.map((item, index) => (
        <Item
          key={item.id}
          task={item}
          index={index}
          remove={remove}
          update={update}
        />
      ))}
    </section>
  );
}

function Item({ task, remove, update, index }) {
  return (
    <article className="item">
      <p>
        {index + 1} - {task.description}
      </p>
      <span style={{ fontSize: 25 }} onClick={() => update(task)}>
        &#9998;
      </span>
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

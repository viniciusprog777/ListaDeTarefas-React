import "./App.css";
import { useState } from "react";

function Header(props) {
  return (
    <header className="header">
      <p>
        Hello World {props.name}, {props.children}
      </p>
      <button onClick={props.click}>Trocar usuário</button>
      <hr />
    </header>
  );
}

function Form() {
  const [nome, setNome] = useState("");

  const handleNome = (e) => {
    setNome(e.target.value);
  };

  return (
    <>
      <p>{nome}</p>
      <input
        type="text"
        placeholder="Digite seu nome"
        value={nome}
        onChange={handleNome}
      />
    </>
  );
}

function App() {
  const [user, setUser] = useState("Fulano");

  const handleClick = () => {
    if (user === "Fulano") setUser("Ciclano");
    else setUser("Fulano");
  };
  return (
    <div>
      <Header name={user} click={handleClick}>
        <p>Hello father</p>
      </Header>
      <p>My React App</p>
      <p>Nome do usuário: {user}</p>
      <Form />
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import './App.css';
import Connector from './signalr-connection'
function App() {
  const { newMessage, events } = Connector();
  const [message, setMessage] = useState("");
  const [list, setList] = useState([]);
  useEffect(() => {
    events((_, message) => setMessage(message));
    request();
  }, [message]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const request = () => {
    const url = "https://api-lukrey-dev.azurewebsites.net/api/Chat/chat/b4b95519-2e81-4e5a-9bfd-1e120983462e";
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setList(data?.data?.mensagens));

    console.log(list);
  }

  const handleSendMensage = () => {
    newMessage(message);
    request();
  }

  return (
    <div className="App">
      <span><b>Nova mensagem para o chat:</b></span>
      <br />
      <input style={{ color: "green" }} type="text" value={message} onChange={handleChange} />
      <br />
      <br />
      <button onClick={() => handleSendMensage()}>Enviar mensagem </button>
      <br />
      <br />
      <span><b>Mensagens da conversa:</b></span>
      <br />
      {list.map(function (applicant) {
        return (
          <p key={applicant["idResponsavel"]} style={{ color: "blue" }}>
            Responsavel: {applicant["idResponsavel"]} | Mensagem: {applicant["texto"]} | Data Hora: {applicant["dataCriacao"]}
          </p>
        )
      })}
    </div>
  );
}
export default App;
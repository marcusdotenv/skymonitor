import React,{useState} from 'react';
import './styles.css';

import api from './services/api'

const apikey = "ysjFGTI56CVlOMbiAIGm7434IcnjzZ9S";


function App() {
  const[city, setCity] = useState('');
  const[state, setState] = useState('');
  async function getData(e){
    e.preventDefault();
    const data = await api.get(`/locations/v1/cities/search?apikey=${apikey}&q=${city+` `+state}`);
    console.log(data);
  }

  return (
    <div className="full-container">
      <form onSubmit={getData}>
      <div className="application-section">
        <h1> Sky Monitor </h1>
        <h3>Digite sua Cidade</h3>
        <input placeholder="Cidade" value={city} onChange={e => setCity(e.target.value)}/> 
        <input placeholder="Cidade" value={state} onChange={e => setState(e.target.value)}/> 
        <button type="submit"> Vai! </button>
      </div>
      </form>
      <div className="application-section">
        <h1> Condições Climáticas </h1>
        <div className="display-data">
        <p>Umidade</p>
        <p> 40 </p>
        </div>
        <div className="display-data">
          <p>Temperatura</p>
          <p> 30 </p>
        </div>
      </div>
    </div>
  );
}

export default App;

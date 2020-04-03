import React,{useState} from 'react';
import './styles.css';
import api from './services/api'
const apikey = "ysjFGTI56CVlOMbiAIGm7434IcnjzZ9S";


function App() {
  const[city, setCity] = useState('');
  const[state, setState] = useState('');
  const[temperature, setTemperature] = useState('');

  async function getData(e){
    e.preventDefault();

    const response = await api.get(`/locations/v1/cities/search?apikey=${apikey}&q=${city+` `+state}`);
      try{
        const locationKey = response.data[0].Key;
        const locationConditions = await api.get(`/currentconditions/v1/${locationKey}?apikey=${apikey}`);
        console.log(locationConditions);
        const temperature = locationConditions.data[0].Temperature.Metric.Value;
        setTemperature(temperature);

      } catch(err){
        alert('Localização Inválida!')
      }
    }


  return (
    <div className="full-container">
      <form onSubmit={getData}>
      <div className="application-section">
        <h1> Sky Monitor </h1>
        <h3>Digite sua Cidade</h3>
        <input placeholder="Cidade" value={city} onChange={e => setCity(e.target.value)}/> 
        <input placeholder="Estado" value={state} onChange={e => setState(e.target.value)}/> 
        <button type="submit"> Vai! </button>
      </div>
      </form>
      <div className="application-section">
        <h1> Condições Climáticas </h1>
        <div className="display-data">
        <p>Temperatura</p>
        <p>{temperature}</p>
        <p> Condições </p>
        </div>
      </div>
    </div>
  );
}

export default App;

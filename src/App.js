import React,{useState, useEffect} from 'react';
import './styles.css';
import api from './services/api'


const apikey = "gBbBC7bPAbmACOKzYRsUlwAmFg6945l6";

var storageCity;
var storageState;

function App() {
  if(localStorage.getItem('last_city')){
    storageCity = localStorage.getItem('last_city');
    storageState = localStorage.getItem('last_state');
  } else{
    storageCity = '';
    storageState = '';
  }

  const[city, setCity] = useState(storageCity);
  const[state, setState] = useState(storageState);
  const[temperature, setTemperature] = useState('');
  const[label, setLabel] = useState('');

  async function getData(e){
    e.preventDefault();
    const response = await api.get(`/locations/v1/cities/search?apikey=${apikey}&q=${city+` `+state}`);
      try{
        const locationKey = response.data[0].Key;
        const locationConditions = await api.get(`/currentconditions/v1/${locationKey}?apikey=${apikey}&language=pt-br`);
        const label = locationConditions.data[0].WeatherText;
        const temperature = locationConditions.data[0].Temperature.Metric.Value;

        setTemperature(temperature);
        setLabel(label);

        localStorage.setItem('last_city', city);
        localStorage.setItem('last_state', state);

      } catch(err){
        alert('Localização Inválida!')
      }
    }

    useEffect(()=>{
      const getData = async()=>{
        const response = await api.get(`/locations/v1/cities/search?apikey=${apikey}&q=${city+` `+state}`);
          try{
            const locationKey = response.data[0].Key;
            const locationConditions = await api.get(`/currentconditions/v1/${locationKey}?apikey=${apikey}&language=pt-br`);
            const label = locationConditions.data[0].WeatherText;
            const temperature = locationConditions.data[0].Temperature.Metric.Value;

            setTemperature(temperature);
            setLabel(label);
      }
      catch(err){
          console.log('')
      }
  }
      getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

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
        <p>{label}</p>
        </div>
      </div>
    </div>
  );
}

export default App;

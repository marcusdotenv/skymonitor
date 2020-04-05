import React,{useState, useEffect} from 'react';
import './styles.css';
import api from './services/api'
import {
  WiDayRain,
  WiDaySunny, 
  WiCloud,
  WiNightRain,
  WiNightClear,
  WiSnow,
  WiUmbrella,
} from "react-icons/wi";



const apikey = "API_KEY";
                  // essa key algum dia pode ficar desatualizada. Lembrar de olhar isso.
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
  const[cityLabel, setCityLabel] = useState('');
  const[temperature, setTemperature] = useState('');
  const[label, setLabel] = useState('');
  const[icon, setIcon] = useState('');
  const[speedWind, setWind] = useState('');
  const[humidty, setHumidty] = useState('');

  function selectIcon(){ // isso tem que ser mudado, provavelmente tem um jeito melhor
    if(icon >= 1 && icon <= 5){
      return <WiDaySunny size={80} color="#F2F2F2"/>
    } else if(icon >= 6 && icon <= 11 || icon >= 35 && icon <= 38){
      return <WiCloud size={80} color="#F2F2F2"/>
    } else if(icon >= 12 && icon <= 17){
      return <WiDayRain size={80} color="#F2F2F2"/>
    } else if(icon >= 39 && icon <= 44){
      return <WiNightRain size={80} color="#F2F2F2"/>
    } else if(icon >= 33 && icon <= 35){
      return <WiNightClear size={80} color="#F2F2F2"/>
    } else if(icon === 22){
      return <WiSnow size={80} color="#F2F2F2"/>
    }
  }
  // pega tudo que eu preciso da API
  async function getData(e){
    e.preventDefault();
    const response = await api.get(`/locations/v1/cities/search?apikey=${apikey}&q=${city+` `+state}`);
      try{
        const locationKey = response.data[0].Key;
        const locationConditions = await api.get(`/currentconditions/v1/${locationKey}?apikey=${apikey}&language=pt-br&details=true`);
        const label = locationConditions.data[0].WeatherText;
        const temperature = locationConditions.data[0].Temperature.Metric.Value;
        const IconNumber = locationConditions.data[0].WeatherIcon;
        const humidty = locationConditions.data[0].RelativeHumidity;
        const wind = locationConditions.data[0].Wind.Speed.Metric.Value;


        setTemperature(temperature);
        setLabel(label);
        setIcon(IconNumber);    // seta em estados valores importantes que eu vou precisar no JSX
        setHumidty(humidty);
        setWind(wind);
        setCityLabel(city +' '+ state);
        setCity('');
        setState('');


        localStorage.setItem('last_city', city);
        localStorage.setItem('last_state', state); // seta o storage do navegador

      } catch(err){
        alert('Localização Inválida!')    // executa caso a primeira chamada a API retorne vazia
      }
    }

    useEffect(()=>{ // hook useEffect para executar uma chamada a API caso haja algo no localStorage
      const getData = async()=>{  // logo que a aplicação é iniciada
        const response = await api.get(`/locations/v1/cities/search?apikey=${apikey}&q=${city+` `+state}`);
          try{
            const locationKey = response.data[0].Key;
            const locationConditions = await api.get(`/currentconditions/v1/${locationKey}?apikey=${apikey}&language=pt-br&details=true`);
            const label = locationConditions.data[0].WeatherText;
            const temperature = locationConditions.data[0].Temperature.Metric.Value;
            const IconNumber = locationConditions.data[0].WeatherIcon;
            const humidty = locationConditions.data[0].RelativeHumidity;
            const wind = locationConditions.data[0].Wind.Speed.Metric.Value;

            setTemperature(temperature);
            setLabel(label);
            setIcon(IconNumber);
            setHumidty(humidty);
            setCityLabel(city +' '+ state);
            setCity('');
            setState('');
            setWind(wind);
      }
      catch(err){ // não havendo nada no localStorage, o Hook retorna só um log
          console.log('Não há localStorage disponível')
      }
  }
      getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
   // essa lista indicaria os gatilhos do hook. uma lista vazia indica execução ao iniciar
    // a aplicação

  return (
    <div className="full-container">
      <form onSubmit={getData}>
      <div className="application-section">
        <div>
        <h1> Sky Monitor </h1>
        </div>
      <div className="input-container">
        <div>
          <h3>Digite sua cidade e estado</h3>
        </div>
        <div>
          <input className="city" placeholder="Cidade" value={city} onChange={e => setCity(e.target.value)}/> 
          <input className="state" placeholder="Estado" value={state} onChange={e => setState(e.target.value)}/> 
        </div>
      </div>
        <button type="submit"> Pesquisar </button>
      </div>
      </form>
      <div className="display-data">
          <div className="title">
            <h1> Condições do Tempo </h1>
            {selectIcon()}
            <p>{label} - {cityLabel} </p>
          </div>
          <div className="body">
            <div>
              <p>{temperature}°C </p>
              <h3> Temperatura </h3>
            </div>
            <div>
              <p>{humidty}% </p>
              <h3> Umidade relativa </h3>
            </div>
            <div>
              <p>{speedWind}km/h </p>
              <h3> Velocidade do Vento </h3>
            </div>
          </div>
      </div>
    </div>
  );
}

export default App;

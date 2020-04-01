import React from 'react';
import './styles.css';



function App() {
  return (
    <div className="full-container">
      <form>
      <div className="application-section">
        <h1> Sky Monitor </h1>
        <h3>Digite sua Cidade</h3>
        <input placeholder="Cidade"/> 
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

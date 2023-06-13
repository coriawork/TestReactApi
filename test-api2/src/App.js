import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";


function App() {
  const [juegos, setJuegos] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [plataformas, setPlataforma] = useState([]);
  const getJuegos = ()=>{
    axios
    .get("http://localhost:8000/juegos")
    .then(function (response) {
      setJuegos(response.data);
    })
    .catch((error) => console.error(error));
  }
  const getGenero = ()=>{
    axios
      .get("http://localhost:8000/generos")
      .then(function (response) {
        setGeneros(response.data);
      })
      .catch((error) => console.error(error));
  }
  const getPlataforma = () => {
     axios
       .get("http://localhost:8000/plataformas")
       .then(function (response) {
         setPlataforma(response.data);
       })
       .catch((error) => console.error(error));
   };
  const buscarGeneroPorId = (id) => {
    return generos.find((objeto) => objeto.id === id).nombre;
  };
  const buscarPlataformaPorId = (id) => {
    return plataformas.find((objeto) => objeto.id === id).nombre;
  };
  useEffect(()=>{
    getJuegos();
    getGenero();
    getPlataforma();
  },[]);

  
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Lista de Juegos</h1>
      <div className="containerJuego">
        {juegos.map((juego) => (
          <div key={juego.id} className="contentJuego">
            <h2>{juego.nombre}</h2>
            <ul>
              <li>{juego.descripcion}</li>
              <li>genero: {buscarGeneroPorId(juego.id_genero)}</li>
              <li>Plataforma: {buscarPlataformaPorId(juego.id_plataforma)}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
} 
export default App;

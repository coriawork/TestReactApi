import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [generos, setGeneros] = useState([]);
  const getGenero = () => {
    axios
      .get("http://localhost:8000/generos")
      .then(function (response) {
        setGeneros(response.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getGenero();
  }, []);

  const deletegen = (id)=>{
    axios
      .delete(`http://localhost:8000/generos/${id}`)
      .then((response) => {
        console.log("Género eliminado:", response.data);
        // Actualizar la lista de géneros después de eliminar uno
        getGenero();
      })
      .catch((error) => {
        console.error("Error al eliminar el género:", error);
      });
  }

  const editGen = (id,nombre)=>{
    const moddle = document.querySelector('.moddle');
    const closeX = document.querySelector('i');
    const input = document.querySelector('#nombre');
    const save = document.querySelector("#save");

    input.value = nombre;
    closeX.addEventListener('click',()=>{
      moddle.classList.add("hidden");
    });
    moddle.classList.remove("hidden");

    save.addEventListener("click",()=>{
        const result = window.confirm(
          "¿Estás que deceas editar el id " + id+"?"
        );
        if (result) {
          // El usuario hizo clic en "Aceptar" en la ventana emergente de confirmación
          // Realiza las acciones necesarias para guardar los cambios
          moddle.classList.add("hidden");
          let nombre = {
            nombre:input.value
          }
          console.log(nombre);
          axios
            .put(`http://localhost:8000/generos/${id}`, nombre, {
              headers: {
                "Access-Control-Allow-Origin": "*", // Configura el encabezado CORS para permitir todas las solicitudes desde cualquier origen
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", // Configura los métodos permitidos en el encabezado CORS
                "Access-Control-Allow-Headers": "Content-Type, Authorization", // Configura los encabezados permitidos en el encabezado CORS
              },
            })
            .then(function (response) {
              setGeneros(response.data);
            })
            .catch((error) => console.error(error));
        }
    });

  }

  return (
    <div className="App">
      <div className="moddle hidden">
        <div>
          <i>x</i>
          <header>
            <h1>EDITAR</h1>
          </header>
          <main>
            <form>
              <label>nombre</label>
              <input id='nombre'></input>
              <button id='save' type='button'>save</button>
            </form>
          </main>
        </div>
      </div>
      <header className="App-header">
        <h1 className="App-title">Lista generos</h1>
      </header>
      <main className="App-main">
        <div className="container-list">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>accion</th>
              </tr>
            </thead>
            <tbody>
              {generos.map((genero) => (
                <tr>
                  <td>{genero.id}</td>
                  <td>{genero.nombre}</td>
                  <td>
                    <button id="editar" onClick={() => editGen(genero.id,genero.nombre)}>
                      editar
                    </button>
                    <button id="eliminar" onClick={() => deletegen(genero.id)}>
                      eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default App;

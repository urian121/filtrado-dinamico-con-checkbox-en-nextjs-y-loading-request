"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

// Importando el paquete loading-request
import { showLoading, hideLoading } from "loading-request";
import "loading-request/dist/index.css";

const Jugadores = () => {
  const [jugadores, setJugadores] = useState([]); // Variables de stado para almacenar la lista de jugadores.
  // Variables de estado para gestionar los filtros de posiciones seleccionadas.
  const [posiciones, setPosiciones] = useState({
    Center: false,
    Guard: false,
    Forward: false,
  });

  {
    /* Cargando la lista de jugadores desde un archivo JSON al montar el componente y actualizando el estado con los datos obtenidos. */
  }
  useEffect(() => {
    const fetchJugadores = async () => {
      const response = await fetch("/api/api.json");
      const data = await response.json();
      setJugadores(data.listaJugadores);
    };

    fetchJugadores();
  }, []);

  {
    /* Función para manejar los cambios en los checkboxes, actualiza el estado de las posiciones y muestra 
  un indicador de carga mientras se actualizan los filtros. */
  }
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    showLoading({
      message: "Cargando Jugadores...",
      textLoadingSize: "25px",
    });

    {
      /*  
      Actualiza el estado de las posiciones, manteniendo los valores anteriores y ajustando solo el campo correspondiente al nombre del checkbox.
      */
    }
    setPosiciones((prevPosiciones) => ({
      ...prevPosiciones,
      [name]: checked,
    }));

    hideLoading({ timeLoading: 500 });
  };

  {
    /* Filtrando la lista de jugadores según las posiciones seleccionadas.Solo se incluyen jugadores que coincidan con las posiciones activas en los filtros. */
  }
  const filteredJugadores = jugadores.filter((jugador) => {
    const { Center, Guard, Forward } = posiciones;
    if (Center || Guard || Forward) {
      return (
        (Center && jugador.posicion.includes("Center")) ||
        (Guard && jugador.posicion.includes("Guard")) ||
        (Forward && jugador.posicion.includes("Forward"))
      );
    }
    return true;
  });

  // Array que define las opciones de posiciones con id, nombre y etiqueta.
  const posicionesOptions = [
    { id: "switch-1", name: "Center", label: "Center" },
    { id: "switch-2", name: "Guard", label: "Guard" },
    { id: "switch-3", name: "Forward", label: "Forward" },
  ];
  return (
    <div className="container">
      <div className="header-container">
        <h2>Posiciones</h2>
        <ul>
          {/* Mapeando sobre el array de objetos posicionesOptions para generar dinámicamente los elementos de la lista. */}
          {posicionesOptions.map(({ id, name, label }) => (
            <li key={name}>
              <div className="switch">
                <input
                  id={id}
                  type="checkbox"
                  name={name}
                  checked={posiciones[name]}
                  onChange={handleCheckboxChange}
                  className="switch-input"
                />
                <label htmlFor={id} className="switch-label">
                  Switch
                </label>
              </div>{" "}
              {label}
            </li>
          ))}
        </ul>
      </div>

      <ul className="flex-container">
        {filteredJugadores.map((jugador, index) => (
          <li key={index} className="flex-item">
            <Image
              className="card-img-top"
              src={jugador.imgSrc}
              alt={jugador.nombre}
              width={200}
              height={200}
            />
            <h3>{jugador.nombre}</h3>
            <p>{jugador.numero}</p>
            <p>
              Posición: &nbsp;
              {jugador.posicion === "Center" && (
                <span className="position_center"> {jugador.posicion} </span>
              )}
              {jugador.posicion === "Guard" && (
                <span className="position_guard"> {jugador.posicion} </span>
              )}
              {jugador.posicion === "Forward" && (
                <span className="position_forward"> {jugador.posicion} </span>
              )}
            </p>
            <p>Equipo: {jugador.nombreDelEquipo}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Jugadores;

"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

// Importando el paquete loading-request
import { showLoading, hideLoading } from "loading-request";
import "loading-request/dist/index.css";

const Jugadores = () => {
  const [jugadores, setJugadores] = useState([]);
  const [posiciones, setPosiciones] = useState({
    Center: false,
    Guard: false,
    Forward: false,
  });

  useEffect(() => {
    const fetchJugadores = async () => {
      const response = await fetch("/api/api.json");
      const data = await response.json();
      setJugadores(data.listaJugadores);
    };

    fetchJugadores();
  }, []);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    showLoading({
      message: "Cargando Jugadores...",
      textLoadingSize: "25px",
    });

    setPosiciones((prevPosiciones) => ({
      ...prevPosiciones,
      [name]: checked,
    }));

    hideLoading({ timeLoading: 1000 });
  };

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
  return (
    <div className="container">
      <div className="header-container">
        <h2>Posiciones</h2>
        <ul>
          <li>
            <div className="switch">
              <input
                id="switch-1"
                type="checkbox"
                name="Center"
                checked={posiciones.Center}
                onChange={handleCheckboxChange}
                className="switch-input"
              />
              <label htmlFor="switch-1" className="switch-label">
                Switch
              </label>
            </div>{" "}
            Center
          </li>
          <li>
            <div className="switch">
              <input
                id="switch-2"
                type="checkbox"
                name="Guard"
                checked={posiciones.Guard}
                onChange={handleCheckboxChange}
                className="switch-input"
              />
              <label htmlFor="switch-2" className="switch-label">
                Switch
              </label>
            </div>{" "}
            Guard
          </li>
          <li>
            <div className="switch">
              <input
                id="switch-3"
                type="checkbox"
                name="Forward"
                checked={posiciones.Forward}
                onChange={handleCheckboxChange}
                className="switch-input"
              />
              <label htmlFor="switch-3" className="switch-label">
                Switch
              </label>
            </div>{" "}
            Forward
          </li>
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

"use client";
import { useEffect, useState } from "react";
import Image from "next/image";


const Jugadores = () => {
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    const fetchJugadores = async () => {
      const response = await fetch("/api/api.json");
      const data = await response.json();
      setJugadores(data.listaJugadores);
    };

    fetchJugadores();
  }, []);

  return (
    <div className="container">
      <div className="header-container">
        <h2>Posiciones</h2>
        <ul>
          <li>
            <input type="checkbox" /> Center
          </li>
          <li>
            <input type="checkbox" /> Guard
          </li>
          <li>
            <input type="checkbox" /> Forward
          </li>
        </ul>
      </div>

      <ul className="flex-container">
        {jugadores.map((jugador, index) => (
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
            <p>Posición: {jugador.posicion}</p>
            <p>Equipo: {jugador.nombreDelEquipo}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Jugadores;

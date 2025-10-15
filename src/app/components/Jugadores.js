"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

// Importando el paquete loading-request
import { showLoading, hideLoading } from "loading-request";

const Jugadores = () => {
  const [jugadores, setJugadores] = useState([]); // Variables de estado para almacenar la lista de jugadores.
  const [loading, setLoading] = useState(true); // Estado para controlar la carga inicial
  const [error, setError] = useState(null); // Estado para manejar errores

  // Variables de estado para gestionar los filtros de posiciones seleccionadas.
  const [posiciones, setPosiciones] = useState({
    Center: false,
    Guard: false,
    Forward: false,
  });

  {
    /* Cargando la lista de jugadores desde la API al montar el componente y actualizando el estado con los datos obtenidos. */
  }
  useEffect(() => {
    const fetchJugadores = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("https://devsapihub.com/api-players");

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        // La API devuelve directamente un array de jugadores
        if (Array.isArray(data) && data.length > 0) {
          setJugadores(data);
        } else if (Array.isArray(data) && data.length === 0) {
          setJugadores([]);
        } else {
          throw new Error("Formato de respuesta inesperado");
        }
      } catch (error) {
        console.error("Error al cargar jugadores:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
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
    /* Filtrando la lista de jugadores según las posiciones seleccionadas. 
    Solo se incluyen jugadores que coincidan con las posiciones activas en los filtros.
    */
  }
  const filteredJugadores = jugadores.filter((jugador) => {
    const { Center, Guard, Forward } = posiciones;
    if (Center || Guard || Forward) {
      return (
        (Center && jugador.position.includes("Center")) ||
        (Guard && jugador.position.includes("Guard")) ||
        (Forward && jugador.position.includes("Forward"))
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
  // Mostrar mensaje de carga inicial
  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p>Cargando jugadores...</p>
        </div>
      </div>
    );
  }

  // Mostrar mensaje de error si ocurre algún problema
  if (error) {
    return (
      <div className="container">
        <div style={{ textAlign: "center", padding: "2rem", color: "red" }}>
          <h3>Error al cargar los jugadores</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

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
        {filteredJugadores.length > 0 ? (
          filteredJugadores.map((jugador, index) => (
            <li key={jugador.id || index} className="flex-item">
              <Image
                className="card-img-top"
                src={jugador.imgSrc}
                alt={jugador.name}
                width={200}
                height={200}
              />
              <h3>{jugador.name}</h3>
              <p>{jugador.number}</p>
              <p>
                Posición: &nbsp;
                {jugador.position.includes("Center") && (
                  <span className="position_center"> {jugador.position} </span>
                )}
                {jugador.position.includes("Guard") && (
                  <span className="position_guard"> {jugador.position} </span>
                )}
                {jugador.position.includes("Forward") && (
                  <span className="position_forward"> {jugador.position} </span>
                )}
              </p>
              <p>Equipo: {jugador.teamName}</p>
            </li>
          ))
        ) : (
          <li style={{ textAlign: "center", width: "100%", padding: "2rem" }}>
            <p>No se encontraron jugadores con los filtros seleccionados.</p>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Jugadores;

import { useState } from "react";
import { NombresSimpsons, INFO_SIMPSONS } from "./constants";
import styles from "./styles.module.css";
import { Buttons, ContainerBio, ContenedorBotonesBio, DescripcionBio, ImageBio, NombreBio } from "./styled";

const Bio = () => {
  const [bioActiva, setBioActiva] = useState(
    INFO_SIMPSONS[NombresSimpsons.BART]
  );

  const onClick: (nombre: NombresSimpsons) => void = (nombre) =>
    setBioActiva(INFO_SIMPSONS[nombre]);

  const crearBotones = () => {
    return Object.keys(INFO_SIMPSONS).map((nombre: string) => (
      <>
      {/* <button
        key={nombre as string}
        onClick={() => onClick(nombre as NombresSimpsons)}
        className={
          bioActiva.id === nombre
            ? styles.botonBioActivo
            : styles.botonBioInactivo
        }
      >
        {nombre}
      </button> */}
      <Buttons  
        key={nombre as string}
        onClick={() => onClick(nombre as NombresSimpsons)}
        primary= { bioActiva.id === nombre}>
          {nombre}
      </Buttons>
      </> 
      
    ));
  };

  return (
    <>
      <ContainerBio>
        <ContenedorBotonesBio>{crearBotones()}</ContenedorBotonesBio>
      </ContainerBio>
      <div>
        <ImageBio 
          src = {bioActiva.image}
          alt={bioActiva.image}          
          >
        </ImageBio>
      </div>
      <div>
        <NombreBio>{bioActiva.nombre}</NombreBio>
        <DescripcionBio>{bioActiva.descripcion}</DescripcionBio>
      </div>

    {/* <div className={styles.bioContainer}>
      <div className={styles.contenedorBotones}>{crearBotones()}</div>
      <div>
        <div>
          <img
            src={bioActiva.image}
            alt={bioActiva.nombre}
            className={styles.bioImagen}
          />
        </div>
        <div>
          <h3 className={styles.bioNombre}>{bioActiva.nombre}</h3>
          <p className={styles.bioDescripcion}>{bioActiva.descripcion}</p>
        </div>
      </div>
    </div> */}
    </>
  );
};

export default Bio;

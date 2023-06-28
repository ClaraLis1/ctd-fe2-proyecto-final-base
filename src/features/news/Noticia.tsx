import { INoticias } from "./fakeRest";
import {   
    TarjetaNoticia,
    FechaTarjetaNoticia,
    DescripcionTarjetaNoticia,
    ImagenTarjetaNoticia,
    TituloTarjetaNoticia, 
    BotonLectura,   
  } from "./styled";
import { INoticiasNormalizadas } from "./types";

  
interface NoticiaProps {
    noticia: INoticiasNormalizadas;
    setModal: (noticia: INoticiasNormalizadas | null) => void;
  }

const Noticia : React.FC<NoticiaProps>= ({ noticia, setModal }) => {
  
    return (
      <TarjetaNoticia>
        <ImagenTarjetaNoticia src={noticia.imagen} />
        <TituloTarjetaNoticia>{noticia.titulo}</TituloTarjetaNoticia>
        <FechaTarjetaNoticia>{noticia.fecha}</FechaTarjetaNoticia>
        <DescripcionTarjetaNoticia>{noticia.descripcionCorta}</DescripcionTarjetaNoticia>
        <BotonLectura onClick={() => setModal(noticia)}>Ver más</BotonLectura>
      </TarjetaNoticia>
    );
  };

  export default Noticia;


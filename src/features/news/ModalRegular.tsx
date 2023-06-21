
import { INoticias } from "./fakeRest";
import {
    CloseButton,
    TarjetaModal,
    ContenedorModal,
    DescripcionModal,
    ImagenModal,
    TituloModal,
    TarjetaNoticia,
    FechaTarjetaNoticia,
    DescripcionTarjetaNoticia,
    ImagenTarjetaNoticia,
    TituloTarjetaNoticia,
    ContenedorNoticias,
    ListaNoticias,
    TituloNoticias,
    BotonLectura,
    BotonSuscribir,
    CotenedorTexto,
  } from "./styled";
import { IModal, INoticiasNormalizadas } from "./types";
import { SuscribeImage, CloseButton as Close } from "../../assets";

  
interface ModalRegularProps {
    modal: INoticiasNormalizadas;
    setModal: (noticia: INoticiasNormalizadas | null) => void;
  }

const ModalRegular : React.FC<ModalRegularProps> = ({ modal, setModal }) => {
    return (
      <ContenedorModal>
        <TarjetaModal>

          <CloseButton onClick={() => setModal(null)}>         
            <img src={Close} alt="close-button" />
          </CloseButton>
          <ImagenModal src={modal.imagen} alt="news-image" />
          <CotenedorTexto>
            <TituloModal>{modal.titulo}</TituloModal>
            <DescripcionModal>{modal.descripcion}</DescripcionModal>
          </CotenedorTexto>
        </TarjetaModal>
      </ContenedorModal>
    );
  };

export default ModalRegular;
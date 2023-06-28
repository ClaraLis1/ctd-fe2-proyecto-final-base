
import {
    CloseButton,
    TarjetaModal,
    ContenedorModal,
    DescripcionModal,
    ImagenModal,
    TituloModal,
    CotenedorTexto,
  } from "./styled";
import { INoticiasNormalizadas } from "./types";
import { CloseButton as Close } from "../../assets";

  
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
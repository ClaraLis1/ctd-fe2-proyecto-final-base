import { useEffect, useState } from "react";
import { obtenerNoticias } from "./fakeRest";
import { ContenedorNoticias, TituloNoticias} from "./styled";
import StandarizarNotica from "./utils/StandarizarNoticia";
import { INoticiasStandarizada } from "./types";
import ModalPremium from "./ModalPremium";
import ModalRegular from "./ModalRegular";
import ListaDeNoticias from "./ListaNoticias";


const Noticias = () => {
  const [noticias, setNoticias] = useState<INoticiasStandarizada[]>([]);
  const [modal, setModal] = useState<INoticiasStandarizada | null>(null);

  /*********Principio Single responsability ********/
  /*Se crea Util para guardar los diferentes metodos */   

  useEffect(() => {
    const obtenerInformacion = async () => {
      const respuesta = await obtenerNoticias();
      const data = respuesta.map(StandarizarNotica);
      setNoticias(data);
    };
    obtenerInformacion();
  }, []);

/*Se crea Crearon distintos componentes para las diferentes responsablidades */   
  
return (
  <ContenedorNoticias>
    <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
    <ListaDeNoticias noticias={noticias} setModal={setModal} />
    {modal && (
      modal.esPremium ? (
        <ModalPremium setModal={setModal} />
      ) : (
        <ModalRegular modal={modal} setModal={setModal} />
      )
    )}
  </ContenedorNoticias>
);
}
  
export default Noticias;

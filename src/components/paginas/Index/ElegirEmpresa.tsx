import * as React from "react";
import PaginaBase from "src/components/ui/pagecontrol/PaginaBase";
// import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import ContenedorControlFormatoA from 'src/components/ui/formcontrol/ContenedorControlFormatoA';
import ControlModal from 'src/components/ui/formcontrol/ControlModal';
import EElementoCombo from 'src/models/logicas/EElementoCombo';
// import ControlPeoplePicker from '../../../ui/formcontrol/ControlPeoplePicker';
import ControlSelect from 'src/components/ui/formcontrol/ControlSelect';
import Funciones from 'src/genericos/Funciones';
import EEmpresa from 'src/models/fisicas/EEmpresa_2';



export interface IPropsElegirEmpresa {
  eventoOcultarPopup: (iniciarBusqueda: boolean) => void;
  eventoGuardar: (Empresa: EElementoCombo) => void;
}

export interface IStateElegirEmpresa {
  campos: {
    Empresa: EElementoCombo;
  };
  Datos: {
    ListaEmpresa: EElementoCombo[],
  },
}

class ElegirEmpresa extends PaginaBase<
  IPropsElegirEmpresa,
  IStateElegirEmpresa
  > {
  public mensajes = {
    Informativo_SeRegistroNuevoExpediente: "Se ha elegido la empresa correctamente."
  };

  private childCmbEmpresa: React.RefObject<ControlSelect>;

  constructor(props: IPropsElegirEmpresa) {
    super(props);



    this.state = {
      campos: {
        Empresa: new EElementoCombo,
      },
      Datos:
      {
        ListaEmpresa: []
      }


    };
  }

  public componentDidMount() {
    this.inicializarControles();
  }

  public inicializarControles = () => {

    const promesas = [];
    promesas.push(Funciones.ObtenerElementoPorRest(EEmpresa.getEndPointElementosActivos()))
    Promise.all(promesas)
      .then(([resultadoAreas]) => {
        const areas = (resultadoAreas as EEmpresa[])



        areas.map((elemento) => {
          this.state.Datos.ListaEmpresa.push(new EElementoCombo(elemento.ID, elemento.Title, elemento));
        });


      })
      .catch(err => {
        this.MostrarMensajeError(
          "Nuevo Proyecto" + " - obtenerDatosMaestros",
          err
        );
      });

  };



  public validarCampos() {
    let camposValidos = true;

    if (
      this.state.campos.Empresa.ID === 0
    ) {
      camposValidos = false;
    }

    return camposValidos;
  }

  public eventoCambiarFiltroArea = (nombreControl: string, elementoClick: EElementoCombo | null, elementosSeleccionados: EElementoCombo[]) => {
    if (nombreControl === "cmbEmpresa") {
      this.setState({ campos: { ...this.state.campos, Empresa: elementosSeleccionados[0] } })
    }
  }



  public guardarProyecto = () => {

    this.props.eventoGuardar.bind(this, this.state.campos.Empresa);

  };

  public render() {
    return (
      <ControlModal titulo="Elegir Empresa"
        eventoOcultarPopup={this.props.eventoOcultarPopup.bind(this, false)}
        eventoOk={this.props.eventoGuardar.bind(this, this.state.campos.Empresa)}
        textoBotonOk="GUARDAR">

        {super.render()}




        <ContenedorControlFormatoA etiqueta="Empresa" esObligatorio={true} claseContenedor="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <ControlSelect
            cantidadElementosSeleccionables={1}
            eventoChange={this.eventoCambiarFiltroArea}
            habilitarBuscador={true}
            listaOrigenElementos={this.state.Datos.ListaEmpresa}
            elementoSeleccionado={this.state.campos.Empresa}
            nombreControl={"cmbEmpresa"}
            propiedadMostrar={'Title'}
            ref={this.childCmbEmpresa}
          />
        </ContenedorControlFormatoA>

        {/* 
        <ContenedorControlFormatoA etiqueta="Responsable" esObligatorio={true} claseContenedor="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <ControlPeoplePicker
            cantidadCaracteresIniciarBusqueda={3}
            buscarSoloUsuarios={true}
            cantidadElementosSeleccionables={3}
            esMostrarCorreo={true}
            esBuscarPorCorreo={true}
            eventoChange={this.eventoChangePeoplePicker}
            listaElementosSeleccionados={this.state.campos.UsuarioResponsable}
            nombreControl="ppResponsable"
          />
        </ContenedorControlFormatoA> */}


      </ControlModal>

    );
  }
}

export default ElegirEmpresa;

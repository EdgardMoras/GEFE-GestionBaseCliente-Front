import * as React from "react";
import ControlValidadorTexto from "src/components/ui/formcontrol/ControlValidadorTexto";
import EArchivoExpediente from "src/models/logicas/EArchivoExpediente";
import EElementoPeoplePicker from '../../../models/logicas/EElementoPeoplePicker';
import PaginaBase from '../pagecontrol/PaginaBase';
import ControlValidadorPeoplePicker from './ControlValidadorPeoplePicker';
import { ParametrosNoAdministrables } from '../../../genericos/VariablesGlobales';
import { ControlModal } from './ControlModal';
import ControlValidadorFecha from './ControlValidadorFecha';
import { ContenedorControlFormatoA } from './ContenedorControlFormatoA';
import ControlPeoplePicker from './ControlPeoplePicker';
import Util from '../../../genericos/Util';
import EArchivo from '../../../models/logicas/EArchivo';
import { ControlCargarArchivos } from './ControlCargarArchivos';

export interface IPropsModalNuevaTarea {
  eventoOcultarPopup: (refrescarPagina: boolean, id?: number) => void;
  eventoGuardar: (solicitud: string, fechaLimite: string, responsable: EElementoPeoplePicker, archivos: EArchivoExpediente[], id?: number) => void;
  mensajeConfirmacion_RegistrarTarea: string;
  id_Incidente?: number;
  titulo?: string,
  extension: string,
  tamaño: number
}

export interface IStateModalNuevaTarea {
  campos: {
    archivos: EArchivoExpediente[];
    solicitud: string;
    fechaLimite: string;
    responsable: EElementoPeoplePicker | null;
    id?: number;
  };
}

class ModalNuevaTarea extends PaginaBase<
  IPropsModalNuevaTarea,
  IStateModalNuevaTarea
  > {
  public nombrePagina = "ModalNuevaTarea.tsx"
  public mensajes = {
    Informativo_SeRegistroTarea: "Se ha registrado la tarea con éxito.",
    Informativo_ValidacionFechaLimiteIgualMayorFechaActual: "La fecha límite debe ser mayor o igual a la fecha actual.",
  };
  private childrenControlCargarArchivos: React.RefObject<ControlCargarArchivos>;
  private validadorSolicitud: React.RefObject<ControlValidadorTexto>;
  private validadorFechaLimite: React.RefObject<ControlValidadorTexto>;
  private validadorResponsable: React.RefObject<ControlValidadorPeoplePicker>;

  constructor(props: IPropsModalNuevaTarea) {
    super(props);

    this.childrenControlCargarArchivos = React.createRef();
    this.validadorSolicitud = React.createRef();
    this.validadorFechaLimite = React.createRef();
    this.validadorResponsable = React.createRef();

    this.state = {
      campos: {
        archivos: [],
        solicitud: "",
        fechaLimite: "",
        responsable: null,
        id: this.props.id_Incidente,
      }
    };
  }

  public handleTextArea = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const { value, name }: any = e.target;
    const campos = Object.assign({}, this.state.campos);

    if (name === "txtSolicitud") {
      campos.solicitud = value;
    }

    this.setState({ campos });
  };

  public handleInputText = (e: React.FormEvent<HTMLInputElement>) => {
    const { value, name }: any = e.target;
    const campos = Object.assign({}, this.state.campos);

    if (name === "txtFecha") {
      campos.fechaLimite = value;
    }

    this.setState({ campos });
  };

  public eventoChangeCargarArchivos = (nombreControl: string, listaArchivos: EArchivo[]) => {
    const campos = Object.assign({}, this.state.campos);

    const listaArchivosExpedientes: EArchivoExpediente[] = listaArchivos.map((archivo: EArchivo) => {
      const archivoExpediente = new EArchivoExpediente();
      archivoExpediente.setValoresDesdeEArchivo(archivo);
      return archivoExpediente;
    });

    campos.archivos = listaArchivosExpedientes;

    this.setState({ campos });
  }

  public eventoChangePeoplePicker = (nombreControl: string, elementoClick: EElementoPeoplePicker | null, elementosSeleccionados: EElementoPeoplePicker[]) => {

    const campos = Object.assign({}, this.state.campos);
    if (nombreControl === "ppResponsable") {
      campos.responsable = elementoClick;
    }
    this.setState({ campos });
  };

  public validarCampos() {
    let camposValidos = true;

    if (!this.validadorSolicitud.current!.esValorValido()) {
      camposValidos = false;
    }

    if (!this.validadorFechaLimite.current!.esValorValido()) {
      camposValidos = false;
    }

    if (!this.validadorResponsable.current!.esValorValido()) {
      camposValidos = false;
    }

    if (!camposValidos) {
      this.MostrarMensajeInformativo(ParametrosNoAdministrables.Mensajes.mensajeInformativoCompletarCamposObligatorios);
    }

    if (this.validadorFechaLimite.current!.esValorValido()) {

      const dateNuevaFechaLimite = Util.ConvertirStringToDateReactControlCustom(this.state.campos.fechaLimite);
      const dateFechaHoy = new Date();

      if (dateNuevaFechaLimite < dateFechaHoy) {
        camposValidos = false;
        this.MostrarMensajeInformativo(this.mensajes.Informativo_ValidacionFechaLimiteIgualMayorFechaActual);
      }
    }

    return camposValidos;
  }

  public guardar = () => {
    const camposValidados = this.validarCampos();
    if (!camposValidados) {
      return;
    }

    if (this.props.mensajeConfirmacion_RegistrarTarea) {
      this.MostrarMensajeConfirmacion(this.props.mensajeConfirmacion_RegistrarTarea, () => {
        if (this.state.campos.responsable) {
          this.props.eventoGuardar(this.state.campos.solicitud, this.state.campos.fechaLimite, this.state.campos.responsable, this.state.campos.archivos, this.state.campos.id);
        }
      });
    }
    else {
      if (this.state.campos.responsable) {
        this.props.eventoGuardar(this.state.campos.solicitud, this.state.campos.fechaLimite, this.state.campos.responsable, this.state.campos.archivos, this.state.campos.id);
      }
    }
  };

  public render() {
    const titulo = (this.props.titulo ? this.props.titulo : "NUEVA TAREA");

    return (
      <ControlModal titulo={titulo}
        claseContenedor="modal-lg"
        eventoOcultarPopup={this.props.eventoOcultarPopup.bind(this, false, this.state.campos.id)}
        eventoOk={this.guardar}
        textoBotonOk="GUARDAR">

        <ContenedorControlFormatoA etiqueta="Solicitud" esObligatorio={true} claseContenedor="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <textarea
            name="txtSolicitud"
            autoComplete="off"
            value={this.state.campos.solicitud}
            className="form-control"
            onChange={this.handleTextArea}
          />

          <ControlValidadorTexto
            valor={this.state.campos.solicitud}
            ref={this.validadorSolicitud}
          />
        </ContenedorControlFormatoA>

        <ContenedorControlFormatoA etiqueta="Fecha límite" esObligatorio={true} claseContenedor="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <div className="input-group date" id="datetimepicker2">
            <input
              name="txtFecha"
              autoComplete="off"
              value={this.state.campos.fechaLimite}
              type="date"
              className="form-control"
              onChange={this.handleInputText}
            />
            <span className="input-group-addon input-group-addon-reset">
              <a href="#" className="input-group-icon">
                <img
                  src={ParametrosNoAdministrables.ValoresGenericos.urlImagenes + "/img/icons/ico-date.png"}
                  width="16"
                  height="16"
                />
              </a>
            </span>
          </div>
          <ControlValidadorFecha
            valor={this.state.campos.fechaLimite}
            ref={this.validadorFechaLimite}
          />
        </ContenedorControlFormatoA>

        <ContenedorControlFormatoA etiqueta="Responsable" esObligatorio={true} claseContenedor="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <div className="input-group">
            <ControlPeoplePicker
              buscarSoloUsuarios={true}
              cantidadCaracteresIniciarBusqueda={3}
              cantidadElementosSeleccionables={1}
              elementoSeleccionado={this.state.campos.responsable}
              esBuscarPorCorreo={true}
              esMostrarCorreo={true}
              eventoChange={this.eventoChangePeoplePicker}
              nombreControl="ppResponsable"
            />
            <span className="input-group-addon input-group-addon-reset">
              <a href="#" className="input-group-icon">
                <img
                  src={ParametrosNoAdministrables.ValoresGenericos.urlImagenes + "/img/icons/ico-user.png"}
                  width="16"
                  height="16"
                />
              </a>
            </span>
          </div>
          <ControlValidadorPeoplePicker
            valor={this.state.campos.responsable}
            ref={this.validadorResponsable}
          />
        </ContenedorControlFormatoA>

        <ControlCargarArchivos
          claseContenedor="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb10"
          eventoChange={this.eventoChangeCargarArchivos}
          esMultiple={true}
          esObligatorio={false}
          esHabilitado={true}
          nombreControl="caArchivos"
          etiquetaControl="Adjuntos"
          etiquetaBotonAdjuntarArchivo="Adjuntar"

          listaArchivos={this.state.campos.archivos}
          ref={this.childrenControlCargarArchivos}

          extensionesNoPermitidas={this.props.extension}
          tamanoMaximoArchivosEnMegas={this.props.tamaño}
        />

        <div className="clearfix" />

        {super.render()}
      </ControlModal>
    );
  }
}

export default ModalNuevaTarea;

import * as React from "react";
import ControlValidadorTexto from "src/components/ui/formcontrol/ControlValidadorTexto";
import EArchivoIncidencia from "src/models/logicas/EArchivoIncidencia";
import EElementoPeoplePicker from '../../../models/logicas/EElementoPeoplePicker';
import PaginaBase from '../pagecontrol/PaginaBase';
import ControlValidadorPeoplePicker from './ControlValidadorPeoplePicker';
import { ParametrosNoAdministrables } from '../../../genericos/VariablesGlobales';
import { ControlModal } from './ControlModal';
import ControlValidadorFecha from './ControlValidadorFecha';
import { ContenedorControlFormatoA } from './ContenedorControlFormatoA';
import ControlPeoplePicker from './ControlPeoplePicker';
import Util from '../../../genericos/Util';
import ETareaPlanAccion from '../../../models/fisicas/ETareaPlanAccion';
import { ControlCargarArchivos } from './ControlCargarArchivos';
import EArchivo from 'src/models/logicas/EArchivo';


export interface IPropsModalModificarTareaIncidente {
  eventoOcultarPopup: (refrescarPagina: boolean, id?: number, idTarea?: number) => void;
  eventoGuardar: (solicitud: string, fechaLimite: string, responsable: EElementoPeoplePicker, archivos: EArchivoIncidencia[], id?: number, idTarea?: number) => void;
  tarea: ETareaPlanAccion;
  id_Incidente?: number;
  id_Tarea?: number;
  extension?: string,
  tamaño?: number
}

export interface IStateModalModificarTareaIncidente {
  campos: {
    archivos: EArchivoIncidencia[];
    solicitud: string;
    fechaLimite: string;
    responsable: EElementoPeoplePicker | null;
    id?: number;
    id_Tarea?: number;
  };
}

class ModalModificarTarea extends PaginaBase<
  IPropsModalModificarTareaIncidente,
  IStateModalModificarTareaIncidente
  > {
  public nombrePagina = "ModalModificarTareaIncidente.tsx"
  public mensajes = {
    Confirmacion_DeseaActualizarTarea: "Se actualizará los datos de la tarea. ¿Desea continuar?",
    Informativo_SeActualizoTarea: "Se actualizó la tarea con éxito.",
    Informativo_ValidacionFechaLimiteIgualMayorFechaActual: "La fecha límite debe ser mayor o igual a la fecha actual.",
  };
  private childrenControlCargarArchivos: React.RefObject<ControlCargarArchivos>;
  private validadorSolicitud: React.RefObject<ControlValidadorTexto>;
  private validadorFechaLimite: React.RefObject<ControlValidadorTexto>;
  private validadorResponsable: React.RefObject<ControlValidadorPeoplePicker>;

  constructor(props: IPropsModalModificarTareaIncidente) {
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
        id_Tarea: this.props.id_Tarea,
      }
    };
  }

  public componentDidMount() {
    const campos = Object.assign({}, this.state.campos);
    campos.archivos = this.props.tarea.ListaArchivos;
    campos.solicitud = this.props.tarea.Detalle;
    campos.fechaLimite = Util.mostrarFechaControlReact(
      this.props.tarea.FechaCompromiso.toString()
    );
    campos.responsable = new EElementoPeoplePicker(true, this.props.tarea.ResponsableTarea[0].ID, this.props.tarea.ResponsableTarea[0].Title, this.props.tarea.ResponsableTarea[0].Email);

    this.setState({ campos });
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

    const listaArchivosExpedientes: EArchivoIncidencia[] = listaArchivos.map((archivo: EArchivo) => {
      const archivoExpediente = new EArchivoIncidencia();
      archivoExpediente.setValoresDesdeEArchivo(archivo);
      return archivoExpediente;
    });

    campos.archivos = listaArchivosExpedientes;

    this.setState({ campos });
  }

  public eventoChangePeoplePicker = (nombreControl: string, elementoClick: EElementoPeoplePicker | null, elementosSeleccionados: EElementoPeoplePicker[]) => {

    const campos = Object.assign({}, this.state.campos);
    if (nombreControl === "ppResponsableTarea") {
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

      const dateNuevaFechaLimite = Util.ConvertirStringToDateReactControl(this.state.campos.fechaLimite);
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

    this.MostrarMensajeConfirmacion(this.mensajes.Confirmacion_DeseaActualizarTarea, () => {
      if (this.state.campos.responsable) {
        this.props.eventoGuardar(this.state.campos.solicitud, this.state.campos.fechaLimite, this.state.campos.responsable, this.state.campos.archivos, this.state.campos.id, this.state.campos.id_Tarea);
      }
    });
  };

  public render() {
    return (
      <ControlModal titulo="MODIFICAR TAREA"
        claseContenedor="modal-lg"
        eventoOcultarPopup={this.props.eventoOcultarPopup.bind(this, false, this.state.campos.id, this.state.campos.id_Tarea)}
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

        <ContenedorControlFormatoA etiqueta="Fecha límite" esObligatorio={true} claseContenedor="col-xs-12 col-sm-12 col-md-6 col-lg-6">
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

        <ContenedorControlFormatoA etiqueta="Responsable" esObligatorio={true} claseContenedor="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <div className="input-group">
            <ControlPeoplePicker
              buscarSoloUsuarios={true}
              cantidadCaracteresIniciarBusqueda={3}
              cantidadElementosSeleccionables={1}
              elementoSeleccionado={this.state.campos.responsable}
              esBuscarPorCorreo={true}
              esMostrarCorreo={true}
              eventoChange={this.eventoChangePeoplePicker}
              nombreControl="ppResponsableTarea"
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

        {
          <ControlCargarArchivos
            claseContenedor="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb10"
            eventoChange={this.eventoChangeCargarArchivos}
            esMultiple={true}
            esObligatorio={false}
            esHabilitado={true}
            nombreControl="caArchivos"
            etiquetaControl="Cargo"
            etiquetaBotonAdjuntarArchivo="Adjuntar"

            listaArchivos={this.state.campos.archivos}
            ref={this.childrenControlCargarArchivos}

            extensionesNoPermitidas={this.props.extension}
          tamanoMaximoArchivosEnMegas={this.props.tamaño}
          />

          /*
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb10">
            <label className="text-label">
              Cargo:
            </label>
            <div className="col-md-12 col-xs-12 col-lg-12 bgfile">
              <label
                className="btn btn-coment rippledefault floatleft"
              // for="my-file-selector"
              >
                <input
                  id="my-file-selector"
                  type="file"
                  style={{ display: "none" }}
                  onChange={this.eventoCargarArchivo}
                  multiple={true}
                />
                Adjuntar
                            </label>
  
              {
                this.state.campos.archivos.filter(archivo => {
                  return !archivo.Eliminado
                }).map((archivo, i) => {
                  return <div className="checkcolor4" key={i}>
                    {
                      (archivo.ID > 0 ?
                        <label className="labeladjunto"><a href={Util.obtenerUrlDescarga(archivo.Ruta)}>{archivo.Nombre}</a></label>
                        :
                        <label className="labeladjunto">{archivo.Nombre}</label>
                      )
                    }
                    <a
                      className="pointer"
                      data-toggle="tooltip"
                      title="Eliminar"
                      onClick={this.eventoConfirmarEliminarArchivo.bind(this, archivo)}
                    >
                      <img
                        src={ParametrosNoAdministrables.ValoresGenericos.urlImagenes + "/img/icons/ico-eliminar.png"}
                        width="20px"
                        height="20px"
                      />
                    </a>
                  </div>
                })
              }
            </div>
          </div>
          */
        }

        <div className="clearfix" />

        {super.render()}
      </ControlModal>
    );
  }
}

export default ModalModificarTarea;

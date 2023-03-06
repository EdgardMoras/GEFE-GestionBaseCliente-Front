import * as React from "react";

import Usuario from "src/models/Base/Usuario";
import ModalProgreso from "src/components/ui/modal/ModalProgreso";
import ModalMensajeInformativo from "src/components/ui/modal/ModalMensajeInformativo";
import ModalMensajeConfirmacion from "src/components/ui/modal/ModalMensajeConfirmacion";
import ModalMensajeError from "src/components/ui/modal/ModalMensajeError";
import Funciones from "src/genericos/Funciones";
import { Grupo } from '../../../models/Base/Grupo';

export interface IStatePaginaBase {
  datosModalProgreso: {
    mostrarModal: boolean;
  };
  datosMensajeInformativo: {
    mostrarModal: boolean;
    mensajeModal: string;
    funcionAceptar?: () => void;
    tieneAccionCerrar: boolean;
  };
  datosMensajeConfirmacion: {
    mostrarModal: boolean;
    mensajeModal: string;
    funcionSi?: () => void;
    funcionNo?: () => void;
  };
  datosMensajeError: {
    mostrarModal: boolean;
    mensajeModal: string;
    tieneAccionCerrar: boolean;
  };
  datosUsuario: {
    usuario: Usuario;
    esGrupo1: boolean;
    esGrupo2: boolean;
    esGrupo3: boolean;
    esGrupo4: boolean;
    esGrupo5: boolean;
    esGrupo6: boolean;
    listaGruposPerteneceUsuario: Grupo[];
    listaUsuarioGrupo1: Usuario[];
    listaUsuarioGrupo2: Usuario[];
    listaUsuarioGrupo3: Usuario[];
    listaUsuarioGrupo4: Usuario[];
    listaUsuarioGrupo5: Usuario[];
    Empresa: string;
  };
}

class PaginaBase<P, S> extends React.Component<P, S> {
  public estado: IStatePaginaBase = {
    datosModalProgreso: {
      mostrarModal: false
    },
    datosMensajeInformativo: {
      mostrarModal: false,
      mensajeModal: "",
      funcionAceptar: undefined,
      tieneAccionCerrar: true
    },
    datosMensajeConfirmacion: {
      mostrarModal: false,
      mensajeModal: "",
      funcionSi: undefined
    },
    datosMensajeError: {
      mostrarModal: false,
      mensajeModal: "",
      tieneAccionCerrar: true
    },
    datosUsuario: {
      usuario: new Usuario(),
      esGrupo1: false,
      esGrupo2: false,
      esGrupo3: false,
      esGrupo4: false,
      esGrupo5: false,
      esGrupo6: false,
      listaGruposPerteneceUsuario: [],
      listaUsuarioGrupo1: [],
      listaUsuarioGrupo2: [],
      listaUsuarioGrupo3: [],
      listaUsuarioGrupo4: [],
      listaUsuarioGrupo5: [],
      Empresa: "",
    }
  };
  public child: any;

  constructor(props: P) {
    super(props);
  }

  public MostrarProgreso = (): void => {
    this.estado.datosModalProgreso.mostrarModal = true;

    this.setState(this.state);
  };

  public OcultarProgreso = (): void => {
    this.estado.datosModalProgreso.mostrarModal = false;
    this.setState(this.state);
  };

  public MostrarMensajeInformativo = (
    mensaje: string,
    tieneAccionCerrar?: boolean | true
  ): void => {
    this.estado.datosModalProgreso.mostrarModal = false;
    this.estado.datosMensajeInformativo.mostrarModal = true;
    this.estado.datosMensajeInformativo.mensajeModal = mensaje;

    if (tieneAccionCerrar === undefined) {
      this.estado.datosMensajeInformativo.tieneAccionCerrar = true;
    } else {
      this.estado.datosMensajeInformativo.tieneAccionCerrar = tieneAccionCerrar;
    }

    this.setState(this.state);
  };

  public MostrarMensajeInformativoConAccion = (
    mensaje: string,
    funcionAceptarParametro?: () => void
  ): void => {
    this.estado.datosModalProgreso.mostrarModal = false;
    this.estado.datosMensajeInformativo.mostrarModal = true;
    this.estado.datosMensajeInformativo.mensajeModal = mensaje;
    this.estado.datosMensajeInformativo.tieneAccionCerrar = true;

    if (funcionAceptarParametro !== undefined) {
      this.estado.datosMensajeInformativo.funcionAceptar = funcionAceptarParametro;
    }
    this.setState(this.state);
  };

  public EventoAceptarMensajeInformativo = (): void => {
    this.OcultarMensajeInformativo();

    if (this.estado.datosMensajeInformativo.funcionAceptar !== undefined) {
      this.setState(this.state);
      this.estado.datosMensajeInformativo.funcionAceptar();
    } else {
      this.setState(this.state);
    }
  };

  public OcultarMensajeInformativo = (): void => {
    this.estado.datosMensajeInformativo.mostrarModal = false;

    this.setState(this.state);
  };

  public MostrarMensajeError = (
    codigoError: string,
    detalleError: string,
    mensaje?: string,
    tieneAccionCerrar?: boolean | true
  ): void => {
    if (this.estado.datosModalProgreso.mostrarModal) {
      this.estado.datosModalProgreso.mostrarModal = false;
    }

    this.estado.datosMensajeError.mostrarModal = true;

    if (mensaje === undefined) {
      this.estado.datosMensajeError.mensajeModal = "Se produjo un error.";
    } else {
      this.estado.datosMensajeError.mensajeModal = mensaje;
    }

    if (tieneAccionCerrar === undefined) {
      this.estado.datosMensajeError.tieneAccionCerrar = true;
    } else {
      this.estado.datosMensajeError.tieneAccionCerrar = tieneAccionCerrar;
    }

    Funciones.GuardarExcepcion(codigoError, detalleError);

    this.setState(this.state);
  };

  public OcultarMensajeError = (): void => {
    this.estado.datosMensajeError.mostrarModal = false;

    this.setState(this.state);
  };

  public MostrarMensajeConfirmacion = (
    mensaje: string,
    funcionSiParametro?: () => void,
    funcionNoParametro?: () => void
  ): void => {
    this.estado.datosModalProgreso.mostrarModal = false;
    this.estado.datosMensajeConfirmacion.mostrarModal = true;
    this.estado.datosMensajeConfirmacion.mensajeModal = mensaje;

    if (funcionSiParametro !== undefined) {
      this.estado.datosMensajeConfirmacion.funcionSi = funcionSiParametro;
    }
    if (funcionNoParametro !== undefined) {
      this.estado.datosMensajeConfirmacion.funcionNo = funcionNoParametro;
    }

    this.setState(this.state);
  };

  public EventoSiMensajeConfirmacion = (): void => {
    this.OcultarMensajeConfirmacion();

    if (this.estado.datosMensajeConfirmacion.funcionSi !== undefined) {
      this.setState(this.state);
      this.estado.datosMensajeConfirmacion.funcionSi();
    } else {
      this.setState(this.state);
    }
  };
  public EventoNoMensajeConfirmacion = (): void => {
    this.OcultarMensajeConfirmacion();

    if (this.estado.datosMensajeConfirmacion.funcionNo !== undefined) {
      this.setState(this.state);
      this.estado.datosMensajeConfirmacion.funcionNo();
    } else {
      this.setState(this.state);
    }
  };

  public OcultarMensajeConfirmacion = (): void => {
    this.estado.datosMensajeConfirmacion.mostrarModal = false;

    this.setState(this.state);
  };

  public render() {
    return (
      <div>
        <ModalProgreso
          mostrarPopup={this.estado.datosModalProgreso.mostrarModal}
          textoProgreso="cargando"
          handleOcultar={this.OcultarProgreso}
        />
        <ModalMensajeInformativo
          mostrarPopup={this.estado.datosMensajeInformativo.mostrarModal}
          textoMensaje={this.estado.datosMensajeInformativo.mensajeModal}
          tieneAccionCerrar={
            this.estado.datosMensajeInformativo.tieneAccionCerrar
          }
          handleAceptar={this.EventoAceptarMensajeInformativo}
          handleOcultar={this.OcultarMensajeInformativo}
        />
        <ModalMensajeConfirmacion
          mostrarPopup={this.estado.datosMensajeConfirmacion.mostrarModal}
          textoMensaje={this.estado.datosMensajeConfirmacion.mensajeModal}
          handleOcultar={this.EventoNoMensajeConfirmacion}
          handleSi={this.EventoSiMensajeConfirmacion}
          handleNo={this.EventoNoMensajeConfirmacion}
        />
        <ModalMensajeError
          mostrarPopup={this.estado.datosMensajeError.mostrarModal}
          textoMensaje={this.estado.datosMensajeError.mensajeModal}
          tieneAccionCerrar={this.estado.datosMensajeError.tieneAccionCerrar}
          handleOcultar={this.OcultarMensajeError}
        />
      </div>
    );
  }
}

export default PaginaBase;

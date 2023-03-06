import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import { EBaseEntidad } from "src/models/Base/EBaseEntidad";
import ParseJsom from "src/genericos/ParseJsom";
import Funciones from "../../genericos/Funciones";
import { Deferred } from "ts-deferred";

enum TipoExpediente {
  Directiva = "Directiva",
  NoDirectiva = "No directiva",
  Comunicacion = "Comunicación",
  Norma = "Norma",
  ObligacionDirecta = "ObligacionDirecta",
  PlanAccionNorma = "PlanAccionNorma",
  Incidente = "Incidente",
  Tarea = "Tarea",
  Proyecto = "Proyecto",
  Encuesta = "Encuesta",
  Observacion = "Observacion",
  Recomendacion = "Recomendacion",
  Comentario = "Comentario",
  PlanAccion = "PlanAccion",
  AvanceImplementacion = "AvanceImplementacion",
  Solicitud = "Solicitud",
}
enum PrefijoTipoExpediente {
  Directiva = "D.",
  Comunicacion = "CM",
  NoDirectiva = "ND.",
  Norma = "N.",
  ObligacionDirecta = "OD.",
  PlanAccionNorma = "PA.",
  Incidente = "INC.",
  Tarea = "T.",
  Proyecto = "AI-",
  Encuesta = "EC.",
  Observacion = "OBS",
  Recomendacion = "RCM",
  Comentario = "CM",
  PlanAccion = "PA",
  AvanceImplementacion = "AIPA",
  Solicitud = "SOL",
}

export default class ECorrelativos extends EBaseEntidad {
  public static NombreLista: string =
    "ADM_Correlativo";

  public static Campos = {
    EstadoElemento: ParametrosNoAdministrables.ColumnasSitio.EstadoElemento,
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
    NumeroCorrelativo:
      ParametrosNoAdministrables.ColumnasSitio.NumeroCorrelativo,
    TipoCorrelativo: ParametrosNoAdministrables.ColumnasSitio.TipoCorrelativo
  };

  public static obtenerFiltroPorTipoExpedienteYEstadoActivo(
    tipo: TipoExpediente
  ): string {
    const valorFilter = `${
      ParametrosNoAdministrables.ColumnasSitio.EstadoElemento
      } eq '${
      ParametrosNoAdministrables.ValoresGenericos.ValorEstadoElementoActivo
      }' and ${ECorrelativos.Campos.TipoCorrelativo} eq '${tipo}'`;
    return valorFilter;
  }

  public static getCorrelativoIncidente() {
    const listaFieldsSelect = Funciones.obtenerListaCampos(
      ECorrelativos.Campos
    );

    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectFilter,
      this.NombreLista,
      listaFieldsSelect.join(","),
      this.obtenerFiltroPorTipoExpedienteYEstadoActivo(TipoExpediente.Incidente)
    );
    return endPoint;
  }

  public static getCorrelativoTipoDirectiva() {
    const listaFieldsSelect = Funciones.obtenerListaCampos(
      ECorrelativos.Campos
    );

    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectFilter,
      this.NombreLista,
      listaFieldsSelect.join(","),
      this.obtenerFiltroPorTipoExpedienteYEstadoActivo(TipoExpediente.Directiva)
    );
    return endPoint;
  }

  public static getCorrelativoTipoNoDirectiva() {
    const listaFieldsSelect = Funciones.obtenerListaCampos(
      ECorrelativos.Campos
    );

    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectFilter,
      this.NombreLista,
      listaFieldsSelect.join(","),
      this.obtenerFiltroPorTipoExpedienteYEstadoActivo(
        TipoExpediente.NoDirectiva
      )
    );
    return endPoint;
  }

  public static getCorrelativoTipoComunicacion() {
    const listaFieldsSelect = Funciones.obtenerListaCampos(
      ECorrelativos.Campos
    );

    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectFilter,
      this.NombreLista,
      listaFieldsSelect.join(","),
      this.obtenerFiltroPorTipoExpedienteYEstadoActivo(
        TipoExpediente.Comunicacion
      )
    );
    return endPoint;
  }

  public static getCorrelativoNorma() {
    const listaFieldsSelect = Funciones.obtenerListaCampos(
      ECorrelativos.Campos
    );

    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectFilter,
      this.NombreLista,
      listaFieldsSelect.join(","),
      this.obtenerFiltroPorTipoExpedienteYEstadoActivo(TipoExpediente.Norma)
    );
    return endPoint;
  }

  public static getCorrelativoTarea() {
    const listaFieldsSelect = Funciones.obtenerListaCampos(
      ECorrelativos.Campos
    );

    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectFilter,
      this.NombreLista,
      listaFieldsSelect.join(","),
      this.obtenerFiltroPorTipoExpedienteYEstadoActivo(TipoExpediente.Tarea)
    );
    return endPoint;
  }

  public static getCorrelativoObligacionDirecta() {
    const listaFieldsSelect = Funciones.obtenerListaCampos(
      ECorrelativos.Campos
    );

    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectFilter,
      this.NombreLista,
      listaFieldsSelect.join(","),
      this.obtenerFiltroPorTipoExpedienteYEstadoActivo(
        TipoExpediente.ObligacionDirecta
      )
    );
    return endPoint;
  }

  public static getCorrelativoPlanAccionNorma() {
    const listaFieldsSelect = Funciones.obtenerListaCampos(
      ECorrelativos.Campos
    );

    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectFilter,
      this.NombreLista,
      listaFieldsSelect.join(","),
      this.obtenerFiltroPorTipoExpedienteYEstadoActivo(
        TipoExpediente.PlanAccionNorma
      )
    );
    return endPoint;
  }

  public static getCorrelativoProyecto() {
    const listaFieldsSelect = Funciones.obtenerListaCampos(
      ECorrelativos.Campos
    );

    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectFilter,
      "ADM_Correlativo",
      listaFieldsSelect.join(","),
      this.obtenerFiltroPorTipoExpedienteYEstadoActivo(TipoExpediente.Proyecto)
    );
    return endPoint;
  }

  public static getCorrelativoObservacion() {
    const listaFieldsSelect = Funciones.obtenerListaCampos(
      ECorrelativos.Campos
    );

    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectFilter,
      "ADM_Correlativo",
      listaFieldsSelect.join(","),
      this.obtenerFiltroPorTipoExpedienteYEstadoActivo(TipoExpediente.Observacion)
    );
    return endPoint;
  }


  public static getCorrelativoPlanAccion() {
    const listaFieldsSelect = Funciones.obtenerListaCampos(
      ECorrelativos.Campos
    );

    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectFilter,
      "ADM_Correlativo",
      listaFieldsSelect.join(","),
      this.obtenerFiltroPorTipoExpedienteYEstadoActivo(TipoExpediente.PlanAccion)
    );
    return endPoint;
  }


  public static getCorrelativoSolicitud() {
    const listaFieldsSelect = Funciones.obtenerListaCampos(
      ECorrelativos.Campos
    );

    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectFilter,
      "ADM_Correlativo",
      listaFieldsSelect.join(","),
      this.obtenerFiltroPorTipoExpedienteYEstadoActivo(TipoExpediente.Solicitud)
    );
    return endPoint;
  }


  public static getCorrelativoRecomendacion() {
    const listaFieldsSelect = Funciones.obtenerListaCampos(
      ECorrelativos.Campos
    );

    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectFilter,
      "ADM_Correlativo",
      listaFieldsSelect.join(","),
      this.obtenerFiltroPorTipoExpedienteYEstadoActivo(TipoExpediente.Recomendacion)
    );
    return endPoint;
  }

  public static getCorrelativoAvanceImplementacion() {
    const listaFieldsSelect = Funciones.obtenerListaCampos(
      ECorrelativos.Campos
    );

    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectFilter,
      "ADM_Correlativo",
      listaFieldsSelect.join(","),
      this.obtenerFiltroPorTipoExpedienteYEstadoActivo(TipoExpediente.AvanceImplementacion)
    );
    return endPoint;
  }

  public static getCorrelativoComentario() {
    const listaFieldsSelect = Funciones.obtenerListaCampos(
      ECorrelativos.Campos
    );

    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectFilter,
      "ADM_Correlativo",
      listaFieldsSelect.join(","),
      this.obtenerFiltroPorTipoExpedienteYEstadoActivo(TipoExpediente.Comentario)
    );
    return endPoint;
  }



  public static getCorrelativoEncuesta() {
    const listaFieldsSelect = Funciones.obtenerListaCampos(
      ECorrelativos.Campos
    );

    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectFilter,
      this.NombreLista,
      listaFieldsSelect.join(","),
      this.obtenerFiltroPorTipoExpedienteYEstadoActivo(TipoExpediente.Encuesta)
    );
    return endPoint;
  }

  public static obtenerEndPointCorrelativoExpediente = (
    esTipoDirectiva: boolean,
    esTipoNoDirectiva: boolean,
    esTipoComunicacion: boolean
  ) => {
    let endPoint = "";

    if (esTipoDirectiva) {
      endPoint = ECorrelativos.getCorrelativoTipoDirectiva();
    } else if (esTipoNoDirectiva) {
      endPoint = ECorrelativos.getCorrelativoTipoNoDirectiva();
    } else if (esTipoComunicacion) {
      endPoint = ECorrelativos.getCorrelativoTipoComunicacion();
    }

    return endPoint;
  };

  public static obtenerEndPointCorrelativoNorma = () => {
    const endPoint = ECorrelativos.getCorrelativoNorma();

    return endPoint;
  };

  public static obtenerEndPointCorrelativoTarea = () => {
    const endPoint = ECorrelativos.getCorrelativoTarea();

    return endPoint;
  };

  public static obtenerEndPointCorrelativoObligacionDirecta = () => {
    const endPoint = ECorrelativos.getCorrelativoObligacionDirecta();

    return endPoint;
  };

  public static obtenerEndPointCorrelativoPlanAccionNorma = () => {
    const endPoint = ECorrelativos.getCorrelativoPlanAccionNorma();

    return endPoint;
  };

  public static obtenerEndPointCorrelativoProyecto = () => {
    const endPoint = ECorrelativos.getCorrelativoProyecto();
    return endPoint;
  };

  public static obtenerEndPointCorrelativoObservacion = () => {
    const endPoint = ECorrelativos.getCorrelativoObservacion();
    return endPoint;
  };

  public static obtenerEndPointCorrelativoRecomendacion = () => {
    const endPoint = ECorrelativos.getCorrelativoRecomendacion();
    return endPoint;
  };

  public static obtenerEndPointCorrelativoPlanAccion = () => {
    const endPoint = ECorrelativos.getCorrelativoPlanAccion();
    return endPoint;
  };

  public static obtenerEndPointCorrelativoSolicitud = () => {
    const endPoint = ECorrelativos.getCorrelativoSolicitud();
    return endPoint;
  };



  public static obtenerEndPointCorrelativoComentario = () => {
    const endPoint = ECorrelativos.getCorrelativoComentario();
    return endPoint;
  };

  public static obtenerEndPointCorrelativoAvanceImplementacion = () => {
    const endPoint = ECorrelativos.getCorrelativoAvanceImplementacion();
    return endPoint;
  };

  public static obtenerEndPointCorrelativoEncuesta = () => {
    const endPoint = ECorrelativos.getCorrelativoEncuesta();
    return endPoint;
  };

  public static obtenerEndPointCorrelativoIncidente = (
    esIncidente: boolean
  ) => {
    let endPoint = "";

    if (esIncidente) {
      endPoint = ECorrelativos.getCorrelativoIncidente();
    }

    return endPoint;
  };
  public NumeroCorrelativo: number;

  public ECorrelativos() {
    this.NumeroCorrelativo = 0;
  }

  public pad(numero: number) {
    let formato = "0000" + numero;

    if (numero >= 9999) {
      formato = "00000" + numero;
    }

    if (numero < 99999) {
      return formato.substr(numero.toString().length);
    } else {
      return numero;
    }
  }


  public obtenerCorrelativoSolicitud(): Promise<string> {
    const dfd: Deferred<string> = new Deferred<string>();
    const endPoint = ECorrelativos.obtenerEndPointCorrelativoSolicitud();

    let codigoCorrelativo = "";

    Funciones.ObtenerElementoPorRest(endPoint)
      .then(resultadoObtenerCorrelativo => {
        if (resultadoObtenerCorrelativo.length === 0) {
          let datosCorrelativo: any;

          codigoCorrelativo = PrefijoTipoExpediente.Solicitud + "-" + this.pad(1);
          datosCorrelativo = {
            TipoCorrelativo: TipoExpediente.Solicitud,
            NumeroCorrelativo: 1
          };

          Funciones.GuardarElemento(
            "ADM_Correlativo",
            datosCorrelativo
          )
            .then(resultadoRegistrar => {
              dfd.resolve(codigoCorrelativo);
            })
            .catch(error => {
              dfd.reject(error);
            });
          return;
        }

        this.setearValoresRest(resultadoObtenerCorrelativo[0]);
        const numeroCorrelativo = this.NumeroCorrelativo + 1;

        Funciones.ActualizarElemento(
          "ADM_Correlativo",
          { NumeroCorrelativo: numeroCorrelativo },
          this.ID
        )
          .then(resultadoRegistrar => {
            codigoCorrelativo = PrefijoTipoExpediente.Solicitud + "-" + this.pad(numeroCorrelativo);

            dfd.resolve(codigoCorrelativo);
          })
          .catch(error => {
            dfd.reject(error);
          });
      })
      .catch(error => {
        dfd.reject(error);
      });

    return dfd.promise;
  }


  public obtenerCorrelativoExpediente(
    esTipoDirectiva: boolean,
    esTipoNoDirectiva: boolean,
    esTipoComunicacion: boolean
  ): Promise<string> {
    const dfd: Deferred<string> = new Deferred<string>();
    const endPoint = ECorrelativos.obtenerEndPointCorrelativoExpediente(
      esTipoDirectiva,
      esTipoNoDirectiva,
      esTipoComunicacion
    );

    let codigoCorrelativo = "";

    Funciones.ObtenerElementoPorRest(endPoint)
      .then(resultadoObtenerCorrelativo => {
        if (resultadoObtenerCorrelativo.length === 0) {
          let datosCorrelativo: any;

          if (esTipoDirectiva) {
            codigoCorrelativo = PrefijoTipoExpediente.Directiva + this.pad(1);
            datosCorrelativo = {
              TipoCorrelativo: TipoExpediente.Directiva,
              NumeroCorrelativo: 1
            };
          } else if (esTipoNoDirectiva) {
            codigoCorrelativo = PrefijoTipoExpediente.NoDirectiva + this.pad(1);
            datosCorrelativo = {
              TipoCorrelativo: TipoExpediente.NoDirectiva,
              NumeroCorrelativo: 1
            };
          } else if (esTipoComunicacion) {
            codigoCorrelativo =
              PrefijoTipoExpediente.Comunicacion + this.pad(1);
            datosCorrelativo = {
              TipoCorrelativo: TipoExpediente.Comunicacion,
              NumeroCorrelativo: 1
            };
          }

          Funciones.GuardarElemento(
            ParametrosNoAdministrables.Listas.Correlativos,
            datosCorrelativo
          )
            .then(resultadoRegistrar => {
              dfd.resolve(codigoCorrelativo);
            })
            .catch(error => {
              dfd.reject(error);
            });
          return;
        }

        this.setearValoresRest(resultadoObtenerCorrelativo[0]);
        const numeroCorrelativo = this.NumeroCorrelativo + 1;

        Funciones.ActualizarElemento(
          ParametrosNoAdministrables.Listas.Correlativos,
          { NumeroCorrelativo: numeroCorrelativo },
          this.ID
        )
          .then(resultadoRegistrar => {
            if (esTipoDirectiva) {
              codigoCorrelativo =
                PrefijoTipoExpediente.Directiva + this.pad(numeroCorrelativo);
            } else if (esTipoNoDirectiva) {
              codigoCorrelativo =
                PrefijoTipoExpediente.NoDirectiva + this.pad(numeroCorrelativo);
            } else if (esTipoComunicacion) {
              codigoCorrelativo =
                PrefijoTipoExpediente.Comunicacion +
                this.pad(numeroCorrelativo);
            }

            dfd.resolve(codigoCorrelativo);
          })
          .catch(error => {
            dfd.reject(error);
          });
      })
      .catch(error => {
        dfd.reject(error);
      });

    return dfd.promise;
  }

  public obtenerCorrelativoNorma(): Promise<string> {
    const dfd: Deferred<string> = new Deferred<string>();
    const endPoint = ECorrelativos.obtenerEndPointCorrelativoNorma();

    let codigoCorrelativo = "";

    Funciones.ObtenerElementoPorRest(endPoint)
      .then(resultadoObtenerCorrelativo => {
        if (resultadoObtenerCorrelativo.length === 0) {
          let datosCorrelativo: any;

          codigoCorrelativo = PrefijoTipoExpediente.Norma + this.pad(1);
          datosCorrelativo = {
            TipoCorrelativo: TipoExpediente.Norma,
            NumeroCorrelativo: 1
          };

          Funciones.GuardarElemento(
            ParametrosNoAdministrables.Listas.Correlativos,
            datosCorrelativo
          )
            .then(resultadoRegistrar => {
              dfd.resolve(codigoCorrelativo);
            })
            .catch(error => {
              dfd.reject(error);
            });
          return;
        }

        this.setearValoresRest(resultadoObtenerCorrelativo[0]);
        const numeroCorrelativo = this.NumeroCorrelativo + 1;

        Funciones.ActualizarElemento(
          ParametrosNoAdministrables.Listas.Correlativos,
          { NumeroCorrelativo: numeroCorrelativo },
          this.ID
        )
          .then(resultadoRegistrar => {
            codigoCorrelativo =
              PrefijoTipoExpediente.Norma + this.pad(numeroCorrelativo);
            dfd.resolve(codigoCorrelativo);
          })
          .catch(error => {
            dfd.reject(error);
          });
      })
      .catch(error => {
        dfd.reject(error);
      });

    return dfd.promise;
  }

  public obtenerCorrelativoTarea(): Promise<string> {
    const dfd: Deferred<string> = new Deferred<string>();
    const endPoint = ECorrelativos.obtenerEndPointCorrelativoTarea();

    let codigoCorrelativo = "";

    Funciones.ObtenerElementoPorRest(endPoint)
      .then(resultadoObtenerCorrelativo => {
        if (resultadoObtenerCorrelativo.length === 0) {
          let datosCorrelativo: any;

          codigoCorrelativo = PrefijoTipoExpediente.Tarea + this.pad(1);
          datosCorrelativo = {
            TipoCorrelativo: TipoExpediente.Tarea,
            NumeroCorrelativo: 1
          };

          Funciones.GuardarElemento(
            ParametrosNoAdministrables.Listas.Correlativos,
            datosCorrelativo
          )
            .then(resultadoRegistrar => {
              dfd.resolve(codigoCorrelativo);
            })
            .catch(error => {
              dfd.reject(error);
            });
          return;
        }

        this.setearValoresRest(resultadoObtenerCorrelativo[0]);
        const numeroCorrelativo = this.NumeroCorrelativo + 1;

        Funciones.ActualizarElemento(
          ParametrosNoAdministrables.Listas.Correlativos,
          { NumeroCorrelativo: numeroCorrelativo },
          this.ID
        )
          .then(resultadoRegistrar => {
            codigoCorrelativo =
              PrefijoTipoExpediente.Tarea + this.pad(numeroCorrelativo);

            dfd.resolve(codigoCorrelativo);
          })
          .catch(error => {
            dfd.reject(error);
          });
      })
      .catch(error => {
        dfd.reject(error);
      });

    return dfd.promise;
  }

  public obtenerCorrelativoObligacionDirecta(): Promise<string> {
    const dfd: Deferred<string> = new Deferred<string>();
    const endPoint = ECorrelativos.obtenerEndPointCorrelativoObligacionDirecta();

    let codigoCorrelativo = "";

    Funciones.ObtenerElementoPorRest(endPoint)
      .then(resultadoObtenerCorrelativo => {
        if (resultadoObtenerCorrelativo.length === 0) {
          let datosCorrelativo: any;

          codigoCorrelativo =
            PrefijoTipoExpediente.ObligacionDirecta + this.pad(1);
          datosCorrelativo = {
            TipoCorrelativo: TipoExpediente.ObligacionDirecta,
            NumeroCorrelativo: 1
          };

          Funciones.GuardarElemento(
            ParametrosNoAdministrables.Listas.Correlativos,
            datosCorrelativo
          )
            .then(resultadoRegistrar => {
              dfd.resolve(codigoCorrelativo);
            })
            .catch(error => {
              dfd.reject(error);
            });
          return;
        }

        this.setearValoresRest(resultadoObtenerCorrelativo[0]);
        const numeroCorrelativo = this.NumeroCorrelativo + 1;

        Funciones.ActualizarElemento(
          ParametrosNoAdministrables.Listas.Correlativos,
          { NumeroCorrelativo: numeroCorrelativo },
          this.ID
        )
          .then(resultadoRegistrar => {
            codigoCorrelativo =
              PrefijoTipoExpediente.ObligacionDirecta +
              this.pad(numeroCorrelativo);

            dfd.resolve(codigoCorrelativo);
          })
          .catch(error => {
            dfd.reject(error);
          });
      })
      .catch(error => {
        dfd.reject(error);
      });

    return dfd.promise;
  }

  public obtenerCorrelativoPlanAccionNorma(): Promise<string> {
    const dfd: Deferred<string> = new Deferred<string>();
    const endPoint = ECorrelativos.obtenerEndPointCorrelativoPlanAccionNorma();

    let codigoCorrelativo = "";

    Funciones.ObtenerElementoPorRest(endPoint)
      .then(resultadoObtenerCorrelativo => {
        if (resultadoObtenerCorrelativo.length === 0) {
          let datosCorrelativo: any;

          codigoCorrelativo = PrefijoTipoExpediente.PlanAccionNorma + this.pad(1);
          datosCorrelativo = {
            TipoCorrelativo: TipoExpediente.PlanAccionNorma,
            NumeroCorrelativo: 1
          };

          Funciones.GuardarElemento(
            ParametrosNoAdministrables.Listas.Correlativos,
            datosCorrelativo
          )
            .then(resultadoRegistrar => {
              dfd.resolve(codigoCorrelativo);
            })
            .catch(error => {
              dfd.reject(error);
            });
          return;
        }

        this.setearValoresRest(resultadoObtenerCorrelativo[0]);
        const numeroCorrelativo = this.NumeroCorrelativo + 1;

        Funciones.ActualizarElemento(
          ParametrosNoAdministrables.Listas.Correlativos,
          { NumeroCorrelativo: numeroCorrelativo },
          this.ID
        )
          .then(resultadoRegistrar => {
            codigoCorrelativo =
              PrefijoTipoExpediente.PlanAccionNorma +
              this.pad(numeroCorrelativo);

            dfd.resolve(codigoCorrelativo);
          })
          .catch(error => {
            dfd.reject(error);
          });
      })
      .catch(error => {
        dfd.reject(error);
      });

    return dfd.promise;
  }

  public obtenerCorrelativoIncidente(esIncidente: boolean): Promise<string> {
    const dfd: Deferred<string> = new Deferred<string>();
    const endPoint = ECorrelativos.obtenerEndPointCorrelativoIncidente(
      esIncidente
    );

    let codigoCorrelativo = "";

    Funciones.ObtenerElementoPorRest(endPoint)
      .then(resultadoObtenerCorrelativo => {
        if (resultadoObtenerCorrelativo.length === 0) {
          let datosCorrelativo: any;

          if (esIncidente) {
            codigoCorrelativo = PrefijoTipoExpediente.Incidente + this.pad(1);
            datosCorrelativo = {
              TipoCorrelativo: TipoExpediente.Incidente,
              NumeroCorrelativo: 1
            };
          }

          Funciones.GuardarElemento(
            ParametrosNoAdministrables.Listas.Correlativos,
            datosCorrelativo
          )
            .then(resultadoRegistrar => {
              dfd.resolve(codigoCorrelativo);
            })
            .catch(error => {
              dfd.reject(error);
            });
          return;
        }

        this.setearValoresRest(resultadoObtenerCorrelativo[0]);
        const numeroCorrelativo = this.NumeroCorrelativo + 1;

        Funciones.ActualizarElemento(
          ParametrosNoAdministrables.Listas.Correlativos,
          { NumeroCorrelativo: numeroCorrelativo },
          this.ID
        )
          .then(resultadoRegistrar => {
            if (esIncidente) {
              codigoCorrelativo =
                PrefijoTipoExpediente.Incidente + this.pad(numeroCorrelativo);
            }

            dfd.resolve(codigoCorrelativo);
          })
          .catch(error => {
            dfd.reject(error);
          });
      })
      .catch(error => {
        dfd.reject(error);
      });

    return dfd.promise;
  }

  public obtenerCorrelativoProyecto(): Promise<string> {
    const dfd: Deferred<string> = new Deferred<string>();
    const endPoint = ECorrelativos.obtenerEndPointCorrelativoProyecto();

    let codigoCorrelativo = "";

    Funciones.ObtenerElementoPorRest(endPoint)
      .then(resultadoObtenerCorrelativo => {
        if (resultadoObtenerCorrelativo.length === 0) {
          let datosCorrelativo: any;

          codigoCorrelativo = PrefijoTipoExpediente.Proyecto + this.pad(1) + "-" + new Date().getFullYear();
          datosCorrelativo = {
            TipoCorrelativo: TipoExpediente.Proyecto,
            NumeroCorrelativo: 1
          };

          Funciones.GuardarElemento(
            "ADM_Correlativo",
            datosCorrelativo
          )
            .then(resultadoRegistrar => {
              dfd.resolve(codigoCorrelativo);
            })
            .catch(error => {
              dfd.reject(error);
            });
          return;
        }

        this.setearValoresRest(resultadoObtenerCorrelativo[0]);
        const numeroCorrelativo = this.NumeroCorrelativo + 1;

        Funciones.ActualizarElemento(
          "ADM_Correlativo",
          { NumeroCorrelativo: numeroCorrelativo },
          this.ID
        )
          .then(resultadoRegistrar => {
            codigoCorrelativo = PrefijoTipoExpediente.Proyecto + this.pad(numeroCorrelativo) + "-" + new Date().getFullYear();

            dfd.resolve(codigoCorrelativo);
          })
          .catch(error => {
            dfd.reject(error);
          });
      })
      .catch(error => {
        dfd.reject(error);
      });

    return dfd.promise;
  }

  public obtenerCorrelativoObservacion(): Promise<string> {
    const dfd: Deferred<string> = new Deferred<string>();
    const endPoint = ECorrelativos.obtenerEndPointCorrelativoObservacion();

    let codigoCorrelativo = "";

    Funciones.ObtenerElementoPorRest(endPoint)
      .then(resultadoObtenerCorrelativo => {
        if (resultadoObtenerCorrelativo.length === 0) {
          let datosCorrelativo: any;

          codigoCorrelativo = PrefijoTipoExpediente.Observacion + "-" + this.pad(1);
          datosCorrelativo = {
            TipoCorrelativo: TipoExpediente.Observacion,
            NumeroCorrelativo: 1
          };

          Funciones.GuardarElemento(
            "ADM_Correlativo",
            datosCorrelativo
          )
            .then(resultadoRegistrar => {
              dfd.resolve(codigoCorrelativo);
            })
            .catch(error => {
              dfd.reject(error);
            });
          return;
        }

        this.setearValoresRest(resultadoObtenerCorrelativo[0]);
        const numeroCorrelativo = this.NumeroCorrelativo + 1;

        Funciones.ActualizarElemento(
          "ADM_Correlativo",
          { NumeroCorrelativo: numeroCorrelativo },
          this.ID
        )
          .then(resultadoRegistrar => {
            codigoCorrelativo = PrefijoTipoExpediente.Observacion + "-" + this.pad(numeroCorrelativo);

            dfd.resolve(codigoCorrelativo);
          })
          .catch(error => {
            dfd.reject(error);
          });
      })
      .catch(error => {
        dfd.reject(error);
      });

    return dfd.promise;
  }

  public obtenerCorrelativoRecomendacion(): Promise<string> {
    const dfd: Deferred<string> = new Deferred<string>();
    const endPoint = ECorrelativos.obtenerEndPointCorrelativoRecomendacion();

    let codigoCorrelativo = "";

    Funciones.ObtenerElementoPorRest(endPoint)
      .then(resultadoObtenerCorrelativo => {
        if (resultadoObtenerCorrelativo.length === 0) {
          let datosCorrelativo: any;

          codigoCorrelativo = PrefijoTipoExpediente.Recomendacion + "-" + this.pad(1);
          datosCorrelativo = {
            TipoCorrelativo: TipoExpediente.Recomendacion,
            NumeroCorrelativo: 1
          };

          Funciones.GuardarElemento(
            "ADM_Correlativo",
            datosCorrelativo
          )
            .then(resultadoRegistrar => {
              dfd.resolve(codigoCorrelativo);
            })
            .catch(error => {
              dfd.reject(error);
            });
          return;
        }

        this.setearValoresRest(resultadoObtenerCorrelativo[0]);
        const numeroCorrelativo = this.NumeroCorrelativo + 1;

        Funciones.ActualizarElemento(
          "ADM_Correlativo",
          { NumeroCorrelativo: numeroCorrelativo },
          this.ID
        )
          .then(resultadoRegistrar => {
            codigoCorrelativo = PrefijoTipoExpediente.Recomendacion + "-" + this.pad(numeroCorrelativo);

            dfd.resolve(codigoCorrelativo);
          })
          .catch(error => {
            dfd.reject(error);
          });
      })
      .catch(error => {
        dfd.reject(error);
      });

    return dfd.promise;
  }

  public obtenerCorrelativoPlanAccion(): Promise<string> {
    const dfd: Deferred<string> = new Deferred<string>();
    const endPoint = ECorrelativos.obtenerEndPointCorrelativoPlanAccion();

    let codigoCorrelativo = "";

    Funciones.ObtenerElementoPorRest(endPoint)
      .then(resultadoObtenerCorrelativo => {
        if (resultadoObtenerCorrelativo.length === 0) {
          let datosCorrelativo: any;

          codigoCorrelativo = PrefijoTipoExpediente.PlanAccion + "-" + this.pad(1);
          datosCorrelativo = {
            TipoCorrelativo: TipoExpediente.PlanAccion,
            NumeroCorrelativo: 1
          };

          Funciones.GuardarElemento(
            "ADM_Correlativo",
            datosCorrelativo
          )
            .then(resultadoRegistrar => {
              dfd.resolve(codigoCorrelativo);
            })
            .catch(error => {
              dfd.reject(error);
            });
          return;
        }

        this.setearValoresRest(resultadoObtenerCorrelativo[0]);
        const numeroCorrelativo = this.NumeroCorrelativo + 1;

        Funciones.ActualizarElemento(
          "ADM_Correlativo",
          { NumeroCorrelativo: numeroCorrelativo },
          this.ID
        )
          .then(resultadoRegistrar => {
            codigoCorrelativo = PrefijoTipoExpediente.PlanAccion + "-" + this.pad(numeroCorrelativo);

            dfd.resolve(codigoCorrelativo);
          })
          .catch(error => {
            dfd.reject(error);
          });
      })
      .catch(error => {
        dfd.reject(error);
      });

    return dfd.promise;
  }

  public obtenerCorrelativoComentario(): Promise<string> {
    const dfd: Deferred<string> = new Deferred<string>();
    const endPoint = ECorrelativos.obtenerEndPointCorrelativoComentario();

    let codigoCorrelativo = "";

    Funciones.ObtenerElementoPorRest(endPoint)
      .then(resultadoObtenerCorrelativo => {
        if (resultadoObtenerCorrelativo.length === 0) {
          let datosCorrelativo: any;

          codigoCorrelativo = PrefijoTipoExpediente.Comentario + "-" + this.pad(1);
          datosCorrelativo = {
            TipoCorrelativo: TipoExpediente.Comentario,
            NumeroCorrelativo: 1
          };

          Funciones.GuardarElemento(
            "ADM_Correlativo",
            datosCorrelativo
          )
            .then(resultadoRegistrar => {
              dfd.resolve(codigoCorrelativo);
            })
            .catch(error => {
              dfd.reject(error);
            });
          return;
        }

        this.setearValoresRest(resultadoObtenerCorrelativo[0]);
        const numeroCorrelativo = this.NumeroCorrelativo + 1;

        Funciones.ActualizarElemento(
          "ADM_Correlativo",
          { NumeroCorrelativo: numeroCorrelativo },
          this.ID
        )
          .then(resultadoRegistrar => {
            codigoCorrelativo = PrefijoTipoExpediente.Comentario + "-" + this.pad(numeroCorrelativo);

            dfd.resolve(codigoCorrelativo);
          })
          .catch(error => {
            dfd.reject(error);
          });
      })
      .catch(error => {
        dfd.reject(error);
      });

    return dfd.promise;
  }

  public obtenerCorrelativoAvanceImplementacion(): Promise<string> {
    const dfd: Deferred<string> = new Deferred<string>();
    const endPoint = ECorrelativos.obtenerEndPointCorrelativoAvanceImplementacion();

    let codigoCorrelativo = "";

    Funciones.ObtenerElementoPorRest(endPoint)
      .then(resultadoObtenerCorrelativo => {
        if (resultadoObtenerCorrelativo.length === 0) {
          let datosCorrelativo: any;

          codigoCorrelativo = PrefijoTipoExpediente.AvanceImplementacion + "-" + this.pad(1);
          datosCorrelativo = {
            TipoCorrelativo: TipoExpediente.AvanceImplementacion,
            NumeroCorrelativo: 1
          };

          Funciones.GuardarElemento(
            "ADM_Correlativo",
            datosCorrelativo
          )
            .then(resultadoRegistrar => {
              dfd.resolve(codigoCorrelativo);
            })
            .catch(error => {
              dfd.reject(error);
            });
          return;
        }

        this.setearValoresRest(resultadoObtenerCorrelativo[0]);
        const numeroCorrelativo = this.NumeroCorrelativo + 1;

        Funciones.ActualizarElemento(
          "ADM_Correlativo",
          { NumeroCorrelativo: numeroCorrelativo },
          this.ID
        )
          .then(resultadoRegistrar => {
            codigoCorrelativo = PrefijoTipoExpediente.AvanceImplementacion + "-" + this.pad(numeroCorrelativo);

            dfd.resolve(codigoCorrelativo);
          })
          .catch(error => {
            dfd.reject(error);
          });
      })
      .catch(error => {
        dfd.reject(error);
      });

    return dfd.promise;
  }

  public obtenerCorrelativoEncuesta(): Promise<string> {
    const dfd: Deferred<string> = new Deferred<string>();
    const endPoint = ECorrelativos.obtenerEndPointCorrelativoEncuesta();

    let codigoCorrelativo = "";

    Funciones.ObtenerElementoPorRest(endPoint)
      .then(resultadoObtenerCorrelativo => {
        if (resultadoObtenerCorrelativo.length === 0) {
          let datosCorrelativo: any;

          codigoCorrelativo = PrefijoTipoExpediente.Encuesta + this.pad(1);
          datosCorrelativo = {
            TipoCorrelativo: TipoExpediente.Encuesta,
            NumeroCorrelativo: 1
          };

          Funciones.GuardarElemento(
            ParametrosNoAdministrables.Listas.Correlativos,
            datosCorrelativo
          )
            .then(resultadoRegistrar => {
              dfd.resolve(codigoCorrelativo);
            })
            .catch(error => {
              dfd.reject(error);
            });
          return;
        }

        this.setearValoresRest(resultadoObtenerCorrelativo[0]);
        const numeroCorrelativo = this.NumeroCorrelativo + 1;

        Funciones.ActualizarElemento(
          ParametrosNoAdministrables.Listas.Correlativos,
          { NumeroCorrelativo: numeroCorrelativo },
          this.ID
        )
          .then(resultadoRegistrar => {
            codigoCorrelativo =
              PrefijoTipoExpediente.Encuesta + this.pad(numeroCorrelativo);

            dfd.resolve(codigoCorrelativo);
          })
          .catch(error => {
            dfd.reject(error);
          });
      })
      .catch(error => {
        dfd.reject(error);
      });

    return dfd.promise;
  }

  public setearValores(elementoItemLista: SP.ListItem) {
    const campos = ECorrelativos.Campos;
    this.NumeroCorrelativo = ParseJsom.parsearNumber(
      elementoItemLista,
      campos.NumeroCorrelativo
    );
  }

  public setearValoresRest(elementoItemLista: any) {
    const campos = ECorrelativos.Campos;
    this.ID = elementoItemLista[campos.ID];
    this.NumeroCorrelativo = elementoItemLista[campos.NumeroCorrelativo];
  }
}

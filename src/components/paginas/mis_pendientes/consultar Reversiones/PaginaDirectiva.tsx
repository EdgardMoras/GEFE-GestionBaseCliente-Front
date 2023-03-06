import * as React from "react";

import { Grupo } from "src/models/Base/Grupo";
import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import PaginaBase from "../../../ui/pagecontrol/PaginaBase";
import { Deferred } from "ts-deferred";
import Funciones from "src/genericos/Funciones";
import { loadPageContext } from "sp-rest-proxy/dist/utils/env";
import EElementoPeoplePicker from '../../../../models/logicas/EElementoPeoplePicker';

class PaginaDirectiva<P, S> extends PaginaBase<P, S>
{
  public static obtenerUsuarioPorEmail(emailUsuario: string, idUsuario?: number): Promise<EElementoPeoplePicker | null> {
    const dfd: Deferred<EElementoPeoplePicker | null> = new Deferred<EElementoPeoplePicker | null>();

    if (emailUsuario.trim().length === 0) {
      dfd.resolve(null);
    } else {
      emailUsuario = emailUsuario.toUpperCase();

      const promesas: Array<Promise<any>> = [];

      const endPointObtenerDatosEmpresaUsuario = `/_api/search/query?querytext='WorkEmail:${emailUsuario}'&rowlimit=10&startrow=0&trimduplicates=false&selectproperties='Title,PreferredName,WorkEmail,OfficeNumber,Department,JobTitle,Manager,PublicSiteRedirectCustom'&sourceid=%27B09A7990-05EA-4AF9-81EF-EDFAB16C4E31%27`;
      promesas.push(Funciones.ObtenerElementoPorRest(endPointObtenerDatosEmpresaUsuario, true));

      if (!idUsuario || (idUsuario && idUsuario < 1)) {
        promesas.push(Funciones.BuscarUsuarioPorLoginName(emailUsuario));
      }

      Promise.all(promesas)
        .then(([resultadoPromesa1, resultadoPromesa2]) => {

          const listaResultados: EElementoPeoplePicker[] = [];

          resultadoPromesa1.data.PrimaryQueryResult.RelevantResults.Table.Rows.forEach(
            (element: any) => {
              const titulo = element.Cells.filter((keyValor: any) => {
                return keyValor.Key === "PreferredName";
              })[0].Value;
              const email = element.Cells.filter((keyValor: any) => {
                return keyValor.Key === "WorkEmail";
              })[0].Value;

              const empresa = element.Cells.filter((keyValor: any) => {
                return keyValor.Key === "OfficeNumber";
              })[0].Value;

              const puesto = element.Cells.filter((keyValor: any) => {
                return keyValor.Key === "JobTitle";
              })[0].Value;

              let division = "";
              let area = "";
              const divisionArea = element.Cells.filter((keyValor: any) => {
                return keyValor.Key === "PublicSiteRedirectCustom";
              })[0].Value;

              if (divisionArea) {
                let divisionAreaLimpio = divisionArea.trim().toString();

                if (divisionAreaLimpio.toUpperCase().indexOf("HTTP://") > 0 ||
                  divisionAreaLimpio.toUpperCase().indexOf("HTTPS://") > 0 ||
                  divisionAreaLimpio.toUpperCase().indexOf(".HTML") > 0 ||
                  divisionAreaLimpio.toUpperCase().indexOf("WWW.") > 0) {

                  const regExHttp = new RegExp("HTTP://", "ig");
                  const regExHttps = new RegExp("HTTPS://", "ig");
                  const regExHtml = new RegExp("HTML", "ig");
                  const regExWww = new RegExp("WWW.", "ig");

                  divisionAreaLimpio = divisionAreaLimpio.replace(regExHttp, "");
                  divisionAreaLimpio = divisionAreaLimpio.replace(regExHttps, "");
                  divisionAreaLimpio = divisionAreaLimpio.replace(regExHtml, "");
                  divisionAreaLimpio = divisionAreaLimpio.replace(regExWww, "");
                }

                const valorPipe = divisionAreaLimpio.toString().split("|");
                const valorGuion = divisionAreaLimpio.toString().split("-");
                const valor = (valorPipe.length > 0 ? valorPipe : (valorGuion.length > 0 ? valorGuion : ""));

                if (valor.length > 0) {
                  division = valor[0];
                }
                if (valor.length > 1) {
                  area = valor[1];
                }
              }

              const valorUsuario = new EElementoPeoplePicker(
                true,
                0,
                titulo,
                email
              );
              valorUsuario.setEmpresa = empresa;
              valorUsuario.setPuesto = puesto;
              valorUsuario.setDivision = division;
              valorUsuario.setArea = area;

              listaResultados.push(valorUsuario);
            }
          );

          if (listaResultados.length === 0) {
            dfd.resolve(null);
          }
          else {
            const usuario = listaResultados[0];

            if (!idUsuario || (idUsuario && idUsuario < 1)) {
              usuario.ID = resultadoPromesa2;
            }

            dfd.resolve(usuario);
          }
        });
    }

    return dfd.promise;
  }

  public static obtenerDatosEmpresaUsuario(emailUsuario: string, objetoUsuario: EElementoPeoplePicker): Promise<boolean> {
    const dfd: Deferred<any> = new Deferred<any>();

    this.obtenerUsuarioPorEmail(emailUsuario, objetoUsuario.ID).then((usuarioResponsableTenant: EElementoPeoplePicker) => {
      if (usuarioResponsableTenant) {
        objetoUsuario.setArea = usuarioResponsableTenant.getArea;
        objetoUsuario.setDivision = usuarioResponsableTenant.getDivision;
        objetoUsuario.setEmpresa = usuarioResponsableTenant.getEmpresa;
        objetoUsuario.setPuesto = usuarioResponsableTenant.getPuesto;

        objetoUsuario.Title = usuarioResponsableTenant.Title;
      }

      dfd.resolve(true);
    }).catch((error: any) => {
      dfd.reject(error);
    });

    return dfd.promise;
  }

  constructor(props: P) {
    super(props);
  }

  public validarUsuarioPerteneceGrupo1(): boolean {
    if (this.estado.datosUsuario.esGrupo1) {
      return true;
    }
    return false;
  }

  public validarUsuarioPerteneceGrupo1oGrupo2oGrupo3(): boolean {
    if (
      this.estado.datosUsuario.esGrupo1 ||
      this.estado.datosUsuario.esGrupo2 ||
      this.estado.datosUsuario.esGrupo3
    ) {
      return true;
    }
    return false;
  }

  public validarGruposConfiguracionDirectivasNoExisten(listaGruposPerteneceUsuario: Grupo[]): string[] {
    const listaGruposConfiguracionNoExisten: string[] = [];

    ParametrosNoAdministrables.ModuloDirectivas.ListaGrupos.forEach(nombreGrupo => {
      const listaGrupoCoinciden = listaGruposPerteneceUsuario.filter(grupo => {
        return grupo.Title.toUpperCase() === nombreGrupo.toUpperCase();
      }
      );

      if (listaGrupoCoinciden.length === 0) {
        listaGruposConfiguracionNoExisten.push(nombreGrupo);
      }
    }
    );

    return listaGruposConfiguracionNoExisten;
  }

  public validarGruposConfiguracionDirectivasPerteneceUsuario(listaGruposPerteneceUsuario: Grupo[]): void {
    listaGruposPerteneceUsuario.forEach(grupo => {
      if (grupo.Title.toUpperCase() === ParametrosNoAdministrables.ModuloDirectivas.Grupos.Grupo1.toUpperCase()) {
        this.estado.datosUsuario.esGrupo1 = true;
      }
      else if (grupo.Title.toUpperCase() === ParametrosNoAdministrables.ModuloDirectivas.Grupos.Grupo2.toUpperCase()) {
        this.estado.datosUsuario.esGrupo2 = true;
      }
    }
    );
  }

  public validarAccesoPaginaAuditora(): Promise<boolean> {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    loadPageContext().then(async _ => {
      const listaGruposPerteneceUsuario: Grupo[] = [];
      const listaTodosGrupos: Grupo[] = [];
      Funciones.obtenerGruposPerteneceUsuario(_spPageContextInfo.userId, listaGruposPerteneceUsuario, listaTodosGrupos).then(resultado => {

        const grupoAdminitradoresAudirotira = listaTodosGrupos.filter(grupo => {
          return (grupo.Title.toUpperCase() === ParametrosNoAdministrables.ModuloDirectivas.Grupos.Grupo1.toUpperCase());
        })[0];

        const grupoUsuarioSistema = listaTodosGrupos.filter(grupo => {
          return (grupo.Title.toUpperCase() === ParametrosNoAdministrables.ModuloDirectivas.Grupos.Grupo2.toUpperCase());
        })[0];




        const idgrupoAdminitradoresAudirotira = grupoAdminitradoresAudirotira.ID;
        const idgrupoUsuarioSistema = grupoUsuarioSistema.ID;

        Promise.all([
          Funciones.obtenerUsuariosPertenecenGrupo(idgrupoAdminitradoresAudirotira),
          Funciones.obtenerUsuariosPertenecenGrupo(idgrupoUsuarioSistema),
          Funciones.ObtenerUsuarioActual()
        ])
          .then(
            ([
              listaUsuariosPertenecenGrupoCumplimientoNormativo,
              listaUsuariosPertenecenGrupoResponsablesExpendientesProvincia,
              datosUsuarioActual
            ]) => {
              this.validarGruposConfiguracionDirectivasPerteneceUsuario(listaGruposPerteneceUsuario);

              this.estado.datosUsuario.listaGruposPerteneceUsuario = listaGruposPerteneceUsuario;
              this.estado.datosUsuario.listaUsuarioGrupo1 = listaUsuariosPertenecenGrupoCumplimientoNormativo;
              this.estado.datosUsuario.listaUsuarioGrupo2 = listaUsuariosPertenecenGrupoResponsablesExpendientesProvincia;
              this.estado.datosUsuario.usuario = datosUsuarioActual;

              dfd.resolve(true);
            }
          ).catch(error => {
            this.MostrarMensajeError("obtenerUsuariosPertenecenGrupo", error);
            dfd.reject(false);
          });
      }).catch(error => {
        this.MostrarMensajeError("obtenerGruposPerteneceUsuario", error);
        dfd.reject(false);
      });
    }).catch(error => {
      this.MostrarMensajeError("loadPageContext", error);
      dfd.reject(false);
    });

    return dfd.promise;
  }

  public render() {
    return <div>{super.render()}</div>;
  }
}

export default PaginaDirectiva;

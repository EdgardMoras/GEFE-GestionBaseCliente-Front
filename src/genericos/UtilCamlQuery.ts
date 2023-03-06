export class UtilCamlQuery {
  public static EstructurasQuery = {
    AndAbrir: "<And>",
    AndCerrar: "</And>",
    OrAbrir: "<Or>",
    OrCerrar: "</Or>",
    OrderByAbrir: "<OrderBy>",
    OrderByCerrar: "</OrderBy>"
  };

  public static getFieldRef(field: string): string {
    return `<FieldRef Name='${field}' />`;
  }

  public static getFieldRefOrderBy(
    field: string,
    esAscendente: boolean
  ): string {
    const textoTipoOrdenamiento = esAscendente ? "True" : "False";
    return `<FieldRef Name='${field}' Ascending='${textoTipoOrdenamiento}'/>`;
  }

  public static obtenerEstructuraQuerySimple(
    subQuery: string,
    viewFields: string,
    orderBy?: string
  ): string {

    let query = `<View><Query><Where>${subQuery}</Where></Query><ViewFields>${viewFields}</ViewFields><RowLimit>100</RowLimit></View>`;

    if (orderBy) {
      query = `<View><Query><Where>${subQuery}</Where>${orderBy}</Query><ViewFields>${viewFields}</ViewFields><RowLimit>100</RowLimit></View>`;
    }

    return query;
  }

  public static obtenerEstructuraQueryConPaginacion(
    subQuery: string,
    viewFields: string,
    orderBy: string,
    cantidadElementoPorPagina: number
  ): string {
    const query = `<View><Query><Where>${subQuery}
    "</Where>${orderBy}</Query><ViewFields>${viewFields}</ViewFields><RowLimit>${cantidadElementoPorPagina}</RowLimit></View>`;

    return query;
  }
}

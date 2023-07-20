
export const contarObjetos = (arreglo, propiedad, valor) => {
    const objetosFiltrados = arreglo.filter(objeto => objeto[propiedad] === valor);
    return objetosFiltrados.length;
  };
  
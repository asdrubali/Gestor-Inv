import Papa from "papaparse";

export const downloadData = ( data ) => {

    if(data.length <= 0 ) return;

    try {
        const csv = Papa.unparse(data);
        const csvDataUri = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
        const link = document.createElement('a');
        link.setAttribute('href', csvDataUri);
        link.setAttribute('download', 'archivo.csv');
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log('Archivo CSV generado y descargado correctamente');
      } catch (error) {
        console.error('Error al generar o descargar el archivo CSV:', error);
      }

}

  
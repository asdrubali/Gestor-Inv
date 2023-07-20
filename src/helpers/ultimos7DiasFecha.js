import { format, sub } from "date-fns";



export const obtenerFechasUltimos7Dias = () => {
    const fechaActual = new Date();
    const fechas = [];

    for (let i = 6; i >= 0; i--) {
      const fecha = sub(fechaActual, { days: i });
      const fechaFormateada = format(fecha, 'dd-MM');
      fechas.push(fechaFormateada);
    }

    return fechas
}
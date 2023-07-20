import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { useGestorStore } from '../../../hooks';
import { format, sub } from 'date-fns';
import { obtenerFechasUltimos7Dias } from '../../../helpers/ultimos7DiasFecha';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);


export const Gline = () => {

  const { products } = useGestorStore();

  const ultimos7D = obtenerFechasUltimos7Dias();

  const ultimosVencidos = products.filter( product => (new Date(product.fecha_vencimiento) <= new Date() && new Date(product.fecha_vencimiento) >= sub(new Date(), { days: 8 } ) ))

  const _data = ultimos7D.reduce((obj, fecha) => {
    obj[fecha] = ultimosVencidos.filter(p => format(new Date(p.fecha_vencimiento), 'dd-MM') === fecha).length;
    return obj;
  }, {});
  

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
        min : 0
    },
    x: {
        ticks : { color: 'blue' }
    }
  },
  plugins: {
    legend: {
      position: false,
    }
  },
};

const dat = ultimosVencidos.map((e) => {
  if( ultimos7D.includes( format(new Date(e.fecha_vencimiento), 'dd-MM') ) ) return e
});

console.log(dat);


const labels = Object.keys(_data);

const data = {
  labels,
  datasets: [
    {
      label: 'Vencidos',
      data: Object.values(_data),
      fill: true,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    },
  ],
};


  return <Line options={options} data={data} />;
};

import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export const Gbarra = ({indicadoresData}) => {
    

const misoptions = {
    responsive : true,
    maintainAspectRatio: false,
    plugins : {
        legend : {
            display : false
        }
    },
    scales : {
        y : {
            min : -25,
            max : 100
        },
        x: {
            ticks: { color: 'rgba(0, 220, 195)'}
        }
    }
}

const valor = indicadoresData.map(indicador => indicador.values);
const indicador = indicadoresData.map(indicador => indicador.name);



const midata = {
    labels: indicador,
    datasets: [
        {
            label: 'Productos',
            data: valor,
            backgroundColor: 'rgba(0, 220, 195, 0.5)'
        }
    ]
};


return <Bar data={midata} options={misoptions} />
}

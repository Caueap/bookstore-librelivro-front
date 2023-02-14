<template>
    <div>
        <barchart type="bar" width="500" :options="options" :series="series" class="chart"></barchart>
    </div>
</template>

<script>
import barchart from 'vue-apexcharts';

export default {
    name: 'BarChart',
    data() {
        return {
            options: {
                chart: {
                    id: 'barchart',
                },
                xaxis: { 
                    categories: [
                        'O Velho e o Mar',
                        'A Metamorfose',
                        'Harry Potter e a Pedra Filosofal',
                        'O Lobo da Estepe',
                        'Berserk',
                    ],
                    labels: {
                        show: false,
                        // trim: true,
                        // rotate: 0
                    },
                },

                // responsive: [
                //     {
                //         breakpoint: 700,
                //         options: {
                //             series: [30, 40, 45, 50, 60],
                //             chart: {
                //                 type: 'pie',
                //                 width: 200,
                //             },
                //         },
                        // labels: ['']
                        // options: {
                        //     chart: {
                        //         width: 250,
                        //         // height: '80%'
                        //     },
                        //     plotOptions: {
                        //         bar: {
                        //             horizontal: true
                        //         }
                        //     }
                        // },
                    
                

                colors: ['#00695c'],
            },
            series: [
                {
                    name: 'series-1',
                    data: [30, 40, 45, 50, 60],
                },
            ],
        };
    },
    components: {
        barchart,
    },
}

</script>
    
<style scoped>

/* @media (max-width: 400px) {
    .chart {
        width: 50%;
    }
} */



</style>

<template>
    <div class="pieChartComp">
        <piechart type="pie" :options="chartOptions" :series="series" class="chart"></piechart>
    </div>
</template>

<script>
import piechart from 'vue-apexcharts';
import rentals from '@/services/rentals';

export default {
    name: 'PieChart',
    data() {
        return {
            rentalsArray: [],
            series: [0, 0, 0],

            chartOptions: {
                labels: ['Entregues no prazo', 'Entregues com atraso', 'Alugados'],
                chart: {
                    type: 'pie',
                    id: 'piechart',
                },
                dataLabels: {
                    enabled: false,
                },

                title: {
                    text: 'Alugueis',
                    margin: 10,
                    offsetY: -15,
                    style: {
                        fontSize: '30px',
                        fontFamily: 'inter',
                        color: '#004D40',
                    },
                },
                plotOptions: {},
                fill: {
                    colors: ['#01579B', '#0277BD', '#0288D1', '#039BE5'],
                },
                legend: {
                    show: true,
                    position: 'top',
                    offsetY: -20,
                    // showForSingleSeries: true,
                    labels: [],
                },
                colors: ['#01579B', '#0277BD', '#0288D1', '#039BE5', '#29B6F6'],
            },
        };
    },
    mounted() {
        this.updateChart();
    },
    methods: {
        updateChart() {
            rentals.list().then((resposta) => {
                console.log('rentalsPie', resposta.data);
                this.rentalsArray = resposta.data;
                console.log('array:', this.rentalsArray);
                let count1 = 0;
                let count2 = 0;
                let count3 = 0;

                this.rentalsArray.forEach((a) => {
                    if (a.deliveryDate != null && a.deliveryDate <= a.expectedDeliveryDate) {
                        count1++;
                    }
                    if (a.deliveryDate > a.expectedDeliveryDate) {
                        count2++;
                    }
                    if (a.deliveryDate == null) {
                        count3++;
                    }
                });
                this.series = [count1, count2, count3];
            });
        },
        // updateChart() {
        //     books.listMostRented().then((resposta) => {
        //         console.log('newresbook', resposta.data);
        //         this.booksArray = resposta.data;

        //         this.series = [this.booksArray[0].rentedAmount,
        //         this.booksArray[1].rentedAmount,
        //         this.booksArray[2].rentedAmount,
        //         this.booksArray[3].rentedAmount,
        //         this.booksArray[4].rentedAmount]

        //         this.chartOptions.labels =  [this.booksArray[0].name,
        //         this.booksArray[1].name,
        //         this.booksArray[2].name,
        //         this.booksArray[3].name,
        //         this.booksArray[4].name]

        //     });
        // },
    },

    components: {
        piechart,
    },
};
</script>

<style scoped>

.pieChartComp {
    width: 520px;
}

@media screen and (min-width: 300px) and (max-width: 600px) {
    .pieChartComp {
        max-width: 480px;
    }
}


</style>

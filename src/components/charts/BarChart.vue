<template>
    <div class="main">
        <barchart type="bar" :options="options" :series="series" class="chart"></barchart>
    </div>
</template>

<script>
import barchart from 'vue-apexcharts';
import books from '@/services/books';

export default {
    name: 'BarChart',
    data() {
        return {
            booksArray: [],
            chartSet: [],
            options: {
                chart: {
                    type: 'bar',
                    id: 'barchart',
                    width: '100%',
                },
                title: {
                    text: 'Livros mais alugados',
                    margin: 10,
                    offsetY: -15,
                    style: {
                        fontSize: '30px',
                        fontFamily: 'inter',
                        color: '#004D40',
                    },
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '80%',
                    },
                },
                fill: {
                    colors: ['#01579B', '#0277BD', '#0288D1', '#039BE5', '#29B6F6'],
                },
                legend: {
                    show: true,
                    position: 'top',
                    offsetY: -20,
                    showForSingleSeries: true,
                    labels: {
                        
                    }
                },
                xaxis: {
                    categories: ['Livros mais alugados'],
                },

                colors: ['#01579B', '#0277BD', '#0288D1', '#039BE5', '#29B6F6'],
            },
            series: [
                {
                    name: '',
                    data: [0, 0, 0, 0, 0],
                },
            ],
        };
    },
    methods: {
        updateChart() {
            books.listMostRented().then((resposta) => {
                console.log('res', resposta.data);
                this.booksArray = resposta.data;
                this.xaxis = {
                    categories: ['Livros mais alugados'],
                };
                this.series = [
                    {
                        name: this.booksArray[0].name,
                        data: [this.booksArray[0].rentedAmount],
                    },
                    {
                        name: this.booksArray[1].name,
                        data: [this.booksArray[1].rentedAmount],
                    },
                    {
                        name: this.booksArray[2].name,
                        data: [this.booksArray[2].rentedAmount],
                    },
                    {
                        name: this.booksArray[3].name,
                        data: [this.booksArray[3].rentedAmount],
                    },
                    {
                        name: this.booksArray[4].name,
                        data: [this.booksArray[4].rentedAmount],
                    },
                ];
            });
        },
    },
    mounted() {
        this.updateChart();
    },
    components: {
        barchart,
    },
};
</script>

<style scoped>
/* @media screen and (min-width: 600px) and (max-width: 960px) {
        .main {
            width: 80%;
        }
    } */

.main {
    width: 650px;
}



@media screen and (min-width: 300px) and (max-width: 600px) {
    .main {
        max-width: 480px;
    }
}
</style>

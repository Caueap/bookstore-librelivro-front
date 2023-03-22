<template class="t">
    <div class="maindiv">
        <div class="content-div">
            <v-container fluid>
                <v-item-group class="itemgroup">
                    <v-row justify="space-around" class="space mainrow">

                        <v-col v-for="(info, index) in infos" :key="index" cols="12" lg="2" md="6" xl="2" sm="6" class="col">
                            <v-item>
                                <v-card class="d-flex align-center rounded-xl card" color="#004D40" height="200">
                                    <v-list-item three-line class="mt-10">
                                        <v-list-item-content>
                                            <div class="mb-4">
                                                <v-icon x-large color="white">{{ info.icon }}</v-icon>
                                            </div>
                                            <v-list-item-subtitle > {{ info.title }} </v-list-item-subtitle>
                                            <v-list-item-title class="mb-1"> {{ info.count }} </v-list-item-title>
                                            <strong></strong>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-card>
                            </v-item>
                        </v-col>

                        
                       

                    
                    </v-row>
                </v-item-group>
            </v-container>

            <div class="chartdiv">
                <div class="barchartdiv">
                    <BarChart />
                </div>
                <div class="piechartdiv">
                    <PieChart />
                </div>

                
            </div>
        </div>
    </div>
</template>

<script>
import BarChart from '@/components/charts/BarChart.vue';
import PieChart from '../charts/PieChart.vue';
import clients from '@/services/clients';
import publishers from '@/services/publishers';
import books from '@/services/books';
import rentals from '@/services/rentals';

export default {
    name: 'HomeComponent',
    components: {
        BarChart,
        PieChart
    },
    data: () => {
        return {
            clientsArray: [],
            publishersArray: [],
            booksArray: [],
            rentalsArray: [],
            infos: [
                {
                    icon: 'mdi mdi-account',
                    title: "Usuários",
                    count: 0
                },
                {
                    icon: 'mdi mdi-domain',
                    title: "Editoras",
                    count: 0
                },
                {
                    icon: 'mdi-book-open-blank-variant',
                    title: "Livros",
                    count: 0
                },
                {
                    icon: 'mdi-badge-account-horizontal-outline',
                    title: "Aluguéis",
                    count: 0
                }

            ],
           
        }
    },
    methods: {
                clientsList() {
                    clients.list().then((resposta) => {
                        console.log('clients', resposta.data)
                        this.clientsArray = resposta.data
                        this.infos[0].count = this.clientsArray.length
                    })

                },
                publishersList() {
                    publishers.list().then((resposta) => {
                        console.log('publishers', resposta.data)
                        this.publishersArray = resposta.data
                        this.infos[1].count = this.publishersArray.length
                    })

                },
                booksList() {
                    books.list().then((resposta) => {
                        console.log('books', resposta.data)
                        this.booksArray = resposta.data
                        this.infos[2].count = this.booksArray.length
                    })

                },
                rentalsList() {
                    rentals.list().then((resposta) => {
                        console.log('rentals', resposta.data)
                        this.rentalsArray = resposta.data
                        this.infos[3].count = this.rentalsArray.length
                    })

                },

            },
            mounted() {
                this.clientsList(),  this.publishersList(), this.booksList(), this.rentalsList();

            }
};
</script>

<style scoped>
.maindiv {
    background-color: #00695c;
    /* height: 100%; */
}

.content-div {
    margin: 35px 100px;
    background-color: #fff;
    /* height: 85vh; */
}

.mainrow {
    justify-content: space-between;
}

.v-card {
    width: 220px;
}

.v-list-item__subtitle {
    font-size: 28px;
}

/*Esse seletor vem por padrão no v-list-item__subtitle, e seta a cor do subtitle pra preta. Aqui, o seletor padrão
é sobrescrevido e a cor é setada pra branca. Isso tem que ser feito pois esse seletor é padrão do componente, colocar
uma classe no componente e colocar a cor branca não funciona por que esse seletor tem prioridade*/
.theme--light.v-list-item:not(.v-list-item--disabled) .v-list-item__subtitle,
.theme--light.v-list-item:not(.v-list-item--disabled) .v-list-item__action-text {
    color: #fff;
}

.v-list-item__title {
    font-size: 32px;
    color: #fff;
}

.chartdiv {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
    
}

/* .barchartdiv {
 width: 100%;
 height: 450px;
 max-width: 650px;
 margin-left: 180px;
 margin-top: 80px;
}

.piechartdiv {
    margin-right: 200px;
    margin-top: 80px;
    width: 100%;
    max-width: 650px;
    height: 450px;
    padding-left: 100px;
} */


@media screen and (max-width: 1260px) {
    .card{
        width: 500px;
    }
    
}

@media screen and (max-width: 1110px) {
    
    .col{
        flex-wrap: wrap;

    }
}

@media screen and (min-width: 1420px) {
    
    .chartdiv {
        justify-content: center;
    }
}

@media screen and (max-width: 1270px) {
    
    .chartdiv {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}



/* @media screen and (min-width: 600px) and (max-width: 960px) {

    .barchartdiv {
        margin: auto;
        margin-top: 50px;
    }
} */

@media screen and (min-width: 600px) and (max-width: 960px) {

.content-div {
    margin: 50px 50px
}
}

@media screen and (max-width: 750px) {

    .chartdiv {
        width: 320px;
    }
}


/* @media screen and (min-width: 300px) and (max-width: 600px) {
    .barchartdiv {
        margin: auto;
        margin-top: 50px;
    }
} */

/* @media screen and (min-width: 300px) and (max-width: 600px) {
    .content-div {
        height: 100vh;
        margin: 20px 20px;
    }
} */



/* @media screen and (max-width: 599px) {

    .v-card {
    width: 100%; 
    height: 300px; 
}

} */


/* .itemtitle {
    color: #fff;
    font-size: 32px;
} */

/* .theme--light.v-list-item:not(.v-list-item--disabled) .v-list-item__subtitle,
.theme--light.v-list-item:not(.v-list-item--disabled) .v-list-item__action-text {
    color: #fff;
} */

/* .subtitle {
    font-size: 26px;
} */

/* .card {
        width: fit-content;
    } */

/* .colchart {
    margin: 50px 0px 20px 75px;
}*/

/* @media (max-width: 380px) {
    .colchart {
        margin: auto;
    }
}  */
</style>

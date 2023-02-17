<template class="t">
    <div class="maindiv">
        <div class="content-div">
            <v-container fluid>
                <v-item-group class="itemgroup">
                    <v-row justify="space-around" class="space mainrow">
                        <v-col cols="12" md="2" xl="2" sm="6" class="col">
                            <v-item>
                                <v-card class="d-flex align-center rounded-xl card" color="#004D40" height="200">
                                    <v-list-item three-line class="mt-10">
                                        <v-list-item-content>
                                            <div class="mb-4">
                                                <v-icon x-large color="white">mdi mdi-account</v-icon>
                                            </div>
                                            <v-list-item-subtitle> Usuários </v-list-item-subtitle>
                                            <v-list-item-title class="mb-1">52 </v-list-item-title>
                                            <strong></strong>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-card>
                            </v-item>
                        </v-col>

                        <v-col cols="12" md="2" xl="2" sm="6" class="col">
                            <v-item>
                                <v-card class="d-flex align-center rounded-xl card" color="#004D40" height="200">
                                    <v-row>
                                        <v-col cols="12" sm="12">
                                            <v-list-item three-line class="mt-10">
                                                <v-list-item-content>
                                                    <div class="mb-4">
                                                        <v-icon x-large color="white">mdi mdi-domain</v-icon>
                                                    </div>
                                                    <v-list-item-subtitle> Editoras </v-list-item-subtitle>
                                                    <v-list-item-title class="mb-1" color="#fff">20 </v-list-item-title>
                                                    <strong></strong>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-item>
                        </v-col>

                        <v-col cols="12" md="2" xl="2" sm="6" class="col">
                            <v-item>
                                <v-card class="d-flex align-center rounded-xl card" color="#004D40" height="200">
                                    <v-row>
                                        <v-col cols="12" sm="12">
                                            <v-list-item three-line class="mt-10">
                                                <v-list-item-content>
                                                    <div class="mb-4">
                                                        <v-icon x-large color="white"
                                                            >mdi-book-open-blank-variant</v-icon
                                                        >
                                                    </div>
                                                    <v-list-item-subtitle> Livros </v-list-item-subtitle>
                                                    <v-list-item-title class="mb-1" color="#fff"
                                                        >129
                                                    </v-list-item-title>
                                                    <strong></strong>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-item>
                        </v-col>

                        <v-col cols="12" md="2" xl="2" sm="6" class="col">
                            <v-item>
                                <v-card class="d-flex align-center rounded-xl card" color="#004D40" height="200">
                                    <v-row>
                                        <v-col cols="12" sm="12">
                                            <v-list-item three-line class="mt-10">
                                                <v-list-item-content>
                                                    <div class="mb-4">
                                                        <v-icon x-large color="white"
                                                            >mdi-badge-account-horizontal-outline</v-icon
                                                        >
                                                    </div>
                                                    <v-list-item-subtitle> Aluguéis </v-list-item-subtitle>
                                                    <v-list-item-title class="mb-1" color="#fff">35 </v-list-item-title>
                                                    <strong></strong>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-item>
                        </v-col>
                    </v-row>
                </v-item-group>
            </v-container>

            <div class="chartdiv">
                <BarChart />
            </div>
        </div>
    </div>
</template>

<script>
import BarChart from '@/components/charts/BarChart.vue';

export default {
    name: 'HomeComponent',
    components: {
        BarChart,
    },
};
</script>

<style scoped>
.maindiv {
    background-color: #00695c;
    height: 100%;
}

.content-div {
    margin: 35px 100px;
    background-color: #fff;
    height: 85vh;
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
 width: 100%;
 max-width: 500px;
 margin-left: 70px;
 margin-top: 80px;
}

@media screen and (min-width: 600px) and (max-width: 960px) {

    .chartdiv {
        margin: auto;
        margin-top: 50px;
    }
}

@media screen and (min-width: 600px) and (max-width: 960px) {

.content-div {
    margin: 50px 50px
}
}


@media screen and (min-width: 300px) and (max-width: 600px) {
    .chartdiv {
        margin: auto;
        margin-top: 50px;
    }
}

@media screen and (min-width: 300px) and (max-width: 600px) {
    .content-div {
        height: 100vh;
        margin: 20px 20px;
    }
}


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

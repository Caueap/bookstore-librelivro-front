<template class="t">
    <div class="maindiv">
        <div class="item-group-div">
            <v-item-group mandatory>
                <v-container>
                    <v-row justify="space-around" class="space mainrow">
                        <v-col cols="12" md="2">
                            <v-item></v-item>
                            <v-card class="d-flex align-center rounded-xl" color="#004D40" height="200">
                                <v-row>
                                    <v-col cols="12" sm="12">
                                        <v-list-item three-line class="mt-10">
                                            <v-list-item-content>
                                                <div class="mb-4">
                                                    <v-icon x-large color="white">mdi mdi-account</v-icon>
                                                </div>
                                                <v-list-item-subtitle class="subtitle-color">
                                                    Usuários
                                                </v-list-item-subtitle>
                                                <v-list-item-title class="headline mb-1 title-color" color="#fff"
                                                    >52
                                                </v-list-item-title>
                                                <strong></strong>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                        <v-col cols="12" md="2">
                            <v-item></v-item>
                            <v-card class="d-flex align-center rounded-xl" color="#004D40" height="200">
                                <v-row>
                                    <v-col cols="12" sm="12">
                                        <v-list-item three-line class="mt-10">
                                            <v-list-item-content>
                                                <div class="mb-4">
                                                    <v-icon x-large color="white">mdi mdi-domain</v-icon>
                                                </div>
                                                <v-list-item-subtitle class="subtitle-color">
                                                    Editoras
                                                </v-list-item-subtitle>
                                                <v-list-item-title class="headline mb-1 title-color" color="#fff"
                                                    >20
                                                </v-list-item-title>
                                                <strong></strong>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                        <v-col cols="12" md="2">
                            <v-item></v-item>
                            <v-card class="d-flex align-center rounded-xl" color="#004D40" height="200">
                                <v-row>
                                    <v-col cols="12" sm="12">
                                        <v-list-item three-line class="mt-10">
                                            <v-list-item-content>
                                                <div class="mb-4">
                                                    <v-icon x-large color="white">mdi-book-open-blank-variant</v-icon>
                                                </div>
                                                <v-list-item-subtitle class="subtitle-color">
                                                    Livros
                                                </v-list-item-subtitle>
                                                <v-list-item-title class="headline mb-1 title-color" color="#fff"
                                                    >129
                                                </v-list-item-title>
                                                <strong></strong>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                        <v-col cols="12" md="2">
                            <v-item></v-item>
                            <v-card class="d-flex align-center rounded-xl" color="#004D40" height="200">
                                <v-row>
                                    <v-col cols="12" sm="12">
                                        <v-list-item three-line class="mt-10">
                                            <v-list-item-content>
                                                <div class="mb-4">
                                                    <v-icon x-large color="white"
                                                        >mdi-badge-account-horizontal-outline</v-icon
                                                    >
                                                </div>
                                                <v-list-item-subtitle class="subtitle-color">
                                                    Aluguéis
                                                </v-list-item-subtitle>
                                                <v-list-item-title class="headline mb-1 title-color" color="#fff"
                                                    >35
                                                </v-list-item-title>
                                                <strong></strong>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-item-group>

            <div class="colchart">
                <colchart type="bar" width="500" :options="options" :series="series"></colchart>
            </div>
        </div>
    </div>
</template>

<script>
import colchart from 'vue-apexcharts';

export default {
    name: 'HomeComponent',
    data() {
        return {
            options: {
                chart: {
                    id: 'vuechart-example',
                },
                xaxis: {
                    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
                },
                colors: ['#00695c']
            },
            series: [
                {
                    name: 'series-1',
                    data: [30, 40, 45, 50, 49, 60, 70, 91],  
                },

            ],
            
        };
    },
    components: {
        colchart,
    },
};
</script>

<style scoped>
.maindiv {
    background-color: #00695c;
    height: 100%;
}

.item-group-div {
    margin: 25px 50px 50px 50px;
    background-color: #fff;
    height: 92%;
}

.mainrow {
    justify-content: space-between;
}

.title-color {
    color: #fff;
}

.theme--light.v-list-item:not(.v-list-item--disabled) .v-list-item__subtitle,
.theme--light.v-list-item:not(.v-list-item--disabled) .v-list-item__action-text {
    color: #fff;
}

.colchart {
    margin: 50px 0px 20px 75px
}
</style>

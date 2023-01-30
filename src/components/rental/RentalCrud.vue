<template>
    <div>
        <template>
            <template>
                <v-dialog v-model="dialog" max-width="500" persistent>
                    <v-card>
                        <v-card-title>Novo Aluguel</v-card-title>
                        <v-card-text>
                            <v-form class="px-3" ref="form">
                                <v-select
                                    v-model="rental.bookModel"
                                    :rules="[rules.required]"
                                    :items="booksArray"
                                    item-text="name"
                                    item-value="id"
                                    label="Livro"
                                    required
                                ></v-select>
                                <v-select
                                    v-model="rental.clientModel"
                                    :rules="[rules.required]"
                                    :items="clientsArray"
                                    item-text="name"
                                    item-value="id"
                                    label="Usuário"
                                    required
                                ></v-select>
                                <v-menu
                                    ref="menu"
                                    v-model="menu"
                                    :close-on-content-click="false"
                                    :return-value.sync="rental.rentalDate"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="formattedRentalDate"
                                            label="Data de aluguel"
                                            append-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                            :rules="[rules.required, rules.maxDate]"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="rental.rentalDate"
                                        no-title
                                        scrollable
                                        locale="pt-br"
                                        :min="todayDate"
                                        :max="todayDate"
                                    >
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
                                        <v-btn text color="primary" @click="$refs.menu.save(rental.rentalDate)">
                                            OK
                                        </v-btn>
                                    </v-date-picker>
                                </v-menu>
                                <v-menu
                                    ref="menu2"
                                    v-model="menu2"
                                    :close-on-content-click="false"
                                    :return-value.sync="rental.expectedDeliveryDate"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="formattedExpectedDeliveryDate"
                                            label="Data esperada de devolução"
                                            append-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                            :rules="[rules.required]"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="rental.expectedDeliveryDate"
                                        no-title
                                        scrollable
                                        locale="pt-br"
                                        :min="rental.rentalDate"
                                    >
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="menu2 = false"> Cancel </v-btn>
                                        <v-btn
                                            text
                                            color="primary"
                                            @click="$refs.menu2.save(rental.expectedDeliveryDate)"
                                        >
                                            OK
                                        </v-btn>
                                    </v-date-picker>
                                </v-menu>
                                <!-- <v-menu
                                    ref="menu3"
                                    v-model="menu3"
                                    :close-on-content-click="false"
                                    :return-value.sync="rental.deliveryDate"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                    v-if="up2"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="rental.deliveryDate"
                                            label="Data de devolução"
                                            append-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                            v-if="up2"
                                            :rules="[rules.required]"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="rental.deliveryDate" no-title locale="pt-br" scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="menu3 = false"> Cancel </v-btn>
                                        <v-btn text color="primary" @click="$refs.menu3.save(rental.deliveryDate)">
                                            OK
                                        </v-btn>
                                    </v-date-picker>
                                </v-menu> -->
                                <!-- <v-menu>
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                            label="Data de locação"
                                            :value="rental.rentalDate"
                                            append-icon="mdi-calendar"
                                            slot="activator"
                                            v-on="on"
                                            :rules="[rules.required, rules.minLength, rules.maxLength]"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="rental.rentalDate" scrollable color="teal darken-4">
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
                                        <v-btn text color="primary" @click="$refs.dialog.save(date)"> OK </v-btn>
                                    </v-date-picker>
                                </v-menu>
                                <v-menu>
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                            label="Data esperada de devolução"
                                            :value="rental.expectedDeliveryDate"
                                            append-icon="mdi-calendar"
                                            slot="activator"
                                            v-on="on"
                                            :rules="[rules.required, rules.minLength]"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="rental.expectedDeliveryDate"
                                        scrollable
                                        color="teal darken-4"
                                    >
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
                                        <v-btn text color="primary" @click="$refs.dialog.save(date)"> OK </v-btn>
                                    </v-date-picker>
                                </v-menu>
                                <v-menu v-if="up">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                            label="Data de devolução"
                                            :value="rental.deliveryDate"
                                            append-icon="mdi-calendar"
                                            slot="activator"
                                            v-on="on"
                                            :rules="[rules.required, rules.minLength]"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="rental.deliveryDate" scrollable color="teal darken-4">
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
                                        <v-btn text color="primary" @click="$refs.dialog.save(date)"> OK </v-btn>
                                    </v-date-picker>
                                </v-menu> -->
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="error" text @click="closeC">Fechar</v-btn>
                            <v-btn color="primary" text @click="save">Salvar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </template>
            <v-card>
                <v-card-title>
                    Alugueis
                    <v-divider></v-divider>
                    <v-btn class="ma-2 teal darken-4 white--text" rounded @click="dialog = true">Cadastrar</v-btn>
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Pesquisar" single-line hide-details>
                    </v-text-field>
                </v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="rentalsArray"
                    :search="search"
                    class="elevation-1"
                    items-per-page="5"
                >
                    <!-- <template v-slot:[`item.rentalDate`]="{ item }"> {{ parseDate(item.rentalDate) }} </template>
                    <template v-slot:[`item.expectedDeliveryDate`]="{ item }">
                        {{ parseDate(item.expectedDeliveryDate) }}
                    </template>
                    <template v-slot:[`item.deliveryDate`]="{ item }"> {{ parseDate(item.deliveryDate) }} </template> -->
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-tooltip top color="#0061A3">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    color="primary"
                                    v-bind="attrs"
                                    v-on="on"
                                    text
                                    small
                                    rounded
                                    v-show="item.status == 'Pendente'"
                                    @click="deliveryFirst(item)"
                                >
                                    <v-icon dark>mdi-package-check</v-icon>
                                </v-btn>
                            </template>
                            <span>Devolver</span>
                        </v-tooltip>
                        <v-tooltip top color="red">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    color="error"
                                    v-bind="attrs"
                                    v-on="on"
                                    text
                                    small
                                    rounded
                                    v-show="item.status != 'Pendente'"
                                    @click="remove(item)"
                                >
                                    <v-icon dark>mdi-delete</v-icon>
                                </v-btn>
                            </template>
                            <span>Remover</span>
                        </v-tooltip>
                    </template>
                </v-data-table>
            </v-card>
        </template>
    </div>
</template>

<script>
import rentals from '@/services/rentals';
import books from '@/services/books';
import clients from '@/services/clients';
import moment from 'moment';

export default {
    name: 'RentalCrud',
    data() {
        return {
            rental: {
                id: '',
                rentalDate: '',
                expectedDeliveryDate: '',
                deliveryDate: '',
                status: '',
                bookModel: '',
                bookModelId: '',
                clientModel: '',
                clientModelId: '',
            },
            objectRental: {
                id: '',
                rentalDate: '',
                expectedDeliveryDate: '',
                deliveryDate: '',
                status: '',
                bookModel: '',
                bookModelId: '',
                clientModel: '',
                clientModelId: '',
            },
            rentalsArray: [],
            clientsArray: [],
            booksArray: [],
            errors: [],
            search: '',
            // index: -1,
            menu: false,
            menu2: false,
            // menu3: false,
            // up: true,
            // up2: false,
            date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
            headers: [
                {
                    text: 'ID',
                    align: 'start',
                    value: 'id',
                    class: 'teal darken-4, white--text',
                },
                {
                    text: 'LIVRO',
                    value: 'bookModel.name',
                    class: 'teal darken-4, white--text',
                },
                {
                    text: 'USUÁRIO',
                    value: 'clientModel.name',
                    class: 'teal darken-4, white--text',
                },
                {
                    text: 'DATA DE LOCAÇÃO',
                    value: 'rentalDate',
                    class: 'teal darken-4, white--text',
                },
                {
                    text: 'PREVISÃO DE RETORNO',
                    value: 'expectedDeliveryDate',
                    class: 'teal darken-4, white--text',
                },
                {
                    text: 'DATA DE DEVOLUÇÃO',
                    value: 'deliveryDate',
                    class: 'teal darken-4, white--text',
                },
                {
                    text: 'STATUS',
                    value: 'status',
                    class: 'teal darken-4, white--text',
                },
                {
                    text: 'AÇÕES',
                    align: 'center',
                    value: 'actions',
                    class: 'teal darken-4, white--text',
                    sortable: 'false',
                },
            ],
            nomeCerto: '',
            condition: false,
            dialog: false,
            rules: {
                required: (value) => !!value || 'Este campo é obrigatório',
                minLength: (value) => value.length >= 3 || 'Mínimo de 3 caracteres',
                maxLength: (value) => value.length <= 45 || 'Máximo de 45 caracteres',
                maxCityLength: (value) => value.length <= 30 || 'Máximo de 30 caracteres',
                maxAgelength: (value) => (value.length >= 1 && value.length <= 3) || 'Máximo de 3 caracteres',
            },
        };
    },
    // watch: {
    //     dialog(val) {
    //         val || this.close();
    //         val || this.$refs.form.resetValidation();
    //     },
    // },
    computed: {
        // formTitle() {
        //     return this.index === -1 ? 'Novo aluguel' : 'Editar aluguel';
        // },
        todayDate() {
            return moment(new Date()).format('yyyy-MM-DD');
        },
        formattedRentalDate() {
            return this.parseDate(this.rental.rentalDate);
        },
        formattedExpectedDeliveryDate() {
            return this.parseDate(this.rental.expectedDeliveryDate);
        },
    },

    methods: {
        parseDate(date) {
            if (date) {
                return moment(date).format('DD/MM/yyyy');
            }
            return '';
        },
        parseDateISO(date) {
            const [dd, mm, yyyy] = date.split('/');
            return `${yyyy}-${mm}-${dd}`;
        },
        list() {
            rentals.list().then((resposta) => {
                console.log('rentals', resposta.data);
                this.rentalsArray = resposta.data;
                this.rentalsArray.forEach((item) => {
                    item.rentalDate = this.parseDate(item.rentalDate);
                    item.expectedDeliveryDate = this.parseDate(item.expectedDeliveryDate);
                    console.log(item.deliveryDate);
                    if (item.deliveryDate != null) {
                        item.deliveryDate = this.parseDate(item.deliveryDate);
                    } else {
                        item.deliveryDate;
                    }
                });
            });
        },
        clientsList() {
            clients.list().then((resposta) => {
                console.log('clients', resposta.data);
                this.clientsArray = resposta.data;
            });
        },
        booksList() {
            books.list().then((resposta) => {
                console.log('books', resposta.data);
                this.booksArray = resposta.data;
            });
        },

        // saveif() {
        //     if (!this.$refs.form.validate()) return;

        //     this.rental.bookModelId = this.rental.bookModel.id ?? this.rental.bookModel;
        //     this.rental.clientModelId = this.rental.clientModel.id ?? this.rental.clientModel;

        //     this.close();
        // },
        save() {
            if (!this.$refs.form.validate()) return;

            this.rental.bookModelId = this.rental.bookModel.id ?? this.rental.bookModel;
            this.rental.clientModelId = this.rental.clientModel.id ?? this.rental.clientModel;

            rentals
                .save(this.rental)
                .then((resposta) => {
                    console.log(resposta.data);
                    this.list();
                    this.$swal({
                        title: 'Sucesso',
                        text: 'Aluguel cadastrado!',
                        icon: 'success',
                        allowOutsideClick: false,
                    }).then(() => {
                        window.Toast.fire('Aluguel cadastrado', '', 'success');
                    });
                })
                .catch((e) => {
                    this.$swal({
                        title: 'Opss...',
                        text: e.response.data.message,
                        icon: 'info',
                        allowOutsideClick: false,
                    });
                    // .then(() => {
                    //     window.Toast.fire('Erro ao cadastrar aluguel', '', 'error');
                    // });
                });
            this.closeC();
        },
        update() {
            this.rental.bookModelId = this.rental.bookModel.id ?? this.rental.bookModel;
            this.rental.clientModelId = this.rental.clientModel.id ?? this.rental.clientModel;

            rentals
                .update(this.rental.id, this.rental)
                .then((resposta) => {
                    console.log(resposta.data);
                    // this.item.condition = true;

                    this.list();
                    this.$swal({
                        title: 'Sucesso',
                        text: 'Livro devolvido!',
                        icon: 'success',
                        allowOutsideClick: false,
                    }).then(() => {
                        window.Toast.fire('Aluguel atualizado', '', 'success');
                    });
                })
                .catch((e) => {
                    // console.log();
                    // this.close();
                    this.$swal({
                        title: 'Opss...',
                        text: e.response.data.message,
                        icon: 'info',
                        allowOutsideClick: false,
                    }).then(() => {
                        window.Toast.fire('Erro ao atualizar aluguel', '', 'error');
                    });
                });

            this.close();
        },
        remove(item) {
            // this.index = item.id;
            this.rental = Object.assign({}, item);
            this.rental.rentalDate = this.parseDateISO(item.rentalDate);
            this.rental.expectedDeliveryDate = this.parseDateISO(item.expectedDeliveryDate);
            this.rental.deliveryDate = this.parseDateISO(item.deliveryDate);
            this.removeConfirm();
        },
        removeFinal() {
            rentals
                .delete(this.rental.id)
                .then((resposta) => {
                    console.log(resposta.data);
                    // this.removeConfirm();
                    this.$swal({
                        title: 'Sucesso',
                        text: 'Aluguel excluído',
                        icon: 'success',
                        allowOutsideClick: false,
                    }).then(() => {
                        window.Toast.fire('aluguel excluído', '', 'info');
                    });
                    this.list();
                })
                .catch((e) => {
                    this.$swal({
                        title: 'Opss...',
                        text: e.response.data.message,
                        icon: 'info',
                        allowOutsideClick: false,
                    }).then(() => {
                        window.Toast.fire('Erro ao excluir aluguel', '', 'error');
                    });
                });
            this.rental = Object.assign({}, this.objectRental);
        },
        removeConfirm() {
            this.$swal({
                title: 'Deseja excluir esse aluguel?',
                icon: 'warning',
                showDenyButton: true,
                confirmButtonText: 'Excluir',
                denyButtonText: 'Cancelar',
                allowOutsideClick: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    this.removeFinal();
                } else if (result.isDenied) {
                    this.$swal({
                        title: 'Exclusão interrompida',
                        icon: 'info',
                        allowOutsideClick: false,
                    });
                    this.rental = Object.assign({}, this.objectRental);
                }
                this.$nextTick(() => {
                    this.index = -1;
                    this.$refs.form.resetValidation();
                });
            });
        },
        deliveryFirst(item) {
            this.$swal({
                title: 'Deseja devolver esse livro?',
                icon: 'warning',
                showDenyButton: true,
                confirmButtonText: 'Devolver',
                denyButtonText: 'Cancelar',
                allowOutsideClick: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    this.rental = Object.assign({}, item);
                    this.rental.rentalDate = this.parseDateISO(item.rentalDate);
                    this.rental.expectedDeliveryDate = this.parseDateISO(item.expectedDeliveryDate);
                    this.rental.deliveryDate = this.date;
                    this.update();
                } else if (result.isDenied) {
                    // this.rental.rentalDate = this.parseDateISO(item.rentalDate);
                    // this.rental.expectedDeliveryDate = this.parseDateISO(item.expectedDeliveryDate);
                    // this.rental = Object.assign({}, this.objectRental);
                    // this.$refs.form.resetValidation();
                    this.$swal('Livro não Devolvido', '', 'info');
                }
            });
        },

        closeC() {
            // this.up = true;
            // this.up2 = false;
            this.dialog = false;
            this.$refs.form.resetValidation();
            this.rental = Object.assign({}, this.objectRental);
        },
        close() {
            // this.up = true;
            // this.up2 = false;
            // this.dialog = false;
            // this.rental.deliveryDate;
            // this.rental.deliveryDate = this.parseDateISO(this.rental.deliveryDate);
            this.rental = Object.assign({}, this.objectRental);
            this.$refs.form.resetValidation();
            // this.$nextTick(() => {
            //     this.index = -1;
            // });
        },
    },
    mounted() {
        this.list(), this.clientsList(), this.booksList();
    },
};
</script>

<style>
/* .v-application .teal{
    background-color: #004d40;
    border-color: #004d40;
} */
</style>

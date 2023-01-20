<template>
    <div>
        <template>
            <template>
                <v-dialog v-model="dialog" max-width="500" persistent>
                    <v-card>
                        <v-card-title>{{ formTitle }}</v-card-title>
                        <v-card-text>
                            <v-form class="px-3" ref="form">
                                <v-text-field
                                    label="Nome"
                                    v-model="client.name"
                                    :rules="[rules.required, rules.minLength, rules.maxLength]"
                                ></v-text-field>
                                <!-- <v-text-field
                                    label="Idade"
                                    v-model="client.age"
                                    :rules="[rules.required, rules.maxAgelength]"
                                ></v-text-field> -->
                                <v-text-field
                                    label="E-mail"
                                    v-model="client.email"
                                    :rules="[rules.required, rules.minLength, rules.maxLength, rules.email]"
                                ></v-text-field>
                                <!-- <v-menu
                                    ref="menu"
                                    v-model="menu"
                                    :close-on-content-click="false"
                                    :return-value.sync="client.birthDate"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="client.birthDate"
                                            label="Data de nascimento"
                                            append-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="client.birthDate" no-title scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
                                        <v-btn text color="primary" @click="$refs.menu.save(client.birthDate)"> OK </v-btn>
                                    </v-date-picker>
                                </v-menu> -->
                                <!-- <v-menu>
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                            label="Data de nascimento "
                                            :value="client.birthDate"
                                            append-icon="mdi-calendar"
                                            slot="activator"
                                            v-on="on"
                                            :rules="[rules.required, rules.minLength, rules.maxLength]"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="client.birthDate" scrollable color="teal darken-4">
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
                                        <v-btn text color="primary" @click="$refs.dialog.save(date)"> OK </v-btn>
                                    </v-date-picker>
                                </v-menu> -->
                                <v-text-field
                                    label="Cidade"
                                    v-model="client.city"
                                    :rules="[rules.required, rules.minLength, rules.maxLength]"
                                ></v-text-field>
                                <v-text-field
                                    label="Endereço"
                                    v-model="client.address"
                                    :rules="[rules.required, rules.minLength, rules.maxCityLength]"
                                >
                                </v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="error" text @click="close">Fechar</v-btn>
                            <v-btn color="primary" text @click="saveif">Salvar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </template>
            <v-card>
                <v-card-title>
                    Usuários
                    <v-divider></v-divider>
                    <v-btn class="ma-2 teal darken-4 white--text" rounded @click="dialog = true">Cadastrar</v-btn>
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Pesquisar" single-line hide-details>
                    </v-text-field>
                </v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="clientsArray"
                    :search="search"
                    class="elevation-1"
                    items-per-page="5"
                >
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
                                    @click="editFirst(item)"
                                >
                                    <v-icon dark>mdi-pencil</v-icon>
                                </v-btn>
                            </template>
                            <span>Editar</span>
                        </v-tooltip>
                        <v-tooltip top color="red">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="error" v-bind="attrs" v-on="on" text small rounded @click="remove(item)">
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
import clients from '@/services/clients';

export default {
    name: 'ClientCrud',
    data() {
        return {
            client: {
                id: 0,
                name: '',
                // age: '',
                email: '',
                // birthDate: '',
                city: '',
                address: '',
            },
            objectClient: {
                id: 0,
                name: '',
                // age: '',
                email: '',
                // birthDate: '',
                city: '',
                address: '',
            },
            clientsArray: [],
            errors: [],
            search: '',
            index: -1,
            headers: [
                {
                    text: 'ID',
                    align: 'start',
                    value: 'id',
                    class: 'teal darken-4, white--text',
                },
                {
                    text: 'NOME',
                    value: 'name',
                    class: 'teal darken-4, white--text',
                },
                // {
                //     text: 'IDADE',
                //     value: 'age',
                //     class: 'teal darken-4, white--text',
                // },
                {
                    text: 'EMAIL',
                    value: 'email',
                    class: 'teal darken-4, white--text',
                },
                // {
                //     text: 'DATA DE NASCIMENTO',
                //     value: 'birthDate',
                //     class: 'teal darken-4, white--text',
                // },
                {
                    text: 'CIDADE',
                    value: 'city',
                    class: 'teal darken-4, white--text',
                },
                {
                    text: 'ENDEREÇO',
                    value: 'address',
                    class: 'teal darken-4, white--text',
                },
                {
                    text: 'AÇÕES',
                    value: 'actions',
                    class: 'teal darken-4, white--text',
                    sortable: 'false',
                },
            ],
            nomeCerto: '',
            dialog: false,
            rules: {
                required: (value) => !!value || 'Este campo é obrigatório',
                minLength: (value) => value.length >= 3 || 'Mínimo de 3 caracteres',
                maxLength: (value) => value.length <= 45 || 'Máximo de 45 caracteres',
                maxCityLength: (value) => value.length <= 30 || 'Máximo de 30 caracteres',
                maxAgelength: (value) => (value.length >= 1 && value.length <= 3) || 'Máximo de 3 caracteres',
                email: (value) => {
                    const pattern =
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || 'E-mail inválido';
                },
            },
        };
    },
    watch: {
        dialog(val) {
            val || this.close();
            val || this.$refs.form.resetValidation();
        },
    },
    computed: {
        formTitle() {
            return this.index === -1 ? 'Novo usuário' : 'Editar usuário';
        },
    },
    methods: {
        list() {
            clients.list().then((resposta) => {
                console.log('clientsArray', resposta.data);
                this.clientsArray = resposta.data;
            });
        },

        saveif() {
            if (!this.$refs.form.validate()) return;
            if (this.index > -1) {
                this.update();
            } else {
                this.insert();
            }
            this.close();
        },
        insert() {
            clients
                .save(this.client)
                .then((resposta) => {
                    console.log(resposta.data);
                    this.list();
                    this.$swal({
                        title: 'Sucesso',
                        text: 'Usuário cadastrado!',
                        icon: 'success',
                        allowOutsideClick: false,
                    }).then(() => {
                        window.Toast.fire('Usuário cadastrado', '', 'success');
                    });
                })
                .catch(() => {
                    this.$swal({
                        title: 'Opss...',
                        text: 'Usuário já cadastrado',
                        icon: 'info',
                        allowOutsideClick: false,
                    }).then(() => {
                        window.Toast.fire('Erro ao cadastrar usuário', '', 'error');
                    });
                });
        },
        update() {
            clients
                .update(this.client.id, this.client)
                .then((resposta) => {
                    console.log(resposta.data);
                    this.list();
                    this.$swal({
                        title: 'Sucesso',
                        text: 'Usuário atualizado!',
                        icon: 'success',
                        allowOutsideClick: false,
                    }).then(() => {
                        window.Toast.fire('Usuário atualizado', '', 'success');
                    });
                })
                .catch(() => {
                    this.$swal({
                        title: 'Opss...',
                        text: 'Usuário já cadastrado',
                        icon: 'info',
                        allowOutsideClick: false,
                    }).then(() => {
                        window.Toast.fire('Erro ao atualizar usuário', '', 'error');
                    });
                });
        },
        remove(item) {
            this.index = item.id;
            this.client = Object.assign({}, item);
            this.removeConfirm();
        },
        removeFinal() {
            clients
                .delete(this.client.id)
                .then((resposta) => {
                    console.log(resposta.data);
                    this.removeConfirm();
                    this.$swal({
                        title: 'Sucesso',
                        text: 'Usuário excluído',
                        icon: 'success',
                        allowOutsideClick: false,
                    }).then(() => {
                        window.Toast.fire('Usuário excluído', '', 'info');
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
                        window.Toast.fire('Erro ao excluir editora', '', 'error');
                    });
                });
        },
        removeConfirm() {
            this.$swal({
                title: 'Deseja excluir esse usuário?',
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
                }
                this.$nextTick(() => {
                    this.client = Object.assign({}, this.objectClient);
                    this.index = -1;
                    this.$refs.form.resetValidation();
                });
            });
        },
        editFirst(item) {
            this.dialog = true;
            this.index = item.id;
            this.client = Object.assign({}, item);
        },
        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.client = Object.assign({}, this.objectClient);
                this.index = -1;
                this.$refs.form.reset();
            });
        },
    },
    mounted() {
        this.list();
    },
};
</script>

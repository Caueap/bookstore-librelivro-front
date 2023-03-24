<template>
    <div>
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
                                            label="Nome da editora"
                                            v-model="publisher.name"
                                            :rules="[rules.required, rules.minLength, rules.maxLength]"
                                        ></v-text-field>
                                        <v-text-field
                                            label="Cidade da editora"
                                            v-model="publisher.city"
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

                    <v-card class="tableCard">
                        <v-card-title>
                            Editoras
                            <v-divider></v-divider>
                            <v-btn class="ma-2 teal darken-4 white--text" rounded @click="dialog = true"
                                >Cadastrar</v-btn
                            >
                            <v-spacer></v-spacer>
                            <v-text-field
                                v-model="search"
                                append-icon="mdi-magnify"
                                label="Pesquisar"
                                single-line
                                hide-details
                            >
                            </v-text-field>
                        </v-card-title>
                        <v-data-table
                            :headers="headers"
                            :items="publishersArray"
                            :search="search"
                            class="elevation-1"
                            :footer-props="{
                                showFirstLastPage: true,
                                firstIcon: 'mdi-arrow-collapse-left',
                                lastIcon: 'mdi-arrow-collapse-right',

                                'items-per-page-text': 'Items por página',
                            }"
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
                                        <v-btn
                                            color="error"
                                            v-bind="attrs"
                                            v-on="on"
                                            text
                                            small
                                            rounded
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
    </div>
</template>

<script>
import publishers from '@/services/publishers';

export default {
    name: 'CrudPub',
    data() {
        return {
            publisher: {
                id: 0,
                name: '',
                city: '',
            },
            objectPublisher: {
                id: 0,
                name: '',
                city: '',
            },
            publishersArray: [],
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
                {
                    text: 'CIDADE',
                    value: 'city',
                    class: 'teal darken-4, white--text',
                },
                {
                    text: 'AÇÕES',
                    value: 'actions',
                    align: 'center',
                    class: 'teal darken-4, white--text',
                    sortable: 'false',
                },
            ],
            nomeCerto: '',
            dialog: false,
            rules: {
                required: (value) => !!value || 'Este campo é obrigatório',
                maxLength: (value) => value.length <= 45 || 'Máximo de 45 caracteres',
                maxCityLength: (value) => value.length <= 30 || 'Máximo de 30 caracteres',
                minLength: (value) => value.length >= 3 || 'Mínimo de 3 caracteres',
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
            return this.index === -1 ? 'Nova editora' : 'Editar editora';
        },
    },
    methods: {
        list() {
            publishers.list().then((resposta) => {
                console.log('publishersArray', resposta.data);
                this.publishersArray = resposta.data;
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
            publishers
                .save(this.publisher)
                .then((resposta) => {
                    console.log(resposta.data);
                    this.list();
                    this.$swal({
                        title: 'Sucesso',
                        text: 'Editora cadastrada!',
                        icon: 'success',
                        allowOutsideClick: false,
                    }).then(() => {
                        window.Toast.fire('Editora cadastrada', '', 'success');
                    });
                })
                .catch(() => {
                    this.$swal({
                        title: 'Opss...',
                        text: 'Editora já cadastrada',
                        icon: 'info',
                        allowOutsideClick: false,
                    }).then(() => {
                        window.Toast.fire('Erro ao cadastrar editora', '', 'error');
                    });
                });
        },
        update() {
            publishers
                .edit(this.publisher.id, this.publisher)
                .then((resposta) => {
                    console.log(resposta.data);
                    this.list();
                    this.$swal({
                        title: 'Sucesso',
                        text: 'Editora atualizada!',
                        icon: 'success',
                        allowOutsideClick: false,
                    }).then(() => {
                        window.Toast.fire('Editora cadastrada', '', 'success');
                    });
                })
                .catch(() => {
                    this.$swal({
                        title: 'Opss...',
                        text: 'Editora já cadastrada',
                        icon: 'info',
                        allowOutsideClick: false,
                    }).then(() => {
                        window.Toast.fire('Erro ao cadastrar editora', '', 'error');
                    });
                });
        },
        remove(item) {
            this.index = item.id;
            this.publisher = Object.assign({}, item);
            this.removeConfirm();
        },
        removeFinal() {
            publishers
                .delete(this.publisher.id)
                .then((resposta) => {
                    console.log(resposta.data);
                    this.removeConfirm();
                    this.$swal({
                        title: 'Sucesso',
                        text: 'Editora excluída',
                        icon: 'success',
                        allowOutsideClick: false,
                    }).then(() => {
                        window.Toast.fire('Editora excluída', '', 'info');
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
                title: 'Deseja excluir essa editora?',
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
                    this.publisher = Object.assign({}, this.objectPublisher);
                    this.index = -1;
                    this.$refs.form.resetValidation();
                });
            });
        },

        editFirst(item) {
            this.dialog = true;
            this.index = item.id;
            this.publisher = Object.assign({}, item);
        },
        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.publisher = Object.assign({}, this.objectPublisher);
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

<style scoped>
.tableCard {
    margin-top: 20px;
}
</style>

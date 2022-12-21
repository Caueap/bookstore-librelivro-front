<template>
    <div>
        <template>
            <template>
                <v-dialog v-model="dialog" max-width="500" persistent>
                    <v-card>
                        <v-card-title>{{ formTitle }}</v-card-title>
                        <v-card-text>
                            <v-form class="px-3" ref="form">
                                <v-text-field label="Nome" v-model="book.name"
                                    :rules="[rules.required, rules.minLength, rules.maxLength]"></v-text-field>
                                <v-text-field label="Autor" v-model="book.author"
                                    :rules="[rules.required, rules.minLength]"></v-text-field>
                                <v-text-field label="Data de lançamento" v-model="book.releaseDate"
                                    :rules="[rules.required, rules.minLength, rules.maxLength]"></v-text-field>
                                <v-text-field label="ISBN" v-model="book.isbn"
                                    :rules="[rules.required, rules.minLength, rules.maxLength]"></v-text-field>
                                <v-text-field label="Unidades disponíveis" v-model="book.amount"
                                    :rules="[rules.required]"></v-text-field>
                                    
                                <v-text-field label="Editora" v-model="book.publisherModelId" :rules="[rules.required]">
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
                    Livros
                    <v-divider></v-divider>
                    <v-btn class="ma-2 teal darken-4 white--text" rounded @click="dialog = true">Cadastrar</v-btn>
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Pesquisar" single-line hide-details>
                    </v-text-field>
                </v-card-title>
                <v-data-table :headers="headers" :items="booksArray" :search="search" class="elevation-1"
                    items-per-page="5">
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-tooltip top color="#0061A3">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="primary" v-bind="attrs" v-on="on" text small rounded
                                    @click="editFirst(item)">
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
import books from '@/services/books'
// import publishers from '@/services/publishers';

export default {
    name: 'ClientCrud',
    data() {
        return {
            book: {
                id: 0,
                name: '',
                author: '',
                releaseDate: '',
                isbn: '',
                amount: '',
                // publisherModel: null,
                publisherModelId: 0
            },
            objectBook: {
                id: 0,
                name: '',
                author: '',
                releaseDate: '',
                isbn: '',
                amount: '',
                publisherModelId: 0
            },
            booksArray: [],
            errors: [],
            search: '',
            index: -1,
            headers: [
                {
                    text: 'ID',
                    align: 'start',
                    value: 'id',
                    class: 'teal darken-4, white--text'
                },
                {
                    text: 'NOME',
                    value: 'name',
                    class: 'teal darken-4, white--text'

                },
                {
                    text: 'AUTOR',
                    value: 'author',
                    class: 'teal darken-4, white--text'

                },
                {
                    text: 'DATA DE LANÇAMENTO',
                    value: 'releaseDate',
                    class: 'teal darken-4, white--text'

                },
                {
                    text: 'ISBN',
                    value: 'isbn',
                    class: 'teal darken-4, white--text'
                },
                {
                    text: 'UNIDADES DISPONÍVEIS',
                    value: 'amount',
                    class: 'teal darken-4, white--text'
                },
                {
                    text: 'UNIDADES ALUGADAS',
                    value: 'rentedAmount',
                    class: 'teal darken-4, white--text'
                },
                {
                    text: 'EDITORA',
                    value: 'publisherModel.name',
                    class: 'teal darken-4, white--text'
                },
                {
                    text: 'AÇÕES',
                    value: 'actions',
                    class: 'teal darken-4, white--text',
                    sortable: 'false'
                },
            ],
            nomeCerto: '',
            dialog: false,
            rules: {
                required: (value) => !!value || 'Este campo é obrigatório',
                minLength: (value) => value.length >= 3 || 'Mínimo de 3 caracteres',
                maxLength: (value) => value.length <= 45 || 'Máximo de 45 caracteres',
                maxCityLength: (value) => value.length <= 30 || 'Máximo de 30 caracteres',
                maxAgelength: (value) => value.length >= 1 && value.length <= 3 || 'Máximo de 3 caracteres'
            }
        }

    },
    watch: {
        dialog(val) {
            val || this.close();
            val || this.$refs.form.resetValidation();
        }

    },
    computed: {
        formTitle() {
            return this.index === -1 ? 'Novo livro' : 'Editar livro'
        }

    },
    methods: {
        list() {
            books.list().then((resposta) => {
                console.log('books', resposta.data)
                this.booksArray = resposta.data
            })
        },

        saveif() {
            if (!this.$refs.form.validate()) return;
            if (this.index > -1) {
                this.update()
            } else {
                this.insert()
            }
            this.close()
        },
        insert() {
            books.save(this.book).then((resposta) => {
                console.log(resposta.data)
                this.list()
                this.$swal({
                    title: 'Sucesso',
                    text: 'livro cadastrado!',
                    icon: "success",
                    allowOutsideClick: false
                }).then(() => {
                    window.Toast.fire('livro cadastrado', '', 'success')
                })
            }).catch(() => {
                this.$swal({
                    title: 'Opss...',
                    text: 'livro já cadastrado',
                    icon: 'info',
                    allowOutsideClick: false
                }).then(() => {
                    window.Toast.fire('Erro ao cadastrar livro', '', 'error')
                })
            })
        },
        update() {
            books.update(this.book.id, this.book).then((resposta) => {
                console.log(resposta.data)
                this.list()
                this.$swal({
                    title: 'Sucesso',
                    text: 'Livro atualizado!',
                    icon: "success",
                    allowOutsideClick: false
                }).then(() => {
                    window.Toast.fire('livro atualizado', '', 'success')
                })
            }).catch(() => {
                console.log()
                this.$swal({
                    title: 'Opss...',
                    text: 'Livro já cadastrado',
                    icon: 'info',
                    allowOutsideClick: false
                }).then(() => {
                    window.Toast.fire('Erro ao atualizar livro', '', 'error')
                })


            })

        },
        remove(item) {
            this.index = item.id
            this.book = Object.assign({}, item)
            this.removeConfirm()

        },
        removeFinal() {
            books.delete(this.book.id).then(resposta => {
                console.log(resposta.data)
                this.removeConfirm()
                this.$swal({
                    title: 'Sucesso',
                    text: 'Livro excluído',
                    icon: 'success',
                    allowOutsideClick: false
                }).then(() => {
                    window.Toast.fire('Livro excluído', '', 'info')
                })
                this.list()
            }).catch((e) => {
                this.$swal({
                    title: 'Opss...',
                    text: e.response.data.message,
                    icon: 'info',
                    allowOutsideClick: false
                }).then(() => {
                    window.Toast.fire('Erro ao excluir editora', '', 'error')
                })
            })
        },
        removeConfirm() {
            this.$swal({
                title: 'Deseja excluir esse livro?',
                icon: 'warning',
                showDenyButton: true,
                confirmButtonText: 'Excluir',
                denyButtonText: 'Cancelar',
                allowOutsideClick: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    this.removeFinal()
                } else if (result.isDenied) {
                    this.$swal({
                        title: 'Exclusão interrompida',
                        icon: 'info',
                        allowOutsideClick: false
                    })
                }
                this.$nextTick(() => {
                    this.book = Object.assign({}, this.objectBook)
                    this.index = -1
                    this.$refs.form.resetValidation()
                })
            })
        },
        editFirst(item) {
            this.dialog = true
            this.index = item.id
            this.book = Object.assign({}, item)
        },
        close() {
            this.dialog = false
            this.$nextTick(() => {
                // this.book = Object.assign({}, this.objectBook)
                this.index = -1
                this.$refs.form.reset()
            })
        }
    },
    mounted() {
        this.list();
    }
}
</script>
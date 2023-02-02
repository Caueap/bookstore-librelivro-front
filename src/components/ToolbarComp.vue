<template>
    <nav>
        <v-app-bar class="teal darken-4">
            <v-app-bar-nav-icon class="white--text d-flex d-md-none" @click="drawer = true"></v-app-bar-nav-icon>
            <v-toolbar-title>
                <h1 class="white--text">LibreLivro</h1>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-items align-with-title class="d-none d-md-flex">
                <div class="menu d-flex">
                    <div class="mt-3 mr-2">
                        <v-btn class="transparent" to="/">
                            <v-icon class="white--text el-margin">mdi-view-dashboard</v-icon>
                            <span class="white--text">Início</span>
                        </v-btn>
                    </div>
                    <div class="mt-3 mr-2">
                        <v-btn class="transparent" to="/client">
                            <v-icon class="white--text el-margin">mdi mdi-account</v-icon>
                            <span class="white--text">Usuários</span>
                        </v-btn>
                    </div>
                    <div class="mt-3 mr-2">
                        <v-btn class="transparent" to="/publisher">
                            <v-icon class="white--text el-margin">mdi mdi-domain</v-icon>
                            <span class="white--text">Editoras</span>
                        </v-btn>
                    </div>
                    <div class="mt-3 mr-2">
                        <v-btn class="transparent" to="/book">
                            <v-icon class="white--text el-margin">mdi-book-open-blank-variant</v-icon>
                            <span class="white--text">Livros</span>
                        </v-btn>
                    </div>
                    <div class="mt-3 mr-2">
                        <v-btn class="transparent" to="/rental">
                            <v-icon class="white--text el-margin">mdi-badge-account-horizontal-outline</v-icon>
                            <span class="white--text">Aluguéis</span>
                        </v-btn>
                    </div>
                </div>
            </v-toolbar-items>
        </v-app-bar>

        <v-navigation-drawer app temporary v-model="drawer" class="teal darken-4">
            <v-list>
                <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                    <v-list-item-action>
                        <v-icon class="white--text">{{ link.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            drawer: false,
            links: [
                { icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/' },
                { icon: 'mdi-account-plus', text: 'Usuários', route: '/client' },
                { icon: 'mdi-card-plus-outline', text: 'Editoras', route: '/publisher' },
                { icon: 'mdi-book-open-blank-variant', text: 'Livros', route: '/book' },
                { icon: 'mdi-badge-account-horizontal-outline', text: 'Alugueis', route: '/rental' },
            ],
        };
    },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@800&display=swap');
h1{
    font-size: 38px;
    font-family: ""
}

/* @media (max-width: 500px) {
  h1 {
    font-size: 24px;
  }
} */



.el-margin{
    margin-right: 5px;
}









</style>

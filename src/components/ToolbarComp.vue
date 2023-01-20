<template>
    <nav>
        <v-toolbar class="teal darken-4">
            <v-app-bar-nav-icon class="white--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>
                <span class="white--text display-1">Knowledge Hub Livraria</span>
            </v-toolbar-title>
        </v-toolbar>
        <v-navigation-drawer app temporary v-model="drawer" class="teal darken-4">
            <v-list>
                <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                    <v-list-item-action>
                        <v-icon class="white--text">{{link.icon}}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="white--text">{{link.text}}</v-list-item-title>
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
                {icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/'},
                {icon: 'mdi-account-plus', text: 'Usuários', route: '/client'},
                {icon: 'mdi-card-plus-outline', text: 'Editoras', route: '/publisher'},
                {icon: 'mdi-book-open-blank-variant', text: 'Livros', route: '/book'},
                {icon: 'mdi-badge-account-horizontal-outline', text: 'Alugueis', route: '/rental'}
            ]
        }
    }

}


</script>
<template>
    <div class="maindiv">
    <v-container>
        <ClientCrud />
    </v-container>
</div>
</template>

<script>
import ClientCrud from '@/components/client/ClientCrud.vue';

export default {
    name: 'ClientView',
    components: {
        ClientCrud,
    },
};
</script>

<style scoped>

.maindiv {
    background-color: #00695C;
    padding-bottom: 100%;
}



</style>

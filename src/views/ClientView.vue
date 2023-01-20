<template>
    <v-container>
        <ClientCrud />
    </v-container>
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

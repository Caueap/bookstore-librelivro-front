<template>
    <v-container>
        <RentalCrud />
    </v-container>
</template>

<script>
import RentalCrud from '@/components/rental/RentalCrud.vue';

export default {
    name: 'RentalView',
    components: {
        RentalCrud,
    },
};
</script>

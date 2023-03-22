<template>
    <div class="maindiv">
    <v-container>
        <RentalCrud />
    </v-container>
</div>
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

<style scoped>

.maindiv {
    background-color: #00695C;
    padding-bottom: 100%;
}

</style>

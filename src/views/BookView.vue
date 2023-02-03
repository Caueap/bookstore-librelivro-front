<template>
    <div class="maindiv">
        <v-container>
            <BookCrud />
        </v-container>
    </div>
</template>

<script>
import BookCrud from '@/components/book/BookCrud.vue';

export default {
    name: 'BookView',
    components: {
        BookCrud,
    },
};
</script>

<style scoped>

.maindiv {
    background-color: #00695C;
    padding-bottom: 100%;
}

</style>

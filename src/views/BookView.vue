<template>
    <v-container>
        <BookCrud />
    </v-container>
</template>

<script>
import BookCrud from '@/components/book/BookCrud.vue';

export default {
    name: 'BookView',
    components: {
        BookCrud
    }
}

</script>
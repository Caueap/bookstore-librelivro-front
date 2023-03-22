<template>
    <div class="maindiv">
    <v-container>
        <PublisherCrud/>
        
    </v-container>
</div>
        
    
</template>

<script>

import PublisherCrud from '@/components/publisher/PublisherCrud.vue';

export default {
    name: 'PublisherView',
    components: {
        PublisherCrud
        
        
    }



}

</script>

<style scoped>

.maindiv {
    background-color: #00695C;
    padding-bottom: 100%;
}


</style>
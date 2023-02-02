<template>
  <v-app>
    <Toolbar/>
    <!-- <HomeView/> -->
    <router-view/>
  </v-app>
</template>

<script>
import Toolbar from '@/components/ToolbarComp.vue'
// import HomeView from './views/HomeView.vue'

export default {
  name: 'App',
  components: {
    Toolbar, 
    // HomeView
  },
  data: () => ({
    //
  }),
};
</script>

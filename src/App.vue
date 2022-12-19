<template>
  <v-app>
    <Toolbar/>
    <HomeView/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Toolbar from '@/components/ToolbarComp.vue'
import HomeView from './views/HomeView.vue'

export default {
  name: 'App',
  components: {
    Toolbar, 
    HomeView
  },
  data: () => ({
    //
  }),
};
</script>

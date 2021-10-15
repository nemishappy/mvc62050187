<template>
  <v-app>
    <Toolbar />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <Dialog />
    <Overlay />
  </v-app>
</template>

<script>
import Toolbar from '~/components/Toolbar'
import Dialog from '~/components/Dialog'
import Overlay from '../components/Overlay.vue'
export default {
  components: {
    Toolbar,
    Dialog,
    Overlay,
  },
}
</script>

<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline"> 4 </v-card-title>

        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt @click="test"> Continue </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  methods: {
    test() {},
  },
}
</script>

<template>
  <v-row justify="center" align="center">
    <v-col cols="12" >
      <v-card>
        <v-card-title class="headline"> View Assignment </v-card-title>
        <v-data-table
          :headers="headers"
          :items="getAssignment"
          :items-per-page="5"
          class="elevation-1"
        >
        <!-- error but can run -->
          <template
            class="d-flex justify-center"
            v-slot:item.actions="{ item }"
          >
            <v-icon small class="text-center" @click="viewItem(item)">
              mdi-eye
            </v-icon>
          </template>
        </v-data-table>
        <v-card-actions>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  async mounted() {
    await this.$store.dispatch('setItems')
  },
  computed: {
    getAssignment(){
      return this.$store.getters.getitems
    }
  },
  data() {
    return {
      headers: [
        {
          text: 'Assignment name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Due Date', value: 'due' },
        { text: 'View', value: 'actions', sortable: false },
      ],
      
    }
  },
  methods: {
    viewItem(item){
      this.$router.push({
        name: 'assignment-id',
        params: { id: item.id },
      })
    }
  },
}
</script>

<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <h2>Turn in Asssignment</h2>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="id"
            :rules="idRules"
            :counter="8"
            label="ID"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            v-model="assignment"
            :items="getAssignment"
            :rules="nameRules"
            item-text="name"
            label="Assignment Name"
          ></v-select>
        </v-col>

        <v-col cols="12" md="4">
          <v-textarea
            v-model="content"
            label="Content"
            hint="Hint text"
            required
          ></v-textarea>
        </v-col>
        <v-btn class="mr-4" type="submit" :disabled="!valid" @click="submit">
          submit
        </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
export default {
  async mounted() {
    await this.$store.dispatch('setItems')
  },
  data() {
    return {
      valid: false,
      id: '',
      assignment: '',
      assignments: [],
      content: '',
      idRules: [
        (v) => !!v || 'ID is required',
        (v) => v.length <= 8 || 'ID must be less than 8 characters',
        (v) => /^[0-9]+$/.test(v) || 'ID must be number',
      ],
      nameRules: [(v) => !!v || 'Name assignment is required'],
      expiryTime: '',
    }
  },
  computed: {
    getAssignment() {
      return this.$store.getters.getitems
    },
  },
  methods: {
    async submit() {
      this.$store.dispatch('toggleOverlay')
      const timestamp = await Date.now()
      console.log(this.assignment)
      const db = this.$fire.firestore
        .collection('assignments')
        .where('name', '==', this.assignment)
      const dbResults = await db
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let status
            if (!doc.data().due) {
              const expiryTime = doc.data().due.valueOf()
              let currentTime = timestamp.valueOf()
              if (currentTime < expiryTime) {
                status = 'Turn in'
              } else {
                status = 'Turn in Late'
                console.log('late')
              }
            } else {
              status = 'Turn in'
            }

            const subcollection = this.$fire.firestore
              .collection('assignments')
              .doc(doc.id)
              .collection('students')
              .doc(this.id)

            subcollection
              .get()
              .then((doc) => {
                if (doc.exists) {
                  subcollection.update({
                    content: this.content,
                    date: timestamp,
                    status: 'Turn In',
                  })
                } else {
                  this.$store.dispatch('setDialog', {
                    isShow: true,
                    title: 'Invaild',
                    message:
                      'Your have not been assign to this assignment.',
                  })
                }
              })
              .catch((error) => {
                console.log('Error getting document:', error)
              })

            this.$store.dispatch('setDialog', {
              isShow: true,
              title: 'Turn in Success',
              message:
                'Status : <span class="green--text">' + status + '</span>',
            })
          })
        })
        .catch((error) => {
          console.log('Error getting documents: ', error)
        })

      this.$store.dispatch('toggleOverlay')
    },
    init() {
      getAssignment.forEach((item) => {
        this.assignments.push(item.name)
      })
    },
  },
}
</script>

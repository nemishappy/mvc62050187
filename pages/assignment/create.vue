<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <h2>Create Assignment</h2>
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field
          v-model="assignment"
          :rules="nameRules"
          label="Assignment Name"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="4">
        <v-textarea
          v-model="des"
          label="description "
          hint="Hint text"
          required
        ></v-textarea>
      </v-col>
      <v-col cols="12" sm="6">
        <v-select
          v-model="selectedStudent"
          :items="students"
          :menu-props="{ maxHeight: '400' }"
          label="Pick student"
          multiple
          hint="Add your student to this assignment"
          persistent-hint
          required
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Due Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-btn class="mr-4" type="submit" @click="submit"> submit </v-btn>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      valid: false,
      assignment: '',
      des: '',
      idRules: [
        (v) => !!v || 'ID is required',
        (v) => v.length <= 8 || 'ID must be less than 8 characters',
        (v) => /^[0-9]+$/.test(v) || 'ID must be number',
      ],
      email: '',
      nameRules: [(v) => !!v || 'Name assignment is required'],
      date: '',
      menu: false,
      selectedStudent: [],
      students: ['62050187', '62050188', '62050189', '62050190', '62050191'],
    }
  },
  methods: {
    async submit() {
      this.$store.dispatch('toggleOverlay')
      console.log(this.date)
      const timestamp = Date.parse(this.date)

      console.log(timestamp)
      await this.$fire.firestore
        .collection('assignments')
        .add({
          name: this.assignment,
          des: this.des,
          due: timestamp,
        })
        .then((docRef) => {
          this.selectedStudent.forEach((student) => {
            this.$fire.firestore
              .collection('assignments')
              .doc(docRef.id)
              .collection('students')
              .doc(student).set({
                content: '',
                status: 'Not Turn In'
              })
          })
          this.$store.dispatch('setDialog', {
            isShow: true,
            title: 'Assign Success',
            message:
              'Assignment id : <span class="green--text">' +
              docRef.id +
              '</span>',
          })          
        })
        .catch((error) => {
          console.error('Error adding document: ', error)
        })

      this.$store.dispatch('toggleOverlay')
    },
  },
}
</script>

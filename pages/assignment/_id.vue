<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card>
        <v-card-title class="headline"> View Assignment </v-card-title>
        <v-data-table
          :headers="headers"
          :items="currentAssignment"
          class="elevation-1"
        >
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  mounted() {
    this.id = this.$route.params.id
    this.init()
    
  },
  data() {
    return {
      id: '',
      currentAssignment: [],
      expiryTime: '',
      headers: [
        {
          text: 'ID Student',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Content', value: 'content', sortable: false },
        { text: 'Status', value: 'status' },
      ],
    }
  },
  methods: {
    async init() {
      this.overlay = true
      const docRef = this.$fire.firestore.collection('assignments').doc(this.id)

      docRef
        .get()
        .then((doc) => {
          this.expiryTime = doc.data().due
        })
        .catch((error) => {
          console.log('Error getting document:', error)
        })

      const db = this.$fire.firestore
        .collection('assignments')
        .doc(this.id)
        .collection('students')
      const dbResults = await db.get()
      await dbResults.forEach((docSnapshot) => {
        this.currentAssignment.push({
          id: docSnapshot.id,
          content: docSnapshot.data().content,
          status: docSnapshot.data().status,
          date: docSnapshot.data().date,
        })
      })
      // await this.checkLate()
      this.overlay = false
    },
    checkLate() {
      if(this.expiryTime){
        return
      }
      const expiryTime = this.expiryTime.valueOf()
      this.currentAssignment.forEach((student) => {
        let currentTime = student.date.valueOf()
        if (currentTime < expiryTime) {
          Object.assign(student,{status:'Turn in'})
          console.log(student);
        }else{
          Object.assign(student,{status: 'Turn in late'})
          console.log('late');
        }
        if(!student.content){
          Object.assign(student,{status: 'Not turn in'})
        }
      })
      console.log(this.currentAssignment);
      
    },
  },
}
</script>

<style lang="scss" scoped></style>

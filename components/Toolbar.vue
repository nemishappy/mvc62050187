<template>
  <v-app-bar dense flat clipped-left app>
    <v-toolbar-title class="text-left">Toolbar</v-toolbar-title>
    <v-spacer></v-spacer>
    <div class="options">
      <div class="option">
        <NuxtLink to="/turnin"> <p>Turn In</p> </NuxtLink>
      </div>
      <div class="option">
        <NuxtLink to="/assignment"> <p>Assignment</p> </NuxtLink>
      </div>
      <div class="option">
        <NuxtLink to="/assignment/create"> <p>Create Assignment</p> </NuxtLink>
      </div>
      
    </div>
    <v-btn icon @click="home"><v-icon>mdi-home-outline</v-icon></v-btn>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    home() {
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped>
.options {
  display: flex;
  padding: 15px 0px;
  .option {
    display: flex;
    align-items: center;
    padding: 12px;
    a {
      text-decoration: none;
      color: rgb(20, 20, 20);
    }
    .icon {
      width: 18px;
      height: auto;
    }
    p {
      font-size: 14px;
      margin: 0;
    }
  }
}
</style>

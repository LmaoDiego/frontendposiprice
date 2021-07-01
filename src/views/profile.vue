<template>
  <v-card>
    <v-card-title>{{ currentUserFullName }}</v-card-title>
    <v-card-text>
      <p>
        <strong>Token:</strong>
        {{ currentUser.token}}
      </p>
      <p><strong>Id:</strong>{{ currentUser.id }}</p>
      <p><strong>Email:</strong>{{ currentUser.username }}</p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
name: "profile",
  computed: {
    currentUser() {
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    },
    currentUserFullName() {
      return `${this.currentUser.firstName} ${this.currentUser.lastName}`;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>

</style>

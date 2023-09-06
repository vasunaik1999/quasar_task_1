<template>
  <div>
    <!-- Display collected user data from ChildComponent1 and ChildComponent2 -->
    <div class="q-pa-md">
      <p>Username: {{ userData1.username }}</p>
      <p>Full Name: {{ userData1.fullName }}</p>
      <p>Email ID: {{ userData1.email }}</p>
      <p>Phone Number: {{ userData1.phoneNumber }}</p>
      <p>Designation: {{ userData2.designation }}</p>
      <p v-if="userData2.designation === 'user'">User ID: {{ userData2.userId }}</p>
    </div>
    <div class="q-pa-md">
      <q-btn @click="createUser" label="Create New User" color="primary" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userData1: Object,
    userData2: Object
  },
  methods: {
    createUser () {
      // Create a new user with collected data and perform any necessary actions
      const newUser = {
        username: this.userData1.username,
        fullName: this.userData1.fullName,
        email: this.userData1.email,
        phoneNumber: this.userData1.phoneNumber,
        designation: this.userData2.designation,
        userId: this.userData2.userId
      }
      this.$emit('createUser', newUser)
    }
  }
}
</script>

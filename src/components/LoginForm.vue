<template>
  <div class="login">
    <form @submit.prevent="login">
      <div class="q-pa-md">
        <q-input
          v-model="username"
          label="Username"
          outlined
          dense
        />
      </div>
      <div class="q-pa-md">
        <q-input
          v-model="password"
          label="Password"
          type="password"
          outlined
          dense
        />
      </div>
      <div class="q-pa-md">
        <q-btn type="submit" label="Login" color="primary" />
      </div>
      <!-- Error message for login -->
      <div v-if="loginError" class="q-pa-md text-h6 text-negative">{{ loginError }}</div>

    </form>
  </div>
</template>

<script>
import { useUserStore } from '../stores/userStore'

export default {
  data () {
    return {
      username: '',
      password: '',
      loginError: ''
    }
  },
  methods: {
    login () {
      // Implement your login logic here
      // You can access the username and password using this.username and this.password
      console.log('Username:', this.username)
      console.log('Password:', this.password)

      // Check if the user exists in the store
      const userStore = useUserStore()
      const user = userStore.users.find((u) => u.username === this.username)

      if (!user) {
        this.loginError = 'User not found'
        return
      }

      // Check if the password matches
      if (user.password !== this.password) {
        this.loginError = 'Incorrect password'
        return
      }

      // set user currently logged in
      userStore.setUser(user)
      // Check user designation and redirect accordingly
      if (user.designation === 'admin') {
        this.$router.push('/admin-dashboard')
      } else if (user.designation === 'user') {
        this.$router.push('/dashboard')
      }
    }
  }
}
</script>

<style scoped>

</style>

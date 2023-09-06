<template>
  <div class="dashboard">
    <p>Welcome {{ currentUser.fullName }}</p>

    <CreateUserForm />

    <div v-for="(user, index) in users" :key="index">
      {{ user.username }}
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../stores/userStore'
import CreateUserForm from '../components/CreateUser.vue'

export default {
  components: {
    CreateUserForm
  },
  computed: {
    currentUser () {
      const userStore = useUserStore()
      return userStore.currentUser
    }
  }
}
</script>

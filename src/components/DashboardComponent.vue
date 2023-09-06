<template>
  <div class="dashboard">
    <p>Welcome {{ currentUser.fullName }}</p>
  </div>
</template>

<script>
import { useUserStore } from '../stores/userStore'

export default {
  computed: {
    currentUser () {
      const userStore = useUserStore()
      return userStore.currentUser
    }
  }
}
</script>

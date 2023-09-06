<template>
  <div class="admin-dashboard">
    <p v-if="currentUser">Welcome {{ currentUser.fullName }}</p>
    <!-- First Child Component -->
    <ChildComponent1
      v-if="activeStep === 1"
      @nextStep="handleNextStep"
      @userData1="storeUserData1"
    ></ChildComponent1>

    <!-- Second Child Component -->
    <ChildComponent2
      v-if="activeStep === 2"
      @nextStep="handleNextStep"
      @userData2="storeUserData2"
      :userIdRules="userIdRules"
      :user="userData1"
    ></ChildComponent2>

    <!-- Third Child Component -->
    <ChildComponent3
      v-if="activeStep === 3"
      :userData1="userData1"
      :userData2="userData2"
      @createUser="createNewUser"
    ></ChildComponent3>
  </div>
</template>

<script>
import ChildComponent1 from '../components/ChildComponent1.vue'
import ChildComponent2 from '../components/ChildComponent2.vue'
import ChildComponent3 from '../components/ChildComponent3.vue'
import { useUserStore } from '../stores/userStore'

export default {
  components: {
    ChildComponent1,
    ChildComponent2,
    ChildComponent3
  },
  data () {
    return {
      activeStep: 1,
      userData1: {},
      userData2: {},
      userIdRules: [(val) => val === '' || Number.isInteger(Number(val)) || 'User ID must be an integer']
    }
  },
  computed: {
    currentUser () {
      const userStore = useUserStore()
      return userStore.currentUser
    }
  },
  methods: {
    handleNextStep () {
      this.activeStep++
    },
    storeUserData1 (data) {
      this.userData1 = data
    },
    storeUserData2 (data) {
      this.userData2 = data
    },
    createNewUser (newUser) {
      const userStore = useUserStore()
      userStore.addUser(newUser)
    }
  }
}
</script>

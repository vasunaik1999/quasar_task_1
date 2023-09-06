<template>
  <form @submit.prevent="createUser">
    <div class="q-pa-md">
      <q-input v-model="user.username" label="Username" outlined dense :rules="usernameRules" />
    </div>
    <div class="q-pa-md">
      <q-input v-model="user.fullName" label="Full Name" outlined dense :rules="fullNameRules" />
    </div>
    <div class="q-pa-md">
      <q-input v-model="user.email" label="Email ID" outlined dense :rules="emailRules" />
    </div>
    <div class="q-pa-md">
      <q-input v-model="user.phoneNumber" label="Phone Number" outlined dense :rules="phoneNumberRules" />
    </div>
    <div class="q-pa-md">
      <q-select v-model="user.designation" label="Designation" outlined dense :options="designationOptions" @input="checkUserDesignation" />
    </div>
    <div class="q-pa-md" v-if="isUser">
      <q-input v-model="user.userId" label="User ID" outlined dense :rules="userIdRules" />
    </div>
    <div class="q-pa-md">
      <q-btn type="submit" label="Create User" color="primary" />
    </div>
  </form>
</template>

<script>
import { ref, computed } from 'vue'
import { useUserStore } from '../stores/userStore' // Adjust the path as needed

export default {
  setup () {
    const user = ref({
      username: '',
      fullName: '',
      email: '',
      phoneNumber: '',
      designation: '',
      userId: ''
    })

    const designationOptions = ['admin', 'user']
    const userStore = useUserStore() // Initialize the store

    const isUser = computed(() => user.value.designation === 'user')

    const checkUserDesignation = () => {
      if (!isUser.value) {
        user.value.userId = '' // Clear the User ID field if the designation is not 'user'
      }
    }

    // Define validation rules for each field
    const usernameRules = [(val) => !!val || 'Username is required']
    const fullNameRules = [(val) => !!val || 'Full Name is required']
    const emailRules = [(val) => !!val || 'Email ID is required', (val) => /.+@.+\..+/.test(val) || 'Enter a valid email address']
    const phoneNumberRules = [(val) => !!val || 'Phone Number is required', (val) => /^[0-9]{10}$/.test(val) || 'Phone Number must be 10 digits']
    const userIdRules = [(val) => isUser.value ? (!!val || 'User ID is required') : true, (val) => isUser.value ? (Number.isInteger(Number(val)) || 'User ID must be an integer') : true]

    const createUser = () => {
      // Perform form validation
      if (!validateForm()) {
        return // Prevent form submission if there are validation errors
      }

      const newUser = { ...user.value }
      console.log(newUser)

      // Add the newUser object to your store
      userStore.addUser(newUser)
    }

    const validateForm = () => {
      // Validate each field
      const isValidUsername = usernameRules.every(rule => rule(user.value.username))
      const isValidFullName = fullNameRules.every(rule => rule(user.value.fullName))
      const isValidEmail = emailRules.every(rule => rule(user.value.email))
      const isValidPhoneNumber = phoneNumberRules.every(rule => rule(user.value.phoneNumber))
      const isValidUserId = userIdRules.every(rule => rule(user.value.userId))

      // Return true if all fields are valid, otherwise return false
      return isValidUsername && isValidFullName && isValidEmail && isValidPhoneNumber && isValidUserId
    }

    return {
      user,
      designationOptions,
      isUser,
      checkUserDesignation,
      createUser,
      usernameRules,
      fullNameRules,
      emailRules,
      phoneNumberRules,
      userIdRules
    }
  }
}
</script>

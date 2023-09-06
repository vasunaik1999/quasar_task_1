<template>
  <div>
    <div class="q-pa-md">
      <q-input v-model="localUser.username" label="Username" outlined dense :rules="usernameRules" />
    </div>
    <div class="q-pa-md">
      <q-input v-model="localUser.fullName" label="Full Name" outlined dense :rules="fullNameRules" />
    </div>
    <div class="q-pa-md">
      <q-input v-model="localUser.email" label="Email ID" outlined dense :rules="emailRules" />
    </div>
    <div class="q-pa-md">
      <q-input v-model="localUser.phoneNumber" label="Phone Number" outlined dense :rules="phoneNumberRules" />
    </div>
    <div class="q-pa-md">
      <q-btn @click="nextStep" label="Next" color="primary" :disable="!validateForm()"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
    isUser: Boolean
  },
  data () {
    return {
      usernameRules: [(val) => !!val || 'Username is required'],
      fullNameRules: [(val) => !!val || 'Full Name is required'],
      emailRules: [
        (val) => !!val || 'Email ID is required',
        (val) => /.+@.+\..+/.test(val) || 'Enter a valid email address'
      ],
      phoneNumberRules: [
        (val) => !!val || 'Phone Number is required',
        (val) => /^[0-9]{10}$/.test(val) || 'Phone Number must be 10 digits'
      ],
      localUser: {
        username: '',
        fullName: '',
        email: '',
        phoneNumber: ''
      }
    }
  },
  methods: {
    nextStep () {
      if (!this.validateForm()) {
        return
      }
      this.$emit('userData1', { ...this.localUser }) // Emit user data to the parent
      this.$emit('nextStep') // Trigger the next step in the parent component
    },
    validateForm () {
      // Implement your validation logic here
      // Return true if all fields are valid, otherwise return false
      // For example:
      const isValid =
        this.usernameRules.every((rule) => rule(this.localUser.username)) &&
        this.fullNameRules.every((rule) => rule(this.localUser.fullName)) &&
        this.emailRules.every((rule) => rule(this.localUser.email)) &&
        this.phoneNumberRules.every((rule) => rule(this.localUser.phoneNumber))

      // Debugging: Output the validation result to the console
      console.log('Validation result:', isValid)

      return isValid
    }
  }
}
</script>

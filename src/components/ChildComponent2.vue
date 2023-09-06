<template>
  <div>
    <div class="q-pa-md">
      <q-select v-model="selectedDesignation" label="Designation" outlined dense :options="designationOptions" required />
    </div>
    <div class="q-pa-md" v-if="selectedDesignation === 'user'">
      <q-input v-model="localUser.userId" label="User ID" outlined dense :rules="userIdRules" />
    </div>
    <div class="q-pa-md">
      <q-btn @click="nextStep" label="Next" color="primary" :disable="!isValidForm" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userIdRules: Array
  },
  data () {
    return {
      selectedDesignation: '', // Initialize selectedDesignation
      localUser: {
        userId: ''
      }
    }
  },
  computed: {
    designationOptions () {
      return ['admin', 'user']
    },
    isValidForm () {
      if (this.selectedDesignation === 'user') {
        // Check validation for the User ID field when Designation is 'user'
        return this.userIdRules.every((rule) => rule(this.localUser.userId))
      }
      // No validation errors when Designation is 'admin'
      return true
    }
  },
  methods: {
    nextStep () {
      if (!this.isValidForm) {
        // If the form is not valid, do not proceed to the next step
        return
      }
      this.$emit('userData2', {
        designation: this.selectedDesignation,
        userId: this.localUser.userId
      })
      this.$emit('nextStep') // Trigger the next step in the parent component
    }
  }
}
</script>

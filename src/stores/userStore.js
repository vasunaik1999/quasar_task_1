import { defineStore } from 'pinia'
import usersData from '../assets/usersData.json' // Update the path to your JSON data file

export const useUserStore = defineStore({
  id: 'userStore',
  state: () => ({
    users: usersData,
    currentUser: null // Initialize currentUser as null
  }),
  actions: {
    setUser (user) {
      this.currentUser = user
    },
    addUser (newUser) {
      console.log('ghghj')
      this.users.push(newUser)
    }
  }
})

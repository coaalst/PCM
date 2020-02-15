<template>
  <div>
    <h1>Registracija</h1>
    <input type="text" name="name" placeholder="korisničko ime"><br>
    <input type="text" name="password" placeholder="*************"><br>
    <input type="text" placeholder="*************"><br>
    <button @click="register">
      Registracija</button>
  </div>
</template>

<script>
import auth from '@/service/auth'
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    async register(){
      const response = await auth.register({
        name: this.name,
        password: this.password
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

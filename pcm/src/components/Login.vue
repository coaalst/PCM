<template>
  <div>
    <h1>Dobrodošli</h1>
    <input type="text" name="name" placeholder="korisničko ime" v-model="name"><br>
    <input type="text" name="password" placeholder="*************" v-model="password"><br>
    <button @click="login"> Login</button><br>
    Treba ti nalog? <a href="http://localhost:8080/#/register/">Registruj se</a>
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
    async login(){
      const response = await auth.login({
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

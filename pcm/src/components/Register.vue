<template>
 <div class="centered-container" >
    <md-content class="md-elevation-3">

      <div class="title">
        <img src="@/assets/pcm.png">
        <div class="md-title">PCM - Registracija</div>
        <div class="md-body-1">Inventar done right</div>
      </div>

      <div class="form">
        <md-field>
          <label>Korisničko ime</label>
          <md-input v-model="name" autofocus></md-input>
        </md-field>

        <md-field md-has-password>
          <label>Šifra</label>
          <md-input v-model="password" type="password"></md-input>
        </md-field>

        <md-field md-has-password>
          <label>Potvrda</label>
          <md-input v-model="password1" type="password1"></md-input>
        </md-field>
        <p v-if="errors.length">
          <ul>
            <li v-for="error in errors">{{ error }}</li>
          </ul>
        </p>
      </div>

      

      <div class="actions md-layout md-alignment-center-space-between">
        <a href="http://localhost:8080/#/login/">Imaš već nalog?</a>
        <md-button class="md-raised md-primary" @click="register">Registracija</md-button>
      </div>


    </md-content>
    <div class="background" />
  </div>
</template>

<script>
import auth from '@/service/auth'
export default {
  name: "Register",
  data () {
    return {
      name: "",
      password: "",
      password1: "",
      errors: []
    }
  },
  methods: {
    async register(){
      this.errors = [];
      if(!this.name || !this.password || !this.password1) this.errors.push("Pazljivo popuni sva polja!") 
      if(this.password !== this.password1) this.errors.push("Sifre se ne podudaraju!")
      if(this.name.length < 6) this.errors.push("Korisnicko ime je mnogo kratko!")
      if(this.password.length < 8) this.errors.push("Sifra je mnogo kratka!")
      
      if(errors.length === 0) {
        const response = await auth.register({
          name: this.name,
          password: this.password
        })
        router.push("main")
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.warning{
  color: red;
  font-size: 20px;
}
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
  }
  .title {
    text-align: center;
    margin-bottom: 30px;
    img {
      margin-bottom: 16px;
      max-width: 80px;
    }
  }
  .actions {
    .md-button {
      margin: 0;
    }
  }
  .form {
    margin-bottom: 60px;
  }
  .md-content {
    z-index: 1;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    position: relative;
  }
  .loading-overlay {
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

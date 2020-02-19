<template>
  <div class="centered-container" >
    <md-content class="md-elevation-3">

      <div class="title">
        <img src="@/assets/pcm.png">
        <div class="md-title">PCM - Login</div>
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
      </div>

      <div class="actions md-layout md-alignment-center-space-between">
        <a href="http://localhost:8080/#/register/">Treba ti nalog?</a>
        <md-button class="md-raised md-primary" @click="login">Log in</md-button>
      </div>

    </md-content>
    <div class="background" />
  </div>
</template>

<script>
import auth from '@/service/auth'
export default {
  data () {
     return {
      name: "",
      password: ""
    }
  },
  methods: {
     login(){

      auth.login({
        name: this.name,
        password: this.password
      })
      router.push("main")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

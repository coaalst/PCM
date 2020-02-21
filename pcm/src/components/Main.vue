<template>
  <div class="page-container">

    <md-toolbar class="md-accent" md-elevation="1">
      <h3 class="md-title">PCM</h3>
      <md-menu class="meni" md-direction="bottom-end">
        <md-button class="md-primary-button" md-menu-trigger>Create</md-button>
        <md-menu-content style="background: white;">
          <md-menu-item>My Item 1</md-menu-item>
          <md-menu-item>My Item 2</md-menu-item>
          <md-menu-item>My Item 3</md-menu-item>
        </md-menu-content>
      </md-menu>
      <md-button class="md-logout" @click="logout">
        <md-icon>power_settings_new</md-icon>
        Logout</md-button>
      <md-button>Refresh</md-button>
    </md-toolbar>
     <div class="md-layout">

    <md-card class="ucionica">
      <md-card-header>
        <h1 class="md-title">Ucionice</h1>
      </md-card-header>
      <md-card-expand class="md-title-green">
        <md-card-actions md-alignment="space-between">
          Dodaj ucionicu
          <md-card-expand-trigger>
            <md-button class="md-icon-button">
              <md-icon>keyboard_arrow_down</md-icon>
            </md-button>
          </md-card-expand-trigger>
        </md-card-actions>

        <md-card-expand-content class="md-title-green">
          <md-card-content>
           <form >
            <md-field md-clearable type='text' name='test'>
               <md-input placeholder="Naziv" v-model="classNaziv" style="background: white;"/>
            </md-field>
            <md-button class="md-title-white" @click="addClass">Dodaj</md-button>
          </form>
            
          </md-card-content>
        </md-card-expand-content>
      </md-card-expand>
      <md-card-content>
        <md-list :md-expand-single="expandSingle">
          <md-list-item md-expand v-for="classroom in classrooms">
             <md-icon>desktop_windows</md-icon>
             <span class="md-list-item-text">{{classroom.name}}</span>
              <md-list slot="md-expand">
                <md-list-item class="md-inset" v-on:click="delClass(classroom.id)">Obrisi</md-list-item>
                <md-list-item class="md-inset" v-on:click="infoClass(classroom.id)">Detaljno</md-list-item>
          </md-list>
          </md-list-item>
        </md-list>
      </md-card-content>
    </md-card>

    <md-card class="oprema">
      <md-card-expand class="md-title-green" style="width: auto;">
            <md-card-actions md-alignment="space-between">
                <h1 class="md-title"> Dodaj racunar</h1>
              <md-card-expand-trigger>
                <md-button class="md-icon-button">
                <md-icon>keyboard_arrow_down</md-icon>
                </md-button>
              </md-card-expand-trigger>
          </md-card-actions>

        <md-card-expand-content class="md-title-green">
          <md-card-content>
           <form>
            <md-field md-clearable type='text' name='test'>
               <md-input placeholder="Naziv" v-model="newPc.name" style="background: white;"/>
            </md-field>
            <md-select v-model="newPc.room" style="max-width: 325px;">
              <md-option v-for="classr in classrooms" v-model="classr.id" style="background: white;">{{classr.name}}</md-option>
            </md-select>
             <md-field md-clearable type='text' name='test'>
               <md-input placeholder="Inventarski broj" v-model="newPc.invet" style="background: white;"/>
            </md-field>
             <md-field md-clearable type='text' name='test'>
               <md-input placeholder="Status" v-model="newPc.status" style="background: white;"/>
            </md-field>
            <md-button class="md-title-white" @click="addPc">Dodaj</md-button>
          </form>
            
          </md-card-content>
        </md-card-expand-content>
      </md-card-expand>


          <md-table v-model="pcs" md-sort="name" md-sort-order="asc" md-card md-fixed-header class="oprema">
            <md-table-toolbar class="md-accent">
              <div class="md-toolbar-section-start">
                <h1 class="md-title">Oprema</h1>
              </div>

              <md-field md-clearable class="md-toolbar-section-end">
                <md-input placeholder="Pretraga.." v-model="search" @input="searchOnTable" style="background: white;" />
              </md-field>
            </md-table-toolbar>

          <md-table-empty-state
            md-label="Nema racunara u bazi"
            :md-description="`U bazi nema nista sto se poklapa sa '${search}' pretragom. Pokusaj ponovo!`">
            <md-button class="md-primary md-raised" @click="newUser">Dodaj racunar</md-button>
          </md-table-empty-state>

            <md-table-row slot="md-table-row" v-for="pc in pcs">
              <md-table-cell md-label="Naziv" md-sort-by="id" md-numeric>{{ pc.name }}</md-table-cell>
              <md-table-cell md-label="Invent. broj" md-sort-by="email">{{ pc.invet }}</md-table-cell>
              <md-table-cell md-label="Status" md-sort-by="gender">{{ pc.status }}</md-table-cell>
           </md-table-row>
          </md-table>

        
          
        </md-card>
     </div>
    
     

  </div>
</template>

<script>
  const toLower = text => {
    return text.toString().toLowerCase()
  }

  const searchByName = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.name).includes(toLower(term)))
    }

    return items
  }
  import fetcher from '@/service/fetcher'
  import auth from '@/service/auth'
  import modifier from '@/service/modifier'
  export default {
    name: 'PersistentMini',
    data: () => ({
      menuVisible: false,
      classNaziv: null,
      classrooms: [],
      pcs: [],
      pcs_save: [],
      search: null,
      newPc:{
        name: null,
        room: null,
        invet: null,
        status: null,
      }
    }),
     created () {
      // fetch the data when the view is created and the data is
      // already being observed
      this.fetchPcData(this.pcs, this.pcs_save)
      this.fetchClassData(this.classrooms)
      this.searched = this.pcs

    },    
    methods: {
      async addPc(){
        console.log(this.newPc)
        const resp = await modifier.addp(this.newPc).then(this.$notify({
            group: 'foo',
            title: 'Dodat',
            text: 'Uspesno dodata stavka!'
            }));
            location.reload(); 
      },
       async addClass(){
        console.log(this.classNaziv)
        const resp = await modifier.addc(this.classNaziv).then(this.$notify({
            group: 'foo',
            title: 'Dodat',
            text: 'Uspesno dodata stavka!'
            }));
            location.reload(); 
      },
      async delClass(id){
        console.log(id)
        const resp = await modifier.deletec(id).then(this.$notify({
            group: 'foo',
            title: 'Obrisan',
            text: 'Uspesno obrisana stavka!'
            }));
            location.reload(); 
      },
      infoClass(id){


      },

      async logout(){
        const resp = await auth.logout().then(this.$router.push("login"))
      },
      newUser () {
        window.alert('Noop')
      },
      searchOnTable () {
        this.pcs = this.pcs_save;
        this.pcs = searchByName(this.pcs, this.search);
      },
      async fetchClassData(pcs){
        const response = await fetcher.fetchClassrooms().then(function(data){
          var i;
          for(i = 0; i < data.data.length; i++){
            console.log(data.data[i])
            pcs.push(data.data[i])}
            
          //console.log(this.pcs)
          });
      },
      async fetchPcData(pcs, pcs_save){
        const response = await fetcher.fetchPC().then(function(data){
          var i;
          for(i = 0; i < data.data.length; i++){
            console.log(data.data[i])
            pcs.push(data.data[i])
            pcs_save.push(data.data[i])}
          //console.log(this.pcs)
          });
      }
  }
  }
</script>

<style lang="scss" scoped>
  .md-field {
    max-width: 300px;
  }
  .meni{
    margin: 10px;
  }
  .page-container{
    text-align: center;
  }
  .md-primary-button{
    background: white;
    color: #3C894B;
  }
  .md-title-white{
    background: white;
    color: #3C894B;
  }
  .md-title-green{
    background: #3C894B;
    color: white;
  }
  .ucionica{
    max-width: 400px;
    min-width: 300px;
    margin-inline: 20px;
    height: 800px;
  }
  .oprema{
    min-width: 800px;
    height: 800px;
  }
  .md-field {
    max-width: 300px;
  }
  .md-accent{
    background: #3C894B;
  }
  .md-card-header{
     background: #3C894B;
     margin-top: 0px;
     height: 65px;
  }
  .md-title{
    color: white;
  }
  .md-insert{
    line-height: 2px;
  }
  .md-primary{
    background: #3C894B;
  }
  
  .md-app {
    min-height: 800px;
    border: 1px solid rgba(#000, .12);
  }
  .md-layout{
    margin: 40px;
  }
  .md-logout{
    background: #ad2f26;
    color: white;
  }
</style>

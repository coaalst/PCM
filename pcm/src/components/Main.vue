<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title" style="color: white;">PCM</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>Opcije</span>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">Izvestaj</span>
          </md-list-item>

          <md-divider class="md-inset"></md-divider>

          <md-list-item >
            <md-icon>help_outline</md-icon>
            <span class="md-list-item-text">Sent Mail</span>
          </md-list-item>

          <md-list-item @click="showDialog = true">
            <md-icon>help_outline</md-icon>
            <span class="md-list-item-text">Pomoć</span>
     
          </md-list-item>

          <md-divider class="md-inset"></md-divider>

          <md-list-item>
            <md-icon>error</md-icon>  
            <span class="md-list-item-text">Logout</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content class="md-layout md-gutter">
        <md-card class="md-layout-item" style="max-width: 400px; min-height: 800px;">
          <md-card-header >
            <div class="md-title">Ucionice</div>
          </md-card-header>

          <md-card-content>
            <md-list>


      <md-list-item>
        <md-avatar>
          <md-icon>meeting_room</md-icon>
        </md-avatar>

        <span class="md-list-item-text" @click="alert">Ucionica 50</span>

        <md-button class="md-icon-button md-list-action">
          <md-icon >add</md-icon>
        </md-button>
        <md-button class="md-icon-button md-list-action">
          <md-icon >clear</md-icon>
        </md-button>
      </md-list-item>
            </md-list>
      

    </md-card-content>


      </md-card>
        <md-card class="md-layout-item" style="min-height: 800px;">
          <md-card-header>
            <div class="md-title">Tehnika</div>
          </md-card-header>

          <md-card-content>
            <md-list-item>
              <md-avatar>
                <md-icon>desktop_windows</md-icon>
              </md-avatar>

              <span class="md-list-item-text">Racunar 50</span>

              <md-button class="md-icon-button md-list-action">
                <md-icon >add</md-icon>
              </md-button>
              <md-button class="md-icon-button md-list-action">
                <md-icon >clear</md-icon>
              </md-button>
            </md-list-item>
          </md-card-content>
          <md-card-actions>
            <md-button>Dodaj</md-button>
            <md-button>Obrisi</md-button>
          </md-card-actions>

      </md-card>


      </md-app-content>

       <md-dialog :md-active.sync="showDialog">


      <md-dialog-title>Korišćenje</md-dialog-title>
        <md-tabs md-dynamic-height>
          <p>Sa leve strane nalazi se panel za navigaciju. Tu se nalaze sledeće funkcionalnosti: Pritiskom na dugme izveštaj generiše se spisak računara po kabinetima.</p>
        <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        </md-dialog-actions>
        </md-tabs>
      </md-dialog>

    </md-app>
  </div>
</template>

<script>
  export default {
    name: 'PersistentMini',
    data: () => ({
      menuVisible: false,
      showDialog: false
    }),
    methods: {
      toggleMenu () {
        this.menuVisible = !this.menuVisible
      }
    }
  }
</script>

<style lang="scss" scoped>
  .md-card-header{
     background: #3C894B;
     margin-top: 10px;
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

   // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }

  .md-list {
    width: 320px;
  }
</style>

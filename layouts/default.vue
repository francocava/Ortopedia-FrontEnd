<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      fixed
      app
      clipped
    >
    
      <v-list>
        <v-list-item>
      <v-list-item-action @click.stop="miniVariant = !miniVariant">
            <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="hola" />
          </v-list-item-content>
        </v-list-item>


        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      clipped-left
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!-- <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn> -->
      
      <v-toolbar-title v-text="title"/>
      <v-spacer />
      <v-icon>mdi-account-circle</v-icon>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container> 
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: true,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        },
        {
          icon: 'mdi-plus-outline',
          title: 'Nuevo Cliente',
          to: '/cliente'
        },
        {
          icon: 'mdi-plus-outline',
          title: 'Ver Clientes',
          to: '/prueba'
        }
      ],
      miniVariant: false,
      right: true,
      title: 'Ortopedia'
    }
  }
}
</script>
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
          v-for="item in itemsSimple"
          :key="item"
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


        <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.icon"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in item.items"
          :key="child.title"
          :to="child.to"
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>


      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      clipped-left
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
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
      itemsSimple: [
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
        /* {
          icon: 'mdi-plus-outline',
          title: 'Nuevo',
          items: [
            {title: 'Cliente',to: '/cliente'},
            {title: 'Sucursal',to: '/sucu'},
            {title: 'Obra Social',to: '/obs'},
          ],
          to: '/'
        },
        {
          icon: 'mdi-file-outline',
          title: 'Ver',
          items: [
            {title: 'Pedidos'},
            {title: 'Clientes'},
            {title: 'Pagos'},

          ],
          to: '/prueba'
        } */
      ],
      items: [
        {
          icon: 'mdi-plus-outline',
          title: 'Nuevo',
          items: [
            {title: 'Cliente', to: '/cliente'},
            {title: 'Sucursal', to: '/sucu'},
            {title: 'Obra Social', to: '/obs'},
          ],
          to: '/'
        },
        {
          icon: 'mdi-file-outline',
          title: 'Ver',
          items: [
            {title: 'Pedidos', to: '/prueba'},
            {title: 'Clientes', to: '/prueba1'},
            {title: 'Pagos', to: '/prueba2'},

          ],
          to: '/'
        }
      ],
      miniVariant: false,
      right: true,
      title: 'Ortopedia'
    }
  }
}
</script>
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
            <v-icon
              >mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon
            >
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title />
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-for="item in itemsSimple"
          :key="item.title"
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
              <v-list-item-title
                v-text="child.title"
                class="ml-14"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>

      <template v-slot:append>
        <v-list>
          <v-list-item @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark">
            <v-list-item-action>
              <v-icon v-if="!$vuetify.theme.dark">mdi-weather-sunny</v-icon>
              <v-icon v-else>mdi-weather-night</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title
                v-if="$vuetify.theme.dark"
                v-text="'Modo Oscuro'"
              />
              <v-list-item-title v-else v-text="'Modo Claro'" />
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click.stop="logout">
            <v-list-item-action>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title v-text="'Salir'" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-app-bar clipped-left fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="text-center" v-text="title" />
      <v-spacer />

      <v-avatar>
        <v-icon large> mdi-account-circle-outline </v-icon>
      </v-avatar>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      fixed: false,
      drawer: true,
      itemsSimple: [
        {
          //icon: 'mdi-file-powerpoint-box-outline',
          icon: 'mdi-format-paragraph',
          title: 'Proforma',
          to: '/pedido',
        },
        {
          icon: 'mdi-cart-arrow-down',
          title: 'Pedido Directo',
          to: '/pedidoDirecto',
        },
        {
          icon: 'mdi-clipboard-text-outline',
          title: 'Informes',
          to: '/informes',
        },
      ],
      items: [
        {
          icon: 'mdi-file-outline',
          title: 'Entidades',
          items: [
            { title: 'Proformas', to: '/proformas' },
            { title: 'Pedidos', to: '/' },
            { title: 'Clientes', to: '/clientes' },
            { title: 'Pagos', to: '/pagos' },
            { title: 'Cobros', to: '/cobros' },
            { title: 'Facturas', to: '/facturas' },
            { title: 'Productos', to: '/productos' },
            { title: 'Accesorios', to: '/accesorios' },
            { title: 'Obras Sociales', to: '/obras-sociales' },
            { title: 'Sucursales', to: '/sucursales' },
            { title: 'Empleados', to: '/empleados' },
            { title: 'Proveedores', to: '/proveedores' },
            { title: 'Forma de pago', to: '/formasPagos' },
          ],
        },
      ],
      miniVariant: false,
      right: true,
      title: 'Óptica-Ortopedia Floresta',
    }
  },
  methods: {
    async logout() {
      try {
        await this.$http.$post('logout')

        localStorage.removeItem('token')

        this.$router.push('/login')
      } catch (error) {
        console.error(error.response ?? error)
      }
    },
  },
}
</script>


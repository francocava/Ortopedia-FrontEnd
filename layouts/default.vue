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


      <template v-slot:append>
        <div class="pa-2">
          <v-btn text color="#616161">
            <v-icon>mdi-logout</v-icon>
            Salir
            </v-btn>
        </div>
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
      drawer: true,
      itemsSimple: [
        {
          //icon: 'mdi-file-powerpoint-box-outline',
          icon: 'mdi-format-paragraph',
          title: 'Pedidos',
          to: '/pedido',
        },
        {
          icon: 'mdi-clipboard-text-outline',
          title: 'Informes',
          to: '/inspire',
        },
      ],
      items: [
        {
          icon: 'mdi-plus-outline',
          title: 'Nuevo',
          items: [
            { title: 'Cliente', to: '/cliente' },
            { title: 'Sucursal', to: '/sucursal' },
            { title: 'Obra social', to: '/obraSocial' },
            { title: 'Producto', to: '' },
            { title: 'Accesorio', to: '' },
            { title: 'Pago', to: '' },
            { title: 'Cobro', to: '' },
            { title: 'Proveedor', to: '' },
            { title: 'Forma de pago', to: '' },
            { title: 'Empleado', to: '' },
          ],
        },
        {
          icon: 'mdi-file-outline',
          title: 'Ver',
          items: [
            { title: 'Pedidos', to: '/pedidoVer' },
            { title: 'Facturas', to: '' },
            { title: 'Pagos', to: '/pagoVer' },
            { title: 'Cobros', to: '' },
            { title: 'Clientes', to: '/prueba1' },
            { title: 'Productos', to: '' },
            { title: 'Accesorios', to: '' },
            { title: 'Obras Sociales', to: '/obraSocialVer' },
            { title: 'Sucursales', to: '' },
            { title: 'Proveedores', to: '' },
          ],
        },
      ],
      miniVariant: false,
      right: true,
      title: 'Ortopedia',
    }
  },
}
</script>

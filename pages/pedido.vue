<template>
  <v-card>
    <v-card-title>Pedido Nuevo</v-card-title>
    <v-btn>Nuevo Cliente</v-btn>

    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Ingreso de Autorizacion"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>

      <v-menu
        ref="menu"
        v-model="menu2"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Retiro"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>

        <v-select
          v-model="cliente"
          :rules="[(v) => !!v || 'Elija un Cliente']"
          :items="items"
          label="Cliente"
          required
        ></v-select>

        <v-select
          v-model="cliente"
          :rules="[(v) => !!v || 'Elija al menos un Producto']"
          :items="items"
          label="Producto"
          required
          multiple
        ></v-select>

        <v-select
          v-model="cliente"
          :rules="[]"
          :items="items"
          label="Accesorio"
          required
          multiple
        ></v-select>

        <v-select
          v-model="cliente"
          :rules="[(v) => !!v || 'Elija una Sucursal']"
          :items="items2"
          label="Sucursal"
          required
        ></v-select>

        <v-text-field
          type="number"
          v-model="nroCotizacion"
          :rules="nroCotizacionRules"
          label="Numero de Cotizacion"
          required
        ></v-text-field>


        <v-select
          v-model="select"
          :items="items3"
          :rules="[(v) => !!v || 'Elija alguna']"
          label="FL/CT"
          required
        ></v-select>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
          to="/pedidos"
        >
          Enviar
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    menu2: false,
    nombre: '',
    nombreRules: [
      (v) => !!v || 'Falta el nombre del cliente',
      (v) => (v && v.length <= 15) || 'Nombre muy largo',
    ],
    apellido: '',
    apellidoRules: [
      (v) => !!v || 'Falta el apellido del cliente',
      (v) => (v && v.length <= 25) || 'Apellido muy largo',
    ],
    cotizacion: '',
    cotizacionRules: [(v) => !!v || 'Ingrese el numero'],
    select: null,
    items: ['Gaston Cabrera', 'Alberto Raiker', 'Franco Bulgarelli', 'Milena Perez'],
    items2: ['Florida','Centro'],
    items3: ['FL','CT'],
  }),

  methods: {
    validate() {
      this.$refs.form.validate()
    },
  },
}

//la factura se agrega despues //despues del pedido me lleve a pedidos (lo mismo con todo los nuevos) this.router.to 
//necesito una barra de busqueda para los clientes

//Informes 4 v-card

</script>

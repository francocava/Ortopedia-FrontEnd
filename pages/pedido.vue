<template>
  <v-card>
    <v-card-title>Pedido Nuevo
      <v-spacer></v-spacer>
    <v-btn>Nuevo Cliente</v-btn>
    </v-card-title>

    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-menu
        ref="menuAutorizacion"
        v-model="menuAutorizacion"
        :close-on-content-click="false"
        :return-value.sync="form.fecha_ingreso_autorizacion"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="form.fecha_ingreso_autorizacion"
            label="Ingreso de Autorizacion"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="form.fecha_ingreso_autorizacion"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menuAutorizacion = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menuAutorizacion.save(form.fecha_ingreso_autorizacion)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>

      <v-menu
        ref="menuRetiro"
        v-model="menuRetiro"
        :close-on-content-click="false"
        :return-value.sync="form.fecha_retiro"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="form.fecha_retiro"
            label="Retiro Estimado"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="form.fecha_retiro"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menuRetiro = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menuRetiro.save(form.fecha_retiro)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>

        <v-select
          v-model="form.clie_id"
          :items="clientes"
          item-value="id"
          item-text="nombre"
          label="Cliente"
          :rules="[(v) => !!v || 'Elija un Cliente']"
          required
        ></v-select>

        <v-select
          v-model="form.productos"
          :items="productos"
          item-value="id"
          item-text="nombre"
          :rules="[(v) => !!v || 'Item is required']"
          label="Pertenece al producto"
          required
          multiple
        ></v-select>

        <v-select
          v-model="form.accesorios"
          :rules="[]"
          :items="accesorios"
          item-value="id"
          item-text="nombre"
          label="Accesorio"
          required
          multiple
        ></v-select>

        <v-select
          v-model="form.suc_id"
          :rules="[(v) => !!v || 'Elija una Sucursal']"
          :items="sucursales"
          item-value="id"
          item-text="nombre"
          label="Sucursal"
          required
        ></v-select>

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

  async fetch() {
    this.accesorios = await this.$http.$get('http://127.0.0.1:8000/api/accesorio')
    this.sucursales = await this.$http.$get('http://127.0.0.1:8000/api/sucursal')
    this.clientes = await this.$http.$get('http://127.0.0.1:8000/api/cliente')
    this.productos = await this.$http.$get('http://127.0.0.1:8000/api/producto')
    //this.flct = await this.$http.$get('http://127.0.0.1:8000/api/sucursal')
  },

  data: () => ({
    form: {
      fecha_ingreso_autorizacion: new Date().toISOString().substr(0, 10),
      fecha_retiro: new Date().toISOString().substr(0, 10),
      productos:[],
      accesorios:[],
      cli_id: null,
      suc_id: null,
    },
    valid: true,
    menuAutorizacion: false,
    menuRetiro: false,
    
    nombreRules: [
      (v) => !!v || 'Falta el nombre del cliente',
      (v) => (v && v.length <= 15) || 'Nombre muy largo',
    ],
    apellido: '',
    apellidoRules: [
      (v) => !!v || 'Falta el apellido del cliente',
      (v) => (v && v.length <= 25) || 'Apellido muy largo',
    ],
    select: null,
    clientes:[],
    productos:[],
    accesorios:[],
    sucursales:[],
    flct:[],
  }),

  methods: {
    async validate() {
      this.$refs.form.validate()

      try {
        const res = await this.$http.$post('http://127.0.0.1:8000/api/pedido', this.form )
        console.log(res)
        this.$refs.form.reset()
      } catch (error) {
        console.log(error)
      }
    },
  },
}

//la factura se agrega despues //despues del pedido me lleve a pedidos (lo mismo con todo los nuevos) this.router.to 
//necesito una barra de busqueda para los clientes


</script>

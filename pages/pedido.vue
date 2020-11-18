<template>
  <div>
    <v-card>
      <v-card-title
        >Proforma Nueva
        <v-spacer></v-spacer>
        <v-btn to="/cliente">Nuevo Cliente</v-btn>
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
              <v-btn text color="primary" @click="menuAutorizacion = false">
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="
                  $refs.menuAutorizacion.save(form.fecha_ingreso_autorizacion)
                "
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
            <v-date-picker v-model="form.fecha_retiro" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menuRetiro = false">
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

          <v-combobox
            v-model="form.cliente_id"
            :items="clientes"
            item-value="id"
            item-text="apellido"
            label="Cliente"
            :search-input.sync="searchCliente"
            :rules="[(v) => !!v || 'Elija un Cliente']"
            required
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    No se encuentra al cliente "<strong>{{ searchCliente }}</strong
                    >".
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-combobox>

          <v-combobox
            v-model="form.productos"
            :items="productos"
            item-value="id"
            item-text="nombre"
            :rules="[(v) => !!v || 'Item is required']"
            label="Productos"
            multiple
            :search-input.sync="searchProducto"
            chips
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    No se encuentra al producto "<strong>{{ searchProducto }}</strong
                    >".
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-combobox>

          <v-combobox
            v-model="form.accesorios"
            :rules="[]"
            :items="accesorios"
            item-value="id"
            item-text="nombre"
            label="Accesorio"
            multiple
            :search-input.sync="searchAccesorio"
            chips
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    No se encuentra al accesorio "<strong>{{ searchAccesorio }}</strong
                    >".
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-combobox>

          <v-select
            v-model="form.sucursal_id"
            :rules="[(v) => !!v || 'Elija una Sucursal']"
            :items="sucursales"
            item-value="id"
            item-text="nombre"
            label="Sucursal"
            required
          ></v-select>

          <!-- <v-select
          v-model="select"
          :items="flct"
          :rules="[(v) => !!v || 'Elija alguna']"
          label="FL/CT"
          required
        ></v-select> -->

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            Enviar
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <v-snackbar v-model="snackbar.display" :color="snackbar.color">
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  async fetch() {
    this.accesorios = await this.$http.$get('accesorio')
    this.sucursales = await this.$http.$get('sucursal')
    this.clientes = await this.$http.$get('cliente')
    this.productos = await this.$http.$get('producto')
  },

  data: () => ({
    snackbar: {
      display: false,
      text: '',
      color: 'black',
    },

    form: {
      fecha_ingreso_autorizacion: new Date().toISOString().substr(0, 10),
      fecha_retiro: new Date().toISOString().substr(0, 10),
      productos: [],
      accesorios: [],
      cliente_id: null,
      sucursal_id: null,
      usuario_id: 1, //pongo 1 por defecto pero tendria que sacar este dato de la sesion
      //fac_id
      //nro_recibo_proveedor
    },
    valid: true,
    menuAutorizacion: false,
    menuRetiro: false,
    searchCliente: null,
    searchProducto: null,
    searchAccesorio: null,

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
    clientes: [],
    productos: [],
    accesorios: [],
    sucursales: [],
  }),

  methods: {
    async validate() {
      this.$refs.form.validate()

      try {
        const res = await this.$http.$post('pedido', this.form)
        console.log(res)
        this.$refs.form.reset()
        this.showSnackbar('Proforma agregada con exito', 'success')
      } catch (error) {
        console.log(error)
        this.showSnackbar(`Ocurrió un error: ${error.message}`, 'red')
      }
    },
    showSnackbar(message, color) {
      this.snackbar.display = true
      this.snackbar.text = message
      this.snackbar.color = color ?? 'black'
    },
  },
}

//necesito una barra de busqueda para los clientes
</script>

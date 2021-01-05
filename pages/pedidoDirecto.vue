<template>
  <div>
    <v-card>
      <v-card-title
        >Nuevo Pedido Directo
        <v-spacer></v-spacer>
        <v-btn to="/cliente">Nuevo Cliente</v-btn>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-combobox
            v-model="form.cliente"
            :items="clientes"
            item-value="id"
            item-text="apellido"
            label="Cliente"
            :search-input.sync="searchCliente"
            :rules="[(v) => !!v || 'Elija un Cliente']"
            required
            :loading="loading"
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    No se encuentra al cliente "<strong>{{
                      searchCliente
                    }}</strong
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
            :loading="loading"
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    No se encuentra al producto "<strong>{{
                      searchProducto
                    }}</strong
                    >".
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>

            <template
              v-slot:selection="{ attrs, item, parent, selected, index }"
            >
              <v-chip
                v-if="item === Object(item)"
                v-bind="attrs"
                :color="`${item.color} lighten-3`"
                :input-value="selected"
                label
                small
              >
                <span class="pr-2">
                  {{ item.nombre }} {{ item.cantidad }}
                </span>
                <v-icon small @click="removeProducto(index, item)"> mdi-minus </v-icon>
                <v-icon small @click="addProducto(index, item)"> mdi-plus </v-icon>
              </v-chip>
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
            :loading="loading"
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    No se encuentra al accesorio "<strong>{{
                      searchAccesorio
                    }}</strong
                    >".
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template
              v-slot:selection="{ attrs, item, parent, selected, index }"
            >
              <v-chip
                v-if="item === Object(item)"
                v-bind="attrs"
                :color="`${item.color} lighten-3`"
                :input-value="selected"
                label
                small
              >
                <span class="pr-2">
                  {{ item.nombre }} {{ item.cantidad }}
                </span>
                <v-icon small @click="removeAccesorio(index, item)"> mdi-minus </v-icon>
                <v-icon small @click="addAccesorio(index, item)"> mdi-plus </v-icon>
              </v-chip>
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
            :loading="loading"
          ></v-select>

          <v-textarea
            v-model="form.observaciones"
            label="Observaciones"
            outlined
          ></v-textarea>

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
      <!-- <v-card-text>Total {{ form.productos[0].precio}}</v-card-text> -->
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

    this.loading = false
  },

  data() {
    return {
      loading: true,

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
        cliente: null,
        sucursal_id: null,
        observaciones: null,
        confirmado: true,
        usuario_id: 1, //pongo 1 por defecto pero tendria que sacar este dato de la sesion
        cantidad: [],
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
    }
  },

  methods: {
    async validate() {
      this.$refs.form.validate()

      try {
        const res = await this.$http.$post('pedido', this.form)
        console.log(res)
        this.$refs.form.reset()
        this.showSnackbar('Pedido agregado con exito', 'success')
      } catch (error) {
        console.log(error)
        this.showSnackbar(`Ocurrió un error: ${error.message}`, 'red')
      }
    },

    addProducto(index, item) {
      this.form.productos[index].cantidad++
    },

    removeProducto(index, item) {
      if (this.form.productos[index].cantidad > 1)
        this.form.productos[index].cantidad--
    },

    addAccesorio(index, item) {
      this.form.accesorios[index].cantidad++
    },

    removeAccesorio(index, item) {
      if (this.form.accesorios[index].cantidad > 1)
        this.form.accesorios[index].cantidad--
    },

    showSnackbar(message, color) {
      this.snackbar.display = true
      this.snackbar.text = message
      this.snackbar.color = color ?? 'black'
    },
  },
}
</script>

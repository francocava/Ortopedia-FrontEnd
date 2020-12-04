<template>
  <div>
    <v-card>
      <v-card-title>Accesorio Nuevo</v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="form.nombre"
            :rules="nombreRules"
            label="Nombre"
            required
          ></v-text-field>

          <v-combobox
            v-model="form.productos"
            :items="productos"
            item-value="id"
            item-text="nombre"
            :rules="[(v) => !!v || 'Item is required']"
            label="Pertenece al producto"
            :search-input.sync="searchProducto"
            multiple
            chips
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    No se encuentra el producto "<strong>{{
                      searchProducto
                    }}</strong
                    >".
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-combobox>

          <v-select
            v-model="form.proveedor_id"
            :items="proveedores"
            item-value="id"
            item-text="nombre"
            :rules="[(v) => !!v || 'Item is required']"
            label="Proveedor"
            required
          ></v-select>

          <v-text-field
            type="number"
            v-model="form.precio"
            label="Precio"
          ></v-text-field>

          <v-text-field
            type="number"
            v-model="form.nro_articulo"
            label="Número de Articulo"
          ></v-text-field>

          <v-textarea
            v-model="form.descripcion"
            label="Descripcion"
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
    </v-card>
    <v-snackbar v-model="snackbar.display" :color="snackbar.color">
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  async fetch() {
    this.productos = await this.$http.$get('producto')
    this.proveedores = await this.$http.$get('proveedor')
  },

  data: () => ({
    snackbar: {
      display: false,
      text: '',
      color: 'black',
    },
    valid: true,
    form: {
      nombre: '',
      nro_articulo: '',
      precio: '',
      proveedor_id: null,
      productos: [],
      descripcion: '',
    },
    productos: [],
    proveedores: [],
    searchProducto: [],
    nombreRules: [
      (v) => !!v || 'Falta el nombre del producto',
      (v) => (v && v.length <= 50) || 'Nombre muy largo',
    ],
    proveedorRules: [
      (v) => !!v || 'Falta el nombre del proveedor',
      (v) => (v && v.length <= 30) || 'Muy largo',
    ],
  }),

  methods: {
    async validate() {
      this.$refs.form.validate()
      console.log(this.form)

      try {
        const res = await this.$http.$post('accesorio', this.form)
        console.log(res)
        this.$refs.form.reset()
        this.showSnackbar('Accesorio agregado con exito', 'success')
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
</script>
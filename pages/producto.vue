<template>
  <div>
    <v-card>
      <v-card-title>Producto Nuevo</v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="form.nombre"
            label="Nombre"
            :rules="nombreRules"
          ></v-text-field>

          <v-combobox
            v-model="form.accesorios"
            :items="accesorios"
            item-value="id"
            item-text="nombre"
            :rules="[(v) => !!v || 'Ingrese los accesorios']"
            label="Accesorios"
            multiple
            :search-input.sync="searchAccesorio"
            chips
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    No se encuentra el accesorio "<strong>{{
                      searchAccesorio
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
    this.accesorios = await this.$http.$get('accesorio')
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
      proveedor_id: '', //
      precio: '',
      descripcion: '',
      accesorios: [],
    },

    nombreRules: [
      (v) => !!v || 'Falta el nombre del producto',
      (v) => (v && v.length <= 50) || 'Nombre muy largo',
    ],

    proveedorRules: [
      (v) => !!v || 'Falta el nombre del proveedor',
      (v) => (v && v.length <= 30) || 'Muy largo',
    ],
    proveedores: [],
    accesorios: [],
    searchAccesorio: null,
  }),

  methods: {
    async validate() {
      this.$refs.form.validate()
      try {
        const res = await this.$http.$post('producto', this.form)
        console.log(res)
        this.$refs.form.reset()
        this.showSnackbar('Producto agregado con exito', 'success')
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

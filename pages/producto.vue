<template>
  <v-card>
    <v-card-title>Producto Nuevo</v-card-title>

    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="form.nombre"
          label="Nombre"
          :rules="nombreRules"
        ></v-text-field>

        <v-select
          v-model="form.accesorios"
          :items="accesorios"
          item-value="id"
          item-text="nombre"
          :rules="[(v) => !!v || 'Ingrese los accesorios']"
          label="Accesorios"
          required
          multiple
        ></v-select>

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
          :rules="precioRules"
          label="Precio"
          required
        ></v-text-field>

        <v-text-field
          type="number"
          v-model="form.nroArticulo"
          label="Número de Articulo"
        ></v-text-field>

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
</template>

<script>
export default {

  async fetch() {
    this.accesorios = await this.$http.$get('http://127.0.0.1:8000/api/accesorio')
    this.proveedores = await this.$http.$get(
      'http://127.0.0.1:8000/api/proveedor'
    )
  },

  data: () => ({
    valid: true,
    form: {
      nombre: '',
      nroArticulo: '',
      proveedor_id: '', //
      precio: '',
      accesorios:[],
    },
    
    nombreRules: [
      (v) => !!v || 'Falta el nombre del producto',
      (v) => (v && v.length <= 50) || 'Nombre muy largo',
    ],
    
    proveedorRules: [
      (v) => !!v || 'Falta el nombre del proveedor',
      (v) => (v && v.length <= 30) || 'Muy largo',
    ],
    proveedores:[],
    accesorios:[],
    precioRules: [(v) => !!v || 'Falta el precio'],
  }),

  methods: {
    async validate() {
      this.$refs.form.validate()
      try {
        const res = await this.$http.$post('http://127.0.0.1:8000/api/producto', this.form )
        console.log(res)
        this.$refs.form.reset()
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

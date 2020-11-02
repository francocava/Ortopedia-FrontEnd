<template>
  <v-card>
    <v-card-title>Producto Nuevo</v-card-title>

    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="form.descripcion"
          label="Descripción"
          :rules="nombreRules"
        ></v-text-field>

        <v-select
          v-model="select"
          :items="items"
          :rules="[(v) => !!v || 'Item is required']"
          label="Accesorios"
          required
          multiple
        ></v-select>

        <v-text-field
          v-model="form.proveedor_id"
          :rules="proveedorRules"
          label="Proveedor"
          required
        ></v-text-field>

        <v-text-field
          type="number"
          v-model="fomr.precio"
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
  data: () => ({
    valid: true,
    form: {
      descripcion: '',
      nroArticulo: '',
      proveedor_id: '', //
      precio: '',
    },
    
    nombreRules: [
      (v) => !!v || 'Falta el nombre del producto',
      (v) => (v && v.length <= 50) || 'Nombre muy largo',
    ],
    
    proveedorRules: [
      (v) => !!v || 'Falta el nombre del proveedor',
      (v) => (v && v.length <= 30) || 'Muy largo',
    ],
    items: ['Osecac', 'Pami', 'Osbba', 'Swiss Medical'],
    
    precioRules: [(v) => !!v || 'Falta el precio'],
    select: null,
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

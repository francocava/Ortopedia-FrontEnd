<template>
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

        <v-text-field
          v-model="form.descripcion"
          label="Descripción"
        ></v-text-field>

        <v-select
          v-model="select"
          :items="items"
          :rules="[(v) => !!v || 'Item is required']"
          label="Pertenece al producto"
          required
        ></v-select>

        <v-select
          v-model="select"
          :items="items"
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
  data: () => ({
    valid: true,
    form: {
      nombre: '',
      descripcion: '',
      nroArticulo: '',
      precio: '',
      proveedor_id: '', //hmmmmmm
      //como hacemos con los productos que son varios? El back espera una lista asi: 1,2,3 
    },
    nombreRules: [
      (v) => !!v || 'Falta el nombre del producto',
      (v) => (v && v.length <= 50) || 'Nombre muy largo',
    ],
    
    proveedorRules: [
      (v) => !!v || 'Falta el nombre del proveedor',
      (v) => (v && v.length <= 30) || 'Muy largo',
    ],
    items: ['Prov1', 'P2', 'p3', '4'],
    
    precioRules: [(v) => !!v || 'Falta el precio'],
    select: null,
  }),

  methods: {
    async validate() {
      this.$refs.form.validate()

      try {
        const res = await this.$http.$post('http://127.0.0.1:8000/api/accesorio', this.form )
        console.log(res)
        this.$refs.form.reset()
      } catch (error) {
        console.log(error)
      }

    },
  },
}
</script>
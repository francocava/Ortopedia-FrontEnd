<template>
  <v-card>
    <v-card-title>Accesorio Nuevo</v-card-title>

    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="nombre"
          :rules="nombreRules"
          label="Nombre"
          required
        ></v-text-field>

        <v-text-field
          v-model="descripcion"
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
          v-model="precio"
          :rules="precioRules"
          label="Precio"
          required
        ></v-text-field>

        <v-text-field
          type="number"
          v-model="nroArt"
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
    nombre: '',
    descripcion: '',
    nroArt: '',
    nombreRules: [
      (v) => !!v || 'Falta el nombre del producto',
      (v) => (v && v.length <= 50) || 'Nombre muy largo',
    ],
    proveedor: '',
    proveedorRules: [
      (v) => !!v || 'Falta el nombre del proveedor',
      (v) => (v && v.length <= 30) || 'Muy largo',
    ],
    items: ['Prov1', 'P2', 'p3', '4'],
    precio: '',
    precioRules: [(v) => !!v || 'Falta el precio'],
    select: null,
  }),

  methods: {
    validate() {
      this.$refs.form.validate()
    },
  },
}
</script>
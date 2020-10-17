<template>
  <v-card>
    <v-card-title>Empleado Nuevo</v-card-title>

    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="nombre"
          :rules="nombreRules"
          label="Nombre"
          required
        ></v-text-field>

        <v-text-field
          v-model="apellido"
          :rules="apellidoRules"
          label="Apellido"
          required
        ></v-text-field>

        <!-- <v-text-field
          type="number"
          v-model="dni"
          :rules="dniRules"
          label="DNI"
          required
        ></v-text-field>

        <v-text-field
          type="number"
          :rules="dniRules"
          label="Teléfono"
          required
        ></v-text-field> -->

        <v-select
          v-model="select"
          :items="items"
          :rules="[(v) => !!v || 'Item is required']"
          label="Rol"
          required
        ></v-select>

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
    contacto: '',
    nombreRules: [
      (v) => !!v || 'Falta el nombre del empleado',
      (v) => (v && v.length <= 15) || 'Nombre muy largo',
    ],
    apellido: '',
    apellidoRules: [
      (v) => !!v || 'Falta el apellido del empleado',
      (v) => (v && v.length <= 25) || 'Apellido muy largo',
    ],
    dni: '',
    dniRules: [(v) => !!v || 'Falta el Rol'],
    select: null,
    items: ['Admin', 'Usuario'],
  }),

  methods: {
    validate() {
      this.$refs.form.validate()
    },
  },
}
</script>

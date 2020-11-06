<template>
  <v-card>
    <v-card-title>Empleado Nuevo</v-card-title>

    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="form.nombre"
          :rules="nombreRules"
          label="Nombre"
          required
        ></v-text-field>

        <v-text-field
          v-model="form.apellido"
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
          :items="roles"
          item-value="id"
          item-text="nombre"
          :rules="[(v) => !!v || 'Falta el rol']"
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
  async fetch() {
    this.roles = await this.$http.$get('http://127.0.0.1:8000/api/rol')
  },
  data: () => ({
    valid: true,

    form: {
      nombre: '',
      apellido: '', //no se que onda con el rol
      rol_id: null,
    },
    nombreRules: [
      (v) => !!v || 'Falta el nombre del empleado',
      (v) => (v && v.length <= 15) || 'Nombre muy largo',
    ],
    apellidoRules: [
      (v) => !!v || 'Falta el apellido del empleado',
      (v) => (v && v.length <= 25) || 'Apellido muy largo',
    ],
    roles: [],
  }),

  methods: {
    async validate() {
      this.$refs.form.validate()

      try {
        const res = await this.$http.$post('http://127.0.0.1:8000/api/ususario', this.form )
        console.log(res)
        this.$refs.form.reset()
      } catch (error) {
        console.log(error)
      }

    },
  },
}
</script>

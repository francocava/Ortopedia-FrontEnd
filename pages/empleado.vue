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
          :items="items"
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
  data: () => ({
    valid: true,

    form: {
      nombre: '',
      apellido: '', //no se que onda con el rol
    },
    nombreRules: [
      (v) => !!v || 'Falta el nombre del empleado',
      (v) => (v && v.length <= 15) || 'Nombre muy largo',
    ],
    apellidoRules: [
      (v) => !!v || 'Falta el apellido del empleado',
      (v) => (v && v.length <= 25) || 'Apellido muy largo',
    ],
    select: null,
    items: ['Admin', 'Usuario'],
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

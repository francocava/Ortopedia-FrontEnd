<template>
  <v-card>
    <v-card-title>Sucursal Nueva</v-card-title>

    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="form.nombre"
          :rules="nombreRules"
          label="Nombre"
          required
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
    },
    nombreRules: [
      (v) => !!v || 'Falta el nombre de la sucursal',
      (v) => (v && v.length <= 50) || 'Nombre muy largo',
    ],
  }),

  methods: {
    async validate() {
      if (!this.$refs.form.validate()) {
        return
      }

      try {
        const res = await this.$http.$post('sucursal', this.form )

        this.$refs.form.reset()
      } catch (error) {
        console.error(error.response ?? error)
      }
    },
  },
}
</script>